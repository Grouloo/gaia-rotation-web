import type { FranceDepartments } from '@domain'
import type { AsyncResult } from 'shulk'

export type Telepac = {
	department: {
		id: number
		region_id: number
		code: FranceDepartments
		name: string
	}
	region: {
		id: 14
		code: '54'
		code_new: '75'
		name: 'Poitou-Charentes'
	}
	farm_area: 111.66
	crop_areas: {
		// Year
		[x: string]: {
			// Field
			[x: string]: {
				area: 24.040000000000003
				crop_type: {
					id: 538
					account_id: null
					product_group_id: 440
					crop_group_id: 17
					unit_id: 56
					designator: "Blé tendre d'hiver"
					designator_en: 'Common Wheat (Winter)'
					designator_fr: string
					designator_de: null
					designator_ru: 'Пшеница мягкая озимая'
					designator_it: 'Grano tenero invernale'
					designator_pt: 'Trigo mole inverno (Sul)'
					designator_nl: null
					designator_es: 'Trigo blando de invierno'
					designator_pl: 'Pszenica ozima miękka'
					designator_ro: null
					is_common: true
					yield_value: null
					yield_straw_value: null
					average_yield_value: null
					average_moisture_value: 13
					is_cp: true
					is_cd: null
					is_ci: null
					created_at: '2018-11-15T10:58:59.578310+00:00'
					updated_at: '2023-09-21T14:09:57.123188+00:00'
				}
			}
		}
	}
}

export type TelepacParser = (xml: XMLDocument) => AsyncResult<Error, Telepac>
