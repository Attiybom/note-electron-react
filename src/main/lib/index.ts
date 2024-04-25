import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import { NoteInfo } from 'src/renderer/src/shared/models'
import welcomeNoet from '../../../resources/welcomeNote.md?asset'
import {
  appDirectoryName,
  fileEncoding,
  welcomeNoteFileName
} from '../../renderer/src/shared/constants'
import { CreateNote, GetNotes, ReadNote } from '../../renderer/src/shared/types'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName)
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (notes.length === 0) {
    console.log(`No notes found in ${rootDir}`)

    const content = await readFile(welcomeNoet, {
      encoding: fileEncoding
    })

    // create welcome note
    await writeFile(`${rootDir}/${welcomeNoteFileName}`, content, {
      encoding: fileEncoding
    })

    notes.push(welcomeNoteFileName)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  return await readFile(`${rootDir}/${fileName}.md`, {
    encoding: fileEncoding
  })
}

export const writeNote = async (fileName, content) => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  console.log(`Writing note ${fileName}`)

  await writeFile(`${rootDir}/${fileName}.md`, content, {
    encoding: fileEncoding
  })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: `New Note`,
    defaultPath: `${rootDir}\\untitled.md`,
    buttonLabel: `Create`,
    properties: [`showOverwriteConfirmation`],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation canceled')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (path.normalize(parentDir) !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: `Creation Failed`,
      message: `Note must be saved in ${rootDir}`
    })

    return false
  }

  console.log(`Creating note ${filePath}`)
  await writeFile(filePath, '', {
    encoding: fileEncoding
  })

  return fileName
}

export const deleteNote = async (fileName) => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: `Delete Note`,
    message: `Are you sure you want to delete ${fileName}?`,
    buttons: ['Delete', 'Cancel'], // 0 is delete, 1 is cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.log(`Deletion of note ${fileName} canceled`)
    return false
  }

  console.log(`Deleting note ${fileName}`)
  await remove(`${rootDir}/${fileName}.md`)
  return true
}
