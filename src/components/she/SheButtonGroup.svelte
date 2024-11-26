<script lang="ts">
	import SheButton from './SheButton.svelte'

	type PropsT = {
		children: () => any
	}

	const props: PropsT = $props()
</script>

<div class="SheButtonGroup noselect">
	{@render props.children()}
</div>
