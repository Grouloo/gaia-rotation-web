import {
	FranceDepartments,
	type FarmInformationForm,
} from 'src/__domain__/rotation/Rotation'
import {
	CodeCultureLookup,
	type Telepac,
	type UploadTelepacForm,
} from '../Telepac'
import { Some, type Maybe, None } from 'shulk'

type TelepacParser = (xml: string) => Telepac

type Dependencies = {
	telepacParser: TelepacParser
}

export async function fillFarmInformationForm(
	uploadTelepacForm: UploadTelepacForm,
	dependencies: Dependencies,
) {
	const { telepac: file } = uploadTelepacForm
	const { telepacParser } = dependencies

	const xml = await file.text()

	console.log(xml)

	const telepac = telepacParser(xml)

	console.log('parsed', telepac)

	const farmInformationForm: FarmInformationForm = {
		department: extractDepartmentFromTelepac(telepac).unwrapOr('1') as any,
		cultures: extractCulturesFromTelepac(telepac),
		farmSize: extractFarmSizeFromTelepac(telepac),
		benefitsFromCommonAgriculturalPolicy: true,
	}

	return farmInformationForm
}

function extractDepartmentFromTelepac(telepac: Telepac): Maybe<string> {
	const deptCode = telepac.producteurs.producteur.rpg.ilot[0]?.commune
		.toString()
		.slice(0, 2)

	if (deptCode && deptCode in FranceDepartments) {
		return Some(deptCode.toString())
	} else {
		return None()
	}
}

function extractCulturesFromTelepac(telepac: Telepac): string {
	const cultureList = telepac.producteurs.producteur.rpg.ilot
		.map((ilot) => {
			if (
				'descriptif-parcelle' in ilot.parcelles.parcelle &&
				'culture-principale' in
					ilot.parcelles.parcelle['descriptif-parcelle'] &&
				'code-culture' in
					ilot.parcelles.parcelle['descriptif-parcelle']['culture-principale']
			) {
				const codeCulture =
					ilot.parcelles.parcelle['descriptif-parcelle']['culture-principale'][
						'code-culture'
					]

				if (
					typeof codeCulture === 'string' &&
					codeCulture in CodeCultureLookup
				) {
					return CodeCultureLookup[
						codeCulture as keyof typeof CodeCultureLookup
					]
				}
			}
			return undefined
		})
		.filter((entry) => entry)
		.filter((entry, i, arr) => arr.indexOf(entry) === i)

	return cultureList.join(',')
}

function extractFarmSizeFromTelepac(telepac: Telepac) {
	const farmSizeInAres = telepac.producteurs.producteur.rpg.ilot
		.map((ilot) => {
			if ('surface-admissible' in ilot.parcelles.parcelle) {
				const surfaceInAcres = ilot.parcelles.parcelle['surface-admissible']

				return surfaceInAcres
			}
			return 0
		})
		.reduce((surface, farmSize) => farmSize + surface)

	const farmSizeInHectares = Math.round(farmSizeInAres / 1000)

	return farmSizeInHectares
}
