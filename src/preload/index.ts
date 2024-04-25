import { contextBridge, ipcRenderer } from 'electron'
import { CreateNote, GetNotes, ReadNote, WriteNote } from 'src/renderer/src/shared/types'

if (!process.contextIsolated) {
  throw new Error('Electron is not in context isolated mode')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args)
  })
} catch (error) {
  console.error('Failed to expose context:', error)
}
