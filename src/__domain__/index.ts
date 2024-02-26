export * from './__types__'

// France regions indexed by their INSEE code
export const FranceRegion = {
	82: 'Auvergne-Rhône-Alpes',
	26: 'Bourgogne-Franche-Comté',
	53: 'Bretagne',
	24: 'Centre-Val de Loire',
	94: 'Corse',
	44: 'Grand Est',
	32: 'Hauts-de-France',
	11: 'Île-de-France',
	28: 'Normandie',
	75: 'Nouvelle-Aquitaine',
	76: 'Occitanie',
	52: 'Pays de la Loire',
	93: "Provence-Alpes-Côte d'Azur",
} as const
export type FranceRegion = typeof FranceRegion

export enum Culture {
	WEAT = 'Blé',
}

type Hectar = number
type TonPerHectar = number

export type InputForm = {
	region: FranceRegion
	cultures: Culture
	farmSize: Hectar
	yield: TonPerHectar
	benefitsFromCommonAgriculturalPolicy: boolean
}
