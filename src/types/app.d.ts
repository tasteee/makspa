type PrimitiveT = number | boolean | string
type AnyObjectT = Record<string, any>
type VectorList3 = [x: number, y: number, z: number]
type VectorList2 = [x: number, y: number]
type ItemMapT = Record<string, ItemT>

type ArtistT = {
	id: string
	name: string
	about: string
	color: string
	avatar: string
}

type ModelT = {
	id: string
	name: string
	about: string
	file: string
	thumbnail: string
	artists: string[]
	scaleX: number
	scaleY: number
	scaleZ: number
	rotationX: number
	rotationY: number
	rotationZ: number
}

type ItemT = {
	id: string
	name: string
	about: string
	thumbnail: string
	model: string
	modelUrl: string
	scaleX: number
	scaleY: number
	scaleZ: number
	rotationX: number
	rotationY: number
	rotationZ: number
	positionX: number
	positionY: number
	positionZ: number
	opacity: number
	isGlowing: boolean
	isVisible: boolean
	isObstructive: boolean
	glowColor: string
	glowIntensity: number
	glowRadius: number
	glowPositionX: number
	glowPositionY: number
	glowPositionZ: number
	metalness: number
	roughness: number
	hasBeenSetUp: boolean
}

type SpaceT = {
	id: string
	name: string
	about: string
	owner: string
	artists: string[]
	color: string
	isPublic: boolean
	items: Record<string, ItemT>
	sizeX: number
	sizeY: number
	sizeZ: number
	visits: number
	hdrIntensity: number
	showHdrSky: boolean
	hdr: string
	hdrBlur: number
	isHdrEnabled: boolean
	backgroundColor: string
	backgroundMode: 'hdr' | 'color'
	isGridVisible: boolean
	gridOpacity: number
	gridCellLineColor: string
	gridCellSize: number
	gridCellLineThickness: number
	gridSectionLineColor: string
	gridSectionSize: number
	gridSectionLineThickness: number
	gridFadeAmount: number
	gridFadeDistance: number
	isFloorVisible: boolean
	floorColor1: string
	floorColor2: string
	floorOpacity1: number
	floorOpacity2: number
	soundtrack: string[]
	assets: any[]
}
