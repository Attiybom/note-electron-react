import { dialog } from 'electron'
import { ensureDir, readFile, readdir, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'
import { NoteInfo } from 'src/renderer/src/shared/models'
import { appDirectoryName, fileEncoding } from '../../renderer/src/shared/constants'
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
