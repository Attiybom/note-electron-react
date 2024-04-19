import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Electron is not in context isolated mode')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO: add your exposed functions here
  })
} catch (error) {
  console.error('Failed to expose context:', error)
}
