<script>
	import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import { ShareNodesSolid } from 'flowbite-svelte-icons';
</script>

<SpeedDial shadow="pink" gradient color="pink" defaultClass="absolute end-48 bottom-48">
	<SpeedDialButton name="Share">
		<ShareNodesSolid class="h-6 w-6" />
	</SpeedDialButton>
</SpeedDial>
