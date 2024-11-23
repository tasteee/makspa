<script lang="ts">
	type PropsT = { text: string }
	const props: PropsT = $props()
</script>

<span class="sr-only">{props.text}</span>
