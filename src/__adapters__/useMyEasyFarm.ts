import type { Telepac } from '@domain'
import { Err, type AsyncResult, Ok } from 'shulk'

export const useMyEasyFarm =
	() =>
	async (telepac: File): AsyncResult<Error, Telepac> => {
		try {
			const formData = new FormData()
			formData.append('xml_file', telepac)
			const res = await fetch(
				'https://preprod.myeasyfarm.com/api/1/partfield/parse/telepac',
				{
					method: 'POST',
					body: formData,
				},
			)

			const jsonRes = await res.json()

			const { department, region, farm_area, crop_areas }: ApiRes = jsonRes

			return Ok({ department, region, farm_area, crop_areas })
		} catch (e) {
			console.error(e)
			return Err(e as Error)
		}
	}

type ApiRes = {
	status: 200 | 404
	count: 28

	response: string
} & Telepac
