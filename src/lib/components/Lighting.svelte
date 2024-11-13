<script lang="ts">
	import { T } from '@threlte/core'
	import { ContactShadows } from '@threlte/extras'
	import { Environment } from '@threlte/extras'
</script>

<!-- Key light from front-right -->
<T.DirectionalLight intensity={1.0} position.x={4} position.y={5} position.z={4} castShadow />

<!-- Fill light from left -->
<T.DirectionalLight intensity={0.5} position.x={-4} position.y={3} position.z={-2} />

<!-- Ambient light for overall scene brightness -->
<T.AmbientLight intensity={0.94} />

<!-- Hemisphere light for natural sky-ground reflection -->
<T.HemisphereLight intensity={0.5} color="#ffffff" groundColor="#8888ff" />

<!-- Point light at center for additional fill -->
<T.PointLight intensity={0.6} position.x={0} position.y={5} position.z={0} distance={20} decay={2} />

<T.DirectionalLight castShadow position={[8, 20, -3]} />

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />
