import { contextBridge, ipcRenderer } from 'electron'
import { GetNotes } from 'src/renderer/src/shared/types'

if (!process.contextIsolated) {
  throw new Error('Electron is not in context isolated mode')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args)
  })
} catch (error) {
  console.error('Failed to expose context:', error)
}
