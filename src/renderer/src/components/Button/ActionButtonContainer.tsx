import { DeleteNoteButton, NewNoteButton } from '@/components'
import { ComponentProps } from 'react'

export const ActionButtonContainer = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton></NewNoteButton>
      <DeleteNoteButton></DeleteNoteButton>
    </div>
  )
}
