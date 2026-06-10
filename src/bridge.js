// Bridge: syncs extension storage settings to localStorage for page script access.
// ISOLATED world content scripts share localStorage with the page but can
// access extension APIs that page scripts cannot.

function syncKeepAlive(value) {
  localStorage.setItem('ste_keepAlive', JSON.stringify(value))
}

const extensionStorage = globalThis.steExtensionApi.storage

extensionStorage.local.get({ keepAlive: true }).then((data) => {
  syncKeepAlive(data.keepAlive)
})

extensionStorage.onChanged.addListener((changes, areaName) => {
  if (areaName && areaName !== 'local') {
    return
  }

  if (changes.keepAlive) {
    syncKeepAlive(changes.keepAlive.newValue)
  }
})
