<script lang="ts">
	import SheIcon from './SheIcon.svelte'
	import classcat from 'classcat'

	type PropsT = {
		class?: string
		kind?: 'dark' | 'light' | string
		size?: 'small' | 'medium' | 'large' | string
		isDisabled?: boolean
		isActive?: boolean
		onClick?: () => void
		children?: () => any
		iconSide?: 'left' | 'right' | string
		iconLibrary?: string
		icon?: string
	}

	// SVELTE 5: RUNES: $props()
	let props: PropsT = $props()
	let iconSide = $derived(props.iconSide || 'left')
	let classes = $derived(classcat([props.class, props.kind, props.size, props.isActive ? 'isActive' : '']))
</script>

{#snippet icon()}
	{#if props.icon && props.iconLibrary}
		<SheIcon library={props.iconLibrary} icon={props.icon} class="SheButtonIcon" />
	{/if}
{/snippet}

<button class="SheButton {classes}" disabled={props.isDisabled} onclick={props.onClick}>
	{#if iconSide === 'left'}
		{@render icon()}
	{/if}
	{@render props.children?.()}
	{#if iconSide === 'right'}
		{@render icon()}
	{/if}
</button>

<style>
	:global {
		.SheButton {
			user-select: none;
			font-size: 14px;
			font-weight: 400;
			padding: 1px 8px;
			border-radius: 5px;
			cursor: pointer;
			transition: all 0.1s ease-in-out;
			outline: none;
			border: none;
			text-align: center;
			gap: 8px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: 30px;
			background-color: transparent;
			box-shadow: var(--shadowBorder10);
			color: var(--gray10);
		}

		.SheButton.light {
			background: var(--gray5);
			color: var(--gray40);
			box-shadow: none;

			.SheButtonIcon {
				color: var(--gray20);
			}

			&:hover {
				background: var(--gray0);
				color: var(--gray40);

				.SheButtonIcon {
					color: var(--gray40);
				}
			}
		}

		.SheButton.dark {
			background-color: var(--gray40);
			color: var(--gray5);
			box-shadow: var(--shadowBorder25);

			&:hover {
				background-color: var(--gray30);
				color: var(--gray0);

				.SheButtonIcon {
					color: var(--gray0);
				}
			}

			&.isActive {
				background: var(--gray35);
				box-shadow:
					inset 0 0 0 1px var(--gray0),
					0 0 2px 2px #ffffff44;
			}
		}

		.SheButton:hover {
			background: var(--gray35);
			box-shadow:
				inset 0 0 0 1px var(--gray0),
				0 0 2px 2px #ffffff44,
				inset 0 0 2px 2px #ffffff44;
		}

		.SheButton:active {
			box-shadow:
				inset 0 0 0 1px var(--gray0),
				0 0 12px 2px #ffffff85,
				inset 0 0 12px 2px #ffffff85;
		}

		.SheButton:disabled {
			box-shadow: var(--shadowBorder20);
			color: var(--gray20);
			cursor: not-allowed;
			pointer-events: none;
		}

		.SheButton.small {
			height: 24px;
		}

		.SheButton.large {
			height: 40px;
			padding: 0px 8px 0px;
		}

		.SheButtonIcon {
			margin: 0 4px;
		}
	}
</style>
