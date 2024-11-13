<script lang="ts">
	import { T } from '@threlte/core'

	const { size, children } = $props<{
		size: number
		children: () => unknown
	}>()

	const lineColor = 0x00ff00 // Lime green
	console.log('RENDERING A LIGHT')
</script>

<T.Group>
	<T.Mesh>
		<T.BoxGeometry args={[size, size, size]} />
		<T.MeshBasicMaterial color={lineColor} opacity={0.5} transparent />
	</T.Mesh>
	{@render children()}
</T.Group>
