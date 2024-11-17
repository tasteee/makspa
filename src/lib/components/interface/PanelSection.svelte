<script lang="ts">
	import { Drawer, Button, CloseButton, Input, Label } from 'flowbite-svelte'
	import { Icon, ArrowUp, ArrowDown } from 'svelte-hero-icons'
	import { CaretUpSolid, CaretDownSolid } from 'flowbite-svelte-icons'
</script>

<div class="PanelSection">
	<div class="InputRow">
		<Button size="sm" class="ArrowButton">
			<CaretDownSolid size="sm" />
		</Button>
		<div class="InputLabelContainer">
			<Label for="RotationInputX" class="InputLabel">Rotation X</Label>
			<Input
				size="sm"
				type="number"
				step="0.01"
				min="0"
				max="99.99"
				defaultClass="RotationInputX"
				id="RotationInputX"
			/>
		</div>
		<Button size="sm" class="ArrowButton">
			<CaretUpSolid size="sm" />
		</Button>
	</div>

	<div class="InputRow">
		<div class="InputLabelContainer">
			<Label for="RotationInputY" class="InputLabel">Rotation Y</Label>
			<Input
				size="sm"
				type="number"
				step="0.01"
				min="0"
				max="99.99"
				defaultClass="RotationInputY"
				id="RotationInputY"
			/>
		</div>
		<Button size="sm" class="ArrowButton">
			<CaretDownSolid size="sm" />
		</Button>
		<Button size="sm" class="ArrowButton">
			<CaretUpSolid size="sm" />
		</Button>
	</div>

	<div class="InputRow">
		<div class="InputLabelContainer">
			<Label for="RotationInputZ" class="InputLabel">Rotation Z</Label>
			<Input
				size="sm"
				type="number"
				step="0.01"
				min="0"
				max="99.99"
				defaultClass="RotationInputZ"
				id="RotationInputZ"
			/>
		</div>
		<Button size="sm" class="ArrowButton">
			<CaretDownSolid size="sm" />
		</Button>
		<Button size="sm" class="ArrowButton">
			<CaretUpSolid size="sm" />
		</Button>
	</div>
</div>

<style lang="scss">
	:global(.InputLabelContainer) {
		display: flex;
		flex-direction: column;
		margin: 0px 8px;
	}

	:global(.InputLabel) {
		display: flex;
	}

	:global(.InputRow) {
		display: flex;
		align-items: center;
		margin-bottom: 8px;
	}

	:global(.RotationInput) {
		width: 100px;
	}

	:global(.ArrowButton) {
		/* margin: 0px 4px; */
		max-width: 48px;
		margin-top: 20px;
	}
	/*  */
</style>
