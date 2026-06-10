(() => {
  const marker = 'data-ste-page-scripts-injected'
  const root = document.documentElement
  const api = globalThis.steExtensionApi

  if (!root || !api) {
    return
  }

  if (root.hasAttribute(marker)) {
    return
  }

  root.setAttribute(marker, 'true')

  const injectScript = (path) => new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = api.runtime.getURL(path)
    script.async = false
    script.onload = () => {
      script.remove()
      resolve()
    }
    script.onerror = () => {
      script.remove()
      reject(new Error(`Failed to inject ${path}`))
    }

    ;(document.head || root).appendChild(script)
  })

  ;(async () => {
    try {
      await injectScript('common.js')
      await injectScript('symphony.js')
    } catch (error) {
      root.removeAttribute(marker)
      console.error('[symphony-tools-extension]', error)
    }
  })()
})()
