<script lang="ts">
	import SheInput from './she/SheInput.svelte'
	import mainStore from '~/stores/main-store.svelte'
	import SheFlex from './she/SheFlex.svelte'
	import SheIconButton from './she/SheIconButton.svelte'
	import { withMinMax } from '~/modules/withMinMax'

	const toggleScaleLink = () => {
		mainStore.updateItem({
			id: mainStore.selectedItem.id,
			isScaleLinked: !mainStore.selectedItem.isScaleLinked
		})
	}

	const updateItem = (key: string) => {
		const scaleKeys = ['scaleX', 'scaleY', 'scaleZ']
		const isScale = scaleKeys.includes(key)

		if (isScale)
			return (value: number) => {
				const isScaleLinked = mainStore.selectedItem.isScaleLinked
				const ratio = value / mainStore.selectedItem[key]

				if (isScaleLinked) {
					mainStore.updateItem({
						id: mainStore.selectedItem.id,
						scaleX: mainStore.selectedItem.scaleX * ratio,
						scaleY: mainStore.selectedItem.scaleY * ratio,
						scaleZ: mainStore.selectedItem.scaleZ * ratio
					})
				}

				if (!isScaleLinked) {
					mainStore.updateItem({
						id: mainStore.selectedItem.id,
						[key]: value
					})
				}
			}

		return (value: any) => {
			mainStore.updateItem({
				id: mainStore.selectedItem.id,
				[key]: value
			})
		}
	}

	const setSnapAmount = (value) => {
		mainStore.snapAmount = value
	}

	const getMovementAmount = () => {
		const value = Number(mainStore.snapAmount.toFixed(2))
		const final = withMinMax(0.01, 1, value)
		return final
	}
</script>

{#if mainStore.selectedItem}
	<SheFlex isColumn class="outerControlsContainer" gap="12px" alignX="start">
		<SheFlex class="ItemControlOptions" gap="12px" alignX="start">
			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={0.01}
				label="Movement Amount"
				min={0.01}
				max={1}
				value={getMovementAmount()}
				onChange={setSnapAmount}
			/>
			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={1}
				label="Rotation (%)"
				value={Math.round(mainStore.selectedItem.rotationY)}
				onChange={updateItem('rotationY')}
			/>
			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={1}
				label="Tilt (%)"
				value={mainStore.selectedItem.rotationX}
				onChange={updateItem('rotationX')}
			/>
			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={1}
				label="Lean (%)"
				value={mainStore.selectedItem.rotationZ}
				onChange={updateItem('rotationZ')}
			/>
		</SheFlex>
		<SheFlex class="ItemControlOptions" gap="12px" alignX="start">
			{#if mainStore.selectedItem.isScaleLinked}
				<SheIconButton
					class="scaleLinkButton"
					onClick={toggleScaleLink}
					isActive
					kind="dark"
					iconColor="#000000"
					library="pixelarticons"
					icon="lock"
					size="small"
				/>
			{/if}
			{#if !mainStore.selectedItem.isScaleLinked}
				<SheIconButton
					class="scaleLinkButton"
					onClick={toggleScaleLink}
					kind="dark"
					iconColor="#ffffff"
					library="pixelarticons"
					icon="lock"
					size="medium"
				/>
			{/if}

			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={0.1}
				label="Scale (X)"
				value={mainStore.selectedItem.scaleX}
				onChange={updateItem('scaleX')}
			/>
			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={0.1}
				label="Scale (Y)"
				value={mainStore.selectedItem.scaleY}
				onChange={updateItem('scaleY')}
			/>
			<SheInput
				size="medium"
				class="itemAdjustmentController"
				type="number"
				step={0.1}
				label="Scale (Z)"
				value={mainStore.selectedItem.scaleZ}
				onChange={updateItem('scaleZ')}
			/>
		</SheFlex>
	</SheFlex>
{/if}

<style>
	:global {
		.outerControlsContainer {
			height: 160px;
			padding: 24px;
			position: absolute;
			bottom: 0px;
			left: 0px;
			width: 100vw;
			background: linear-gradient(to top, var(--gray40), rgba(0, 0, 0, 0));
		}

		.ItemControlOptions {
			/* padding: 8px; */
		}

		.itemAdjustmentController {
			width: min-content !important;
			background: var(--gray40) !important;

			input {
				width: 64px !important;
			}
		}

		.scaleLinkButton.isActive {
			background: var(--gray0);
			color: var(--gray40);
		}
	}
</style>
