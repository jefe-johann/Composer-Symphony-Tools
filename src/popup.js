const toggle = document.getElementById('keepAliveToggle')
const extensionStorage = globalThis.steExtensionApi.storage

extensionStorage.local.get({ keepAlive: true }).then((data) => {
  toggle.checked = data.keepAlive
})

toggle.addEventListener('change', () => {
  extensionStorage.local.set({ keepAlive: toggle.checked })
})
