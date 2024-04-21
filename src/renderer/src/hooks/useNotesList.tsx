import { notesAtom, selectedNoteIndexAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteClick = (index: number) => async () => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      await onSelect()
    }
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteClick
  }
}
