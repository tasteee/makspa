const createItemFromModel = (model: any) => {
	class Item {
		uid: string = nanoid()
		name: string = model.name
		about: string = model.about
		artistUids: string[] = model.artistUids
		modelUrl: string = model.file + `?uid=${this.uid}`
		modelUid: string = model.uid
		sizeX: number = u.number.sizeToScale(model.size_x)
		sizeY: number = u.number.sizeToScale(model.size_y)
		sizeZ: number = u.number.sizeToScale(model.size_z)
		positionX: number = model.position_x
		positionY: number = model.position_y
		positionZ: number = model.position_z
		rotationX: number = model.rotation_x
		rotationY: number = model.rotation_y
		rotationZ: number = model.rotation_z
		scaleX: number = u.number.sizeToScale(model.scale_x)
		scaleY: number = u.number.sizeToScale(model.scale_y)
		scaleZ: number = u.number.sizeToScale(model.scale_z)
		isVisible: boolean = model.is_visible
		isGlowing: boolean = model.is_glowing

		update = (update: any) => {
			this.name = update.name ?? this.name
		}
	}

	return new Item()
}
