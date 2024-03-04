import type { AsyncResult } from 'shulk'

export type UploadTelepacForm = {
	telepac: File
}

type Unpack<T> = {
	[K in keyof T]: T[K] extends object ? Unpack<T[K]> : T[K]
}

export type Telepac = {
	producteurs: {
		producteur: {
			demandeur: {
				'identification-societe': { exploitation: string }
				siret: number
				iban: string
				courriel: string
			}
			rpg: {
				ilot: Unpack<
					| {
							commune: number
							geometrie: {
								Polygon: {
									outerBoundaryIs: { LinearRing: { coordinates: string } }
								}
							}
							parcelles: {
								parcelle: (
									| {
											'descriptif-parcelle': {
												'culture-principale': {
													'code-culture': string
													precision?: never
												}
												'agri-bio': string
											}
											geometrie: {
												Polygon: {
													outerBoundaryIs: {
														LinearRing: { coordinates: string }
													}
												}
											}
											'surface-admissible': number
									  }
									| {
											'descriptif-parcelle': {
												'culture-principale': {
													'code-culture': string
													precision: number
												}
												'agri-bio': string
											}
											geometrie: {
												Polygon: {
													outerBoundaryIs: {
														LinearRing: { coordinates: string }
													}
												}
											}
											'surface-admissible': number
									  }
								)[]
							}
							'elements-bio': {
								'element-bio': {
									'numero-element': number
									'code-mesure': string
									geometrie: {
										Polygon: {
											outerBoundaryIs: { LinearRing: { coordinates: string } }
										}
									}
								}
							}
					  }
					| {
							commune: number
							geometrie: {
								Polygon: {
									outerBoundaryIs: { LinearRing: { coordinates: string } }
								}
							}
							parcelles: {
								parcelle: (
									| {
											'descriptif-parcelle': {
												'culture-principale': {
													'code-culture': string
													precision: number
												}
												'agri-bio': string
											}
											geometrie: {
												Polygon: {
													outerBoundaryIs: {
														LinearRing: { coordinates: string }
													}
												}
											}
											'surface-admissible': number
									  }
									| {
											'descriptif-parcelle': {
												'culture-principale': {
													'code-culture': string
													precision?: never
												}
												'agri-bio': string
											}
											geometrie: {
												Polygon: {
													outerBoundaryIs: {
														LinearRing: { coordinates: string }
													}
												}
											}
											'surface-admissible': number
									  }
								)[]
							}
							'elements-bio': {
								'element-bio': {
									'numero-element': number
									'code-mesure': string
									geometrie: {
										Polygon: {
											outerBoundaryIs: { LinearRing: { coordinates: string } }
										}
									}
								}[]
							}
					  }
					| {
							commune: number
							geometrie: {
								Polygon: {
									outerBoundaryIs: { LinearRing: { coordinates: string } }
								}
							}
							parcelles: {
								parcelle: {
									'descriptif-parcelle': {
										'culture-principale': {
											'code-culture': string
											precision: number
										}
										'agri-bio': string
										'engagements-maec'?: never
									}
									geometrie: {
										Polygon: {
											outerBoundaryIs: { LinearRing: { coordinates: string } }
										}
									}
									'surface-admissible': number
								}
							}
							'elements-bio': {
								'element-bio': {
									'numero-element': number
									'code-mesure': string
									geometrie: {
										Polygon: {
											outerBoundaryIs: { LinearRing: { coordinates: string } }
										}
									}
								}
							}
					  }
				>[]
				'sna-declaree': {
					numeroSna: number
					categorieSna: string
					typeSna: string
					geometrie: {
						Polygon: {
							outerBoundaryIs: { LinearRing: { coordinates: string } }
						}
						Point?: never
					}
					intersectionsSnaIlots: {
						intersectionSnaIlot: { numeroIlot: number; largeur?: never }
					}
					intersectionsSnaParcelles: {
						intersectionSnaParcelle:
							| {
									numeroIlot: number
									numeroParcelle: number
									'longueur-sie': number
							  }
							| {
									numeroIlot: number
									numeroParcelle: number
									'longueur-sie': number
							  }[]
					}
				}[]
				'zdh-declaree': {
					numeroZdh: number
					densiteVegetation: string
					geometrie: {
						Polygon: {
							outerBoundaryIs: { LinearRing: { coordinates: string } }
						}
					}
				}
			}
			'demandes-aides-pilier1-et-AR': {
				'demande-aides-decouplees': string
				'demande-legumineuses-fourrageres': string
				'demande-assurance-recolte': string
			}
			'demandes-aides-pilier2': { ichn: string }
			'pieces-jointes': { pj: { intitule: string }[] }
		}
	}
}

export const CodeCultureLookup = {
	AVH: "Avoine d'hiver",
	AVP: 'Avoine de printemps',
	BDH: "Blé dur d'hiver",
	BDP: 'Blé dur de printemps',
	BTH: "Blé tendre d'hiver",
	BTP: 'Blé tendre de printemps',
	EPE: 'Epeautre (petit épeautre ou engrain et grand épeautre)',
	MIS: 'Maïs (hors maïs doux)',
	MID: 'Maïs doux',
	MLT: 'Millet',
	MOH: 'Moha',
	ORH: "Orge d'hiver",
	ORP: 'Orge de printemps',
	RIZ: 'Riz',
	SRS: 'Sarrasin',
	SGH: "Seigle d'hiver",
	SGP: 'Seigle de printemps',
	SOG: 'Sorgho',
	TTH: "Triticale d'hiver",
	TTP: 'Triticale de printemps',
	CAG: 'Autre céréale ou pseudo-céréale secondaire de printemps (alpiste, quinoa, chia,�)',
	CAH: "Autre céréale ou pseudo-céréale secondaire d'hiver",
	MCS: 'Mélange de céréales ou pseudo-céréales de printemps entre elles',
	MCR: "Mélange de céréales ou pseudo-céréales d'hiver entre elles",
	CML: 'Cameline',
	CZH: "Colza d'hiver",
	CZP: 'Colza de printemps',
	LIH: "Lin non textile d'hiver",
	LIP: 'Lin non textile de printemps',
	MOT: "Moutarde d'hiver",
	OEI: 'Oeillette (pavot)',
	TRN: 'Tournesol',
	OAG: "Autres oléagineux ou mélange d'oléagineux de printemps et d'été (dont moutarde ou navette d'été, sésame et nyger)",
	OHR: "Autres oléagineux ou mélange d'oléagineux d'hiver (dont navette d'hiver)",
	ARA: 'Arachide',
	FEV: 'Fève',
	FNU: 'Fenugrec',
	FVL: 'F�verole d�hiver',
	FVP: 'F�verole de printemps',
	GES: 'Cornille, dolique (y/c lablab), gesse',
	LEC: 'Lentille',
	LDH: 'Lupin doux d�hiver',
	LDP: 'Lupin doux de printemps',
	LOT: 'Lotier, minette',
	PCH: 'Pois chiche',
	PHI: 'Pois prot�agineux d�hiver (alimentation animale)',
	PPR: 'Pois prot�agineux de printemps (alimentation animale)',
	PHS: 'Pois et haricot secs (alimentation humaine)',
	PHF: 'Pois et haricot frais (alimentation humaine)',
	LUZ: 'Luzerne',
	SAI: 'Sainfoin',
	SOJ: 'Soja',
	TRE: 'Tr�fle',
	VES: 'Vesce, m�lilot, jarosse, serradelle',
	PAG: 'Autre l�gumineuse � graines ou fourrag�res',
	MLF: 'Mélange de légumineuses à graines ou fourragères pures',
	MPC: 'Mélange multi-espèces avec légumineuses à graines prépondérantes sans graminées prairiales',
	MLC: 'Mélange multi-espèces avec légumineuses fourragères prépondérantes sans graminées prairiales',
	CPL: 'Mélange multi-espèces (céréales, oléagineux, légumineuses, ...) sans graminées prairiales et sans prédominance de légumineuses',
	CID: 'Cultures conduites en inter-rangs (bandes de cultures différentes) à 2 cultures représentant chacune plus de 25 %',
	CIT: 'Cultures conduites en inter-rangs (bandes de cultures différentes) à 3 cultures représentant chacune plus de 25 %',
	MDI: 'Maraîchage diversifié (plusieurs espèces de fruits et légumes majoritairement non pérennes)',
	SHD: 'Surfaces hautement diversifiées (DOM)',
	MLG: 'Mélange de légumineuses prépondérantes et de graminées fourragères de 5 ans ou moins',
	PTR: 'Prairie temporaire de 5 ans ou moins et autre mélange avec graminées',
	GRA: 'Graminée pure exclusivement pour gazon ou pour production de semences certifiées',
	JAC: 'Jachère (terre arable)',
	PPH: 'Prairie de 6 ans et plus (couvert herbacé)',
	SPH: 'Prairie avec herbe prédominante et ressources fourragères ligneuses présentes',
	SPL: 'Surface pastorale à ressources fourragères ligneuses prédominantes',
	CAE: 'Châtaigneraie entretenue par des porcins ou des petits ruminants',
	CEE: 'Chênaie entretenue par des porcins ou des petits ruminants',
	BTN: 'Betterave',
	CHV: 'Chanvre',
	CSA: 'Canne à sucre',
	HBL: 'Houblon',
	LIF: 'Lin fibres',
	PTC: 'Pomme de terre',
	TAB: 'Tabac',
	AIL: 'Ail',
	ANA: 'Ananas',
	ART: 'Artichaut',
	BEF: 'Banane (export)',
	BCA: 'Banane (hors export)',
	CAR: 'Carotte',
	CEL: 'Céleri',
	CHU: 'Chou',
	CCN: 'Concombre, cornichon et courgette',
	EPI: 'Epinard, oseille et bette',
	FRA: 'Fraise (en pleine terre)',
	LBF: 'Laitue, endive et autres salades',
	MLO: 'Melon et pastèque',
	NVT: 'Navet, rutabaga et autres l�gumes racines (hors carotte, radis, betterave)',
	OIG: 'Oignon et échalote',
	RDI: 'Radis',
	POR: 'Poireau',
	PVP: 'Poivron, piment et aubergine',
	POT: 'Potiron, citrouille et autres courges',
	TOM: 'Tomate (en pleine terre)',
	TBT: 'Tubercule tropical',
	FLA: 'Autre légume ou fruit annuel',
	FLP: 'Autre légume ou fruit pérenne (hors petits fruits à baie)',
	AGR: 'Agrume',
	CAC: 'Café et cacao',
	CBT: 'Cerise',
	CTG: 'Châtaigne',
	NOS: 'Noisette',
	NOX: 'Noix (y compris noix de coco)',
	OLI: 'Oliveraie',
	PVT: 'Pêche (y/c nectarine, brugnon)',
	PWT: 'Poire',
	PRU: 'Prune (y compris mirabelle, quetsche, reine-claude,�)',
	VRG: 'Autre verger (y compris verger DOM)',
	PFR: 'Petit fruit à baie (hors fraise)',
	PPP: 'Plantes médicinales pérennes (arbres ou arbustes) sauf cassis',
	VRC: 'Vigne (sauf vigne rouge)',
	ARP: 'Plante aromatique pérenne non arbustive ou arbor�e autre que la vanille',
	VNL: 'Vanille',
	AAR: 'Plantes aromatiques herbac�es non p�rennes (< 5 ans) autres que persil',
	PSL: 'Persil',
	PRF: 'Plantes � parfum p�rennes autres que lavande et lavandin',
	LAV: 'Lavande et lavandin',
	AME: 'Plantes m�dicinales et � parfum non p�rennes (< 5 ans)',
	PME: 'Plantes m�dicinales p�rennes (autres que arbres)',
	HPC: 'Horticulture ornementale',
	AFG: 'Autre plante fourrag�re annuelle (ni l�gumineuse, ni gramin�e, ni c�r�ale, ni ol�agineux)',
	JNO: 'Jach�re sanitaire impos�e par l�administration',
	MSW: 'Culture p�renne � forte biomasse (miscanthus, switchgrass, silphie, canne fourrag�re, ...)',
	ACP: 'Autre culture p�renne et jach�re dans les bananeraies',
	PEP: 'P�pini�re (plants laiss�s en terre plus d�un an)',
	PEV: 'P�pini�re (plants laiss�s en terre moins d�un an)',
	TRU: 'Truffi�res (ch�naie de plants mycorhiz�s)',
	TCR: 'Taillis � courte rotation',
	SBO: 'Boisement aid� d�une surface agricole',
	BOR: 'Bordure de champ',
	BTA: 'Bande tampon',
	BFS: 'Bordure le long des for�ts sans production',
	CSS: 'Cultures sous serre hors sol',
	MRS: 'Marais salants',
	SAG: 'Roseli�re (r�colte de sagnes)',
	SNU: "Parc d'�levage de monogastriques avec couvert d�grad�, voire sol nu",
	SNE: 'Surface agricole temporairement non admissible, autre que surface p�turable',
	SIN: 'Surface pastorale ou parcours non utilis� l�ann�e en cours',
	DVN: 'Avoine',
	DBM: 'Br�me',
	DBR: 'Bourrache',
	DCF: 'Chou fourrager',
	DCM: 'Cameline',
	DCR: 'Cresson al�nois',
	DCZ: 'Colza',
	DDC: 'Dactyle',
	DFL: 'Fl�ole',
	DFN: 'Fenugrec',
	DFT: 'F�tuque',
	DFV: 'F�verole',
	DGS: 'Gesse cultiv�e',
	DLL: 'Lentille',
	DLN: 'Lin',
	DLT: 'Lotier cornicul�',
	DLP: 'Lupin (blanc, bleu, jaune)',
	DLZ: 'Luzerne cultivée',
	DMD: 'Moutarde',
	DMH: 'Moha',
	DML: 'Millet jaune, perl�',
	DMN: 'Minette',
	DMT: 'M�lilot',
	DNG: 'Nyger',
	DNT: 'Navette',
	DNV: 'Navet',
	DPC: 'Pois chiche',
	DPH: 'Phac�lie',
	DPS: 'Pois',
	DPT: 'P�turin commun',
	DRD: 'Radis (fourrager, chinois)',
	DRG: 'Ray-grass',
	DRQ: 'Roquette',
	DSD: 'Serradelle',
	DSF: 'Sorgho fourrager',
	DSG: 'Seigle',
	DSH: "Sous semis d'herbe ou de l�gumineuses",
	DSJ: 'Soja',
	DSN: 'Sainfoin',
	DSR: 'Sarrasin',
	DTN: 'Tournesol',
	DTR: 'Trèfle',
	DVS: 'Vesce',
	DXF: 'X-Festulolium',
} as const

export type TelepacParser = (xml: XMLDocument) => AsyncResult<Error, Telepac>
