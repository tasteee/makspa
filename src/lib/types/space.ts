type ArtistT = {
	uid: string
	name: string
	about: string
	avatar: string
	color: string
}

type ModelT = {
	uid: string
	name: string
	file: string
	about: string
	thumbnail: string
	// artist uids
	artists: string[]
	scaleX: number
	scaleY: number
	scaleZ: number
	rotationX: number
	rotationY: number
	rotationZ: number
}

type ItemT = {
	uid: string
	name: string
	about: string
	// model uid
	model: string
	// gltf file url
	file: string
	// thumbnail url
	thumbnail: string
	scaleX: number
	scaleY: number
	scaleZ: number
	rotationX: number
	rotationY: number
	rotationZ: number
	positionX: number
	positionY: number
	positionZ: number
	isGlowing: boolean
	glowColor: string
	glowIntensity: number
	glow_radius: number
	glow_position_x: number
	glow_position_y: number
	glow_position_z: number
	modelUrl: string
}

type SpaceT = {
	name: string
	// artist uids
	artists: string[]
	about: string
	color: string
	items: any[]
	isPublic: boolean
	sizeX: number
	sizeY: number
	sizeZ: number
	visits: number
	// audio urls
	soundtrack: string[]
	// asset urls
	assets: any[]
}
