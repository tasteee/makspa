<script>
	import { onMount } from 'svelte'
	import ShePanel from '~/components/she/ShePanel.svelte'
	import ShePanelSection from '~/components/she/ShePanelSection.svelte'
	import ShePanelInnerSection from '~/components/she/ShePanelInnerSection.svelte'
	import SheInput from '~/components/she/SheInput.svelte'
	import SheSwitch from '~/components/she/SheSwitch.svelte'
	import SheButton from '~/components/she/SheButton.svelte'
	import SheSpacer from '~/components/she/SheSpacer.svelte'
	import SheIconButton from '~/components/she/SheIconButton.svelte'
	import SheColorInput from '~/components/she/SheColorInput.svelte'
	import ShePanelRow from '~/components/she/ShePanelRow.svelte'
	import SheFlex from '~/components/she/SheFlex.svelte'
	import auth from '~/stores/auth.store.svelte'

	let username = $state('')
	let password = $state('')
	let shouldRemember = $state(false)
	let isLoginForm = $state(true)
	let isSignUpForm = $derived(!isLoginForm)
	const switchToLoginForm = () => (isLoginForm = true)
	const switchToRegisterForm = () => (isLoginForm = false)
	const toggleRemember = () => (shouldRemember = !shouldRemember)
	const login = () => auth.login(username, password, shouldRemember)

	$effect(() => {
		if (!auth.isAuthenticated) return
		window.location.assign('/app/home')
	})
</script>

<div class="AuthenticationView">
	{#if isLoginForm}
		<ShePanel class="LoginPanel" title="Log In" width="420px" isOpen isCloseable={false} isCollapsible={false}>
			<SheFlex isColumn gap="12px" padding="36px 24px 24px">
				<SheInput size="large" type="text" label="Name" value={username} onChange={(value) => (username = value)} />
				<SheInput
					size="large"
					type="password"
					label="Password"
					value={password}
					onChange={(value) => (password = value)}
				/>
			</SheFlex>
			<SheFlex isColumn gap="12px" padding="0px 24px 6px">
				<SheSwitch label="Remember Me" value={shouldRemember} onChange={toggleRemember} />
				<SheFlex gap="12px" padding="12px 0px" xAlign="stretch" class="authButtonsRow">
					<SheButton fillWidth size="large" kind="dark" onClick={login}>Log In</SheButton>
					<SheButton fillWidth size="large" kind="light" onClick={switchToRegisterForm}>Register</SheButton>
				</SheFlex>
			</SheFlex>
		</ShePanel>
	{/if}

	{#if isSignUpForm}
		<ShePanel class="LoginPanel" title="Register" width="420px" isOpen isCloseable={false} isCollapsible={false}>
			<SheFlex isColumn gap="12px" padding="36px 24px 24px">
				<SheInput size="large" type="text" label="Name" value={username} onChange={(value) => (username = value)} />
				<SheInput
					size="large"
					type="password"
					label="Password"
					value={password}
					onChange={(value) => (password = value)}
				/>
			</SheFlex>
			<SheFlex isColumn gap="12px" padding="0px 24px 6px">
				<SheSwitch label="Remember Me" value={shouldRemember} onChange={toggleRemember} />
				<SheFlex gap="12px" padding="12px 0px" xAlign="stretch" class="authButtonsRow">
					<SheButton fillWidth size="large" kind="light" onClick={register}>Register</SheButton>
					<SheButton fillWidth size="large" kind="dark" onClick={switchToLoginForm}>Log In</SheButton>
				</SheFlex>
			</SheFlex>
		</ShePanel>
	{/if}
</div>

<style>
	:global {
		.AuthenticationView {
			background: var(--grayGradient2);
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			width: 100vw;
			height: 100vh;

			.authButtonsRow > button {
				font-weight: 700;
				font-size: 16px;
			}

			& > .LoginPanel {
				height: auto;

				.ShePanelHeader {
					border-bottom: none;
				}

				.ShePanelHeaderTopRow {
					justify-content: center;

					h1 {
						position: relative;
						top: 12px;
					}
				}
			}
		}
	}
</style>
