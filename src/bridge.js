// Bridge: syncs chrome.storage settings to localStorage for MAIN world access.
// ISOLATED world content scripts share localStorage with the page but can
// access chrome.storage APIs that MAIN world scripts cannot.

function syncKeepAlive(value) {
  localStorage.setItem('ste_keepAlive', JSON.stringify(value))
}

chrome.storage.local.get({ keepAlive: true }, (data) => {
  syncKeepAlive(data.keepAlive)
})

chrome.storage.onChanged.addListener((changes) => {
  if (changes.keepAlive) {
    syncKeepAlive(changes.keepAlive.newValue)
  }
})
