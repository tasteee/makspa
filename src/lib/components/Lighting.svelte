<script lang="ts">
	import { T } from '@threlte/core'
	import { ContactShadows } from '@threlte/extras'
</script>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />
<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
