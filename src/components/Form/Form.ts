import { isURL } from '@domain'
import type { AstroGlobal } from 'astro'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import { Err, Ok, match, union, type AsyncResult, type InferUnion } from 'shulk'

export const FieldConfig = union<{
	Text: {}
	Number: { min?: number; max?: number; unit: string }
	URL: {}
	Checkbox: {}
	TextArea: {}
	File: { accept: string[] }
	EnumSelect: { enum: Record<string, string> }
}>()
export type FieldConfig = InferUnion<typeof FieldConfig>

export type FormDefinition<T> = {
	[x in keyof T]: {
		label: string
		required: T[x] extends undefined ? false : true
		placeholder?: string
		config: T[x] extends File
			? FieldConfig['File']
			: boolean extends T
			? FieldConfig['Checkbox']
			: number extends T
			? FieldConfig['Number']
			: FieldConfig[
					| 'Text'
					| 'Number'
					| 'Checkbox'
					| 'URL'
					| 'TextArea'
					| 'EnumSelect']
	}
}

type FieldDef = {
	label: string
	required: boolean
	config: FieldConfig['any']
}

export type FormError =
	| {
			message: string
			formData: FormData
	  }
	| undefined

export async function onSubmit<T>(
	astro: Readonly<
		AstroGlobal<
			Record<string, any>,
			AstroComponentFactory,
			Record<string, string | undefined>
		>
	>,
	formDefinition: FormDefinition<T>,
	fn: (input: T) => AsyncResult<string, {}>,
): Promise<FormError> {
	if (astro.request.method === 'POST') {
		const formData = await astro.request.formData()
		try {
			const inputResult = Object.entries<FieldDef>(formDefinition)
				.map(([name, field]) => {
					const value = formData.get(name)

					if (value === null && !field.required) {
						return Ok([name, undefined] as const)
					}

					return match(field.config).case({
						Text: () => {
							if (typeof value == 'string' && value !== '') {
								const sanitized = value.trim()
								return Ok([name, sanitized] as const)
							} else {
								return Err(
									`Property "${field.label}" should be a string. Received "${value}".`,
								)
							}
						},
						Number: () => {
							if (typeof value == 'string' && value !== '') {
								const sanitized = value
								return Ok([name, sanitized] as const)
							} else {
								return Err(
									`Property "${field.label}" should be a number. Received "${value}".`,
								)
							}
						},
						TextArea: () => {
							if (typeof value == 'string' && value !== '') {
								const sanitized = value.trim()
								return Ok([name, sanitized] as const)
							} else {
								return Err(
									`Property "${field.label}" should be a string. Received "${value}".`,
								)
							}
						},
						URL: () => {
							if (isURL(value)) {
								const sanitized = value
								return Ok([name, sanitized] as const)
							} else {
								return Err(
									`Property "${field.label}" should be a valid URL. Received "${value}".`,
								)
							}
						},
						Checkbox: () => {
							const sanitized = !!value as never as string
							return Ok([name, sanitized] as const)
						},
						File: () => {
							if (typeof value === 'object') {
								const sanitized = value as never as string
								return Ok([name, sanitized] as const)
							} else {
								return Err(
									`Property "${field.label}" should be a file. Received "${value}".`,
								)
							}
						},
						EnumSelect: (c) => {
							if (typeof value === 'string' && value in c.enum) {
								const sanitized = value
								return Ok([name, sanitized] as const)
							} else {
								return Err(
									`Property "${field.label}" should be a valid option. Received "${value}".`,
								)
							}
						},
					})
				})
				.reduce(
					(prev, current) =>
						match(current).case({
							Err: ({ val: msg }) => {
								if (prev._state === 'Err') {
									return Err((prev.val + '\n' + msg) as never)
								} else {
									return Err(msg as never)
								}
							},
							Ok: () => {
								if (prev._state === 'Ok') {
									const newInput = {
										...prev.val,
										[current.val[0]]: current.val[1],
									}
									return Ok(newInput)
								} else {
									return Err(prev.val)
								}
							},
						}),
					Ok({}),
				)

			const fnResult = await inputResult.flatMapAsync((input) => fn(input as T))

			return fnResult
				.map(() => undefined)
				.mapErr(
					(msg): FormError => ({
						message: msg,
						formData: formData,
					}),
				).val
		} catch (e) {
			return { message: (e as Error).message, formData: formData }
		}
	} else {
		return undefined
	}
}
