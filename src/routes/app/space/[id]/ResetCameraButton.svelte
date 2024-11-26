<script lang="ts">
	import {
		Button,
		SpeedDial,
		SpeedDialButton,
		Heading,
		P,
		Search,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Checkbox
	} from 'flowbite-svelte'
	import { RefreshOutline, ArrowUpRightFromSquareSolid, UserCircleSolid, FileCopySolid } from 'flowbite-svelte-icons'
</script>

<SpeedDial class="ResetCameraSpeedDial" defaultClass="absolute end-6 bottom-6" pill={false} tooltip="none" textOutside>
	<SpeedDialButton name="Share">
		<RefreshOutline class="h-6 w-6" />
	</SpeedDialButton>
	<SpeedDialButton name="Print">
		<ArrowUpRightFromSquareSolid class="h-6 w-6" />
	</SpeedDialButton>
	<SpeedDialButton name="Save">
		<UserCircleSolid class="h-6 w-6" />
	</SpeedDialButton>
</SpeedDial>

<style lang="postcss">
	.ResetCameraSpeedDial {
		position: absolute;
		top: 24px;
		left: 24px;
	}
</style>
