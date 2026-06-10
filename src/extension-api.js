(() => {
  const extensionApi = globalThis.browser ?? globalThis.chrome

  if (!extensionApi) {
    throw new Error('Symphony Tools extension APIs are unavailable')
  }

  const callStorageLocal = (methodName, ...args) => {
    return new Promise((resolve, reject) => {
      const callback = (result) => {
        const error = extensionApi.runtime?.lastError
        if (error) {
          reject(new Error(error.message))
          return
        }

        resolve(result)
      }

      try {
        const result = extensionApi.storage.local[methodName](...args, callback)
        if (result && typeof result.then === 'function') {
          result.then(resolve, reject)
        }
      } catch (callbackError) {
        try {
          const result = extensionApi.storage.local[methodName](...args)
          if (result && typeof result.then === 'function') {
            result.then(resolve, reject)
            return
          }

          resolve(result)
        } catch (promiseError) {
          reject(promiseError)
        }
      }
    })
  }

  globalThis.steExtensionApi = {
    runtime: {
      getURL: (path) => extensionApi.runtime.getURL(path),
    },
    storage: {
      local: {
        get: (...args) => callStorageLocal('get', ...args),
        set: (...args) => callStorageLocal('set', ...args),
      },
      onChanged: {
        addListener: (listener) => extensionApi.storage.onChanged.addListener(listener),
      },
    },
  }
})()
