export enum FranceRegion {}

export enum Culture {}

type Hectar = number
type TonPerHectar = number

export type Form = {
  region: FranceRegion
  cultures: Culture
  farmSize: Hectar
  yield: TonPerHectar
  benefitsFromCommonAgriculturalPolicy: boolean
}
