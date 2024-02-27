import type { FranceDepartments } from '@domain'
import { client } from './gradio'
//import { client } from '@gradio/client'
// @ts-expect-error
import eventsource from 'eventsource'
import { Ok, type AsyncResult, Err } from 'shulk'
//@ts-expect-error
global.EventSource = eventsource

export async function useHuggingFace() {
	const app = await client(
		'https://team-lfd-sia-pro-chatbot-g-pdf.hf.space/--replicas/wf94h/',
		{
			hf_token: 'hf_',
		},
	)

	return {
		prompt: async (msg: string) => {
			// @ts-expect-error
			const result = (await app.predict('/respond', [msg, []])) as never as {
				data: any
			}

			return result.data[0][1] as string
		},

		findMyRotation: async (params: Input): AsyncResult<Error, string> => {
			try {
				console.log('Request sent...')

				// @ts-expect-error
				const result = await app.predict('/find_my_rotation', [
					params.department,
					params.farmSize,
					params.benefitsFromCommonAgriculturalPolicy,
					{
						headers: Object.keys(params.cultures),
						data: Object.entries(params.cultures),
					},
					{
						headers: Object.keys(params.yields),
						data: Object.entries(params.yields),
					},
				])
				console.log(result)
				return Ok((result as any).data[0] as string)
			} catch (e) {
				console.error(e)
				return Err(e as Error)
			}
		},
	}
}

type Input = {
	department: FranceDepartments
	farmSize: number
	benefitsFromCommonAgriculturalPolicy: boolean
	cultures: string[]
	yields: Record<string, number>
}
