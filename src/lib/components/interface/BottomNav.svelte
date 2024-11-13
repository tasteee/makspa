<script>
	import { BottomNav, BottomNavItem, Tooltip, Skeleton, ImagePlaceholder } from 'flowbite-svelte'
	import {
		HomeSolid,
		WalletSolid,
		AdjustmentsVerticalOutline,
		UserCircleSolid,
		PlusOutline
	} from 'flowbite-svelte-icons'
</script>

<!-- <Skeleton class="py-4" /> -->
<!-- <ImagePlaceholder class="pb-20" /> -->

<BottomNav
	class="BottomNav"
	classActive="activeMenuItem"
	position="absolute"
	navType="application"
	classInner="grid-cols-5"
>
	<BottomNavItem class="activeMenuItem" btnName="Home" appBtnPosition="left">
		<HomeSolid class="icon" />
		<Tooltip arrow={false}>Home</Tooltip>
	</BottomNavItem>
	<BottomNavItem btnName="Wallet" appBtnPosition="middle">
		<WalletSolid class="icon" />
		<Tooltip arrow={false}>Wallet</Tooltip>
	</BottomNavItem>
	<div class="flex items-center justify-center">
		<BottomNavItem
			btnName="Create new item"
			appBtnPosition="middle"
			btnClass="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary-600 rounded-full hover:bg-primary-700 group focus:ring-4 focus:ring-primary-300 focus:outline-none dark:focus:ring-primary-800"
		>
			<PlusOutline class="text-white" />
			<Tooltip arrow={false}>Create new item</Tooltip>
		</BottomNavItem>
	</div>
	<BottomNavItem btnName="Settings" appBtnPosition="middle">
		<AdjustmentsVerticalOutline class="icon" />
		<Tooltip arrow={false}>Settings</Tooltip>
	</BottomNavItem>
	<BottomNavItem btnName="Profile" appBtnPosition="right">
		<UserCircleSolid class="icon" />
		<Tooltip arrow={false}>Profile</Tooltip>
	</BottomNavItem>
</BottomNav>

<style>
	:global(.BottomNav) {
		bottom: 0;
		box-shadow: var(--gradientA);
		outline: 1px solid black;
	}

	:global(.activeMenuItem) {
		opacity: 0;
	}

	:global(.icon) {
		margin-bottom: 0.25rem;
		width: 1.5rem;
		height: 1.5rem;
		color: #6b7280;
	}
</style>
