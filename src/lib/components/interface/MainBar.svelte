<script lang="ts">
	import { Section, TableHeader } from 'flowbite-svelte-blocks'
	import { Button, Heading, P, Search, Dropdown, DropdownItem, DropdownDivider, Checkbox } from 'flowbite-svelte'
	import { ChevronDownOutline } from 'flowbite-svelte-icons'
</script>

<TableHeader divOuterClass="MainBar" headerType="search">
	<Search slot="search" size="md" />
	<Button>Add product</Button>
	<Button color="light">
		Actions<ChevronDownOutline />
	</Button>
	<Dropdown>
		<DropdownItem>Mass Edit</DropdownItem>
		<DropdownDivider />
		<DropdownItem>Delete all</DropdownItem>
	</Dropdown>
	<Button color="light">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			class="mr-2 h-4 w-4 text-gray-400"
			viewbox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
				clip-rule="evenodd"
			/>
		</svg>
		Filter<ChevronDownOutline />
	</Button>
	<Dropdown class="w-48 p-2 text-sm">
		<h6 class="mb-3 ml-1 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox>Apple (56)</Checkbox>
		</li>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox>Fitbit (56)</Checkbox>
		</li>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox checked>Dell (56)</Checkbox>
		</li>
		<li class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
			<Checkbox>Asus (97)</Checkbox>
		</li>
	</Dropdown>
</TableHeader>

<style>
	:global(.MainBar) {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 72px;
		box-shadow: var(--gradientC);
	}

	:global(:root) {
		--gradientA: 0 0 60px 30px #fff, 0 0 100px 60px #f0f, 0 0 140px 90px #0ff;
		--gradientB: 0 0 60px 30px #f0f, 0 0 100px 60px #0ff, 0 0 140px 90px #fff;
		--gradientC: 0 0 60px 30px #fff, 0 0 100px 60px #fff, 0 0 140px 90px #fff;
		--gradientD: 0 0 60px 30px #fff, 0 0 100px 60px #fff, 0 0 140px 90px #fff;
		--gradientE: 0 0 60px 30px #fff, 0 0 100px 60px #fff, 0 0 140px 90px #fff;
	}
</style>
