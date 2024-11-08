<script>
	import { Motion, useDragControls } from 'svelte-motion';

	const dragControls = useDragControls();

	function startDrag(event) {
		dragControls.start(event, { snapToCursor: true });
	}
</script>

<Motion drag="xy" let:motion {dragControls}>
	<div use:motion>
		<h4>HOWDY</h4>
	</div>
</Motion>
<div on:pointerdown={startDrag}></div>
