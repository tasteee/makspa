<script lang="ts">
	import SheIconButton from './SheIconButton.svelte'
	import SheButton from './SheButton.svelte'
</script>

<div class="ItemQuickActions">
	<SheButton kind="dark">Lock Scale</SheButton>
	<SheButton kind="dark">Drop to Floor</SheButton>
	<SheButton kind="dark">Rotate X</SheButton>
	<SheButton kind="dark">Rotate Y</SheButton>
	<SheButton kind="dark">Rotate Z</SheButton>
</div>

<style>
	.ItemQuickActions {
		margin-left: 16px;
		display: flex;
		gap: 8px;
		/* position: absolute; */
		/* top: 48px; */
	}
</style>
