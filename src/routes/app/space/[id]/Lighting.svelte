<script lang="ts">
	import { T } from '@threlte/core'
	import { ContactShadows } from '@threlte/extras'
</script>

<!-- Key light from front-right -->
<T.DirectionalLight intensity={0.6} position.x={4} position.y={5} position.z={4} castShadow />
<!-- Fill light from left -->
<T.DirectionalLight intensity={0.9} position.x={-4} position.y={2} position.z={-2} />
<!-- Ambient light for overall scene brightness -->
<T.AmbientLight intensity={0.98} />
<!-- Hemisphere light for natural sky-ground reflection -->
<T.HemisphereLight intensity={0.9} color="#ffffff" groundColor="#8888ff" />
<!-- Point light at center for additional fill -->
<T.PointLight intensity={0.6} position.x={0} position.y={5} position.z={0} distance={20} decay={2} />
<T.DirectionalLight castShadow position={[0, 20, 0]} />
<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<!-- <Environment path="/hdrs/" files="aerodynamics_workshop_2k.hdr" isBackground={false} format="hdr" /> -->

<!-- hdrs/aerodynamics_workshop_2k.hdr -->
<!-- hdrs/billiard_hall_2k.hdr -->
<!-- hdrs/blaubeuren_night_1k.hdr -->
<!-- hdrs/burnt_warehouse_2k.hdr -->
<!-- hdrs/cayley_interior_2k.hdr -->
<!-- hdrs/christmas_photo_studio_01_1k.hdr -->
<!-- hdrs/creepy_bathroom_2k.hdr -->
<!-- hdrs/DayEnvironmentHDRI013_1K-HDR.hdr -->
<!-- hdrs/DaySkyHDRI043A_1K-HDR.hdr -->
<!-- hdrs/en_suite_2k.hdr -->
<!-- hdrs/hotel_room_2k.hdr -->
<!-- hdrs/metro_noord_1k.hdr -->
<!-- hdrs/metro_noord_4k-_1_.hdr -->
<!-- hdrs/ouchy_pier_2k.hdr -->
<!-- hdrs/overcast_soil_puresky_2k.hdr -->
<!-- hdrs/pine_attic_2k.hdr -->
<!-- hdrs/qwantani_2k.hdr -->
<!-- hdrs/rogland_clear_night_2k.hdr -->
<!-- hdrs/rogland_moonlit_night_2k.hdr -->
<!-- hdrs/rostock_arches_1k.hdr -->
<!-- hdrs/sandsloot_2k.hdr -->
<!-- hdrs/satara_night_1k.hdr -->
<!-- hdrs/satara_night_2k.hdr -->
<!-- hdrs/satara_night_no_lamps_2k.hdr -->
<!-- hdrs/studio_small_09_2k.hdr -->
<!-- hdrs/sunflowers_puresky_2k.hdr -->
<!-- hdrs/winter_evening_1k.hdr -->
