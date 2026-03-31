const toggle = document.getElementById('keepAliveToggle')

chrome.storage.local.get({ keepAlive: true }, (data) => {
  toggle.checked = data.keepAlive
})

toggle.addEventListener('change', () => {
  chrome.storage.local.set({ keepAlive: toggle.checked })
})
