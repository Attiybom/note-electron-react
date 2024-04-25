import { MDXEditorMethods } from '@mdxeditor/editor'
import { autoSavingTime } from '@renderer/shared/constants'
import { NoteContent } from '@renderer/shared/models'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  const saveNote = useSetAtom(saveNoteAtom)

  const editorRef = useRef<MDXEditorMethods>(null)

  // auto save some time after editing
  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.log('auto save', selectedNote.title)

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSave.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content) {
      await saveNote(content)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSave,
    handleBlur
  }
}
