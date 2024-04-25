import { ActionButton, ActionButtonProps } from '@/components'
import { useSetAtom } from 'jotai'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '../../store/index'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300"></LuFileSignature>
    </ActionButton>
  )
}
