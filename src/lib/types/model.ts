type ArtistT = {
	uid: string;
	name: string;
	about: string;
	avatar: string;
	color: string;
};

type ModelT = {
	uid: string;
	name: string;
	file: string;
	thumbnail: string;
	artists: string[];
	scaleX: number;
	scaleY: number;
	scaleZ: number;
	rotationX: number;
	rotationY: number;
	rotationZ: number;
};
