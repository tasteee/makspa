class MenuBarStore {
	activePanel = $state('')
	isPanelOpen = $derived(!!this.activePanel)
	closePanel = () => (this.activePanel = '')
	openPanel = (panel: string) => (this.activePanel = panel)
	togglePanel = (panel: string) => (this.activePanel = this.activePanel === panel ? '' : panel)
}

const menuBarStore = new MenuBarStore()
globalThis.menuBarStore = menuBarStore
export default menuBarStore
