import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as IconClose } from '../../../images/icons/close.svg'

const StyledDialog = styled('dialog')`
  border: none;
  border-radius: 10px;
  padding: 30px;
  min-width: 400px;

  :where(& input, & textarea, & label, & div) {
    width: 100%;
  }
`

const StyledIconClose = styled(IconClose)`
  fill: ${({ theme }) => theme.palette.primary.main};
`

const ButtonClose = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &:focus {
    ${({ theme }) => theme.focus.input}
    border-radius: 50%;
  }
`

const Dialog = forwardRef(function ({ children }: React.PropsWithChildren & { title?: string }, ref: any) {
  // обработать закрытие диалогового окна
  function handleCloseDialog() {
    if (ref.current) {
      ref.current.close()
    }
  }

  return (
    <StyledDialog ref={ref}>
      <span
        autoFocus
        tabIndex={-1}
      ></span>
      {/* "утка" для фокуса при открытии dialog */}

      <ButtonClose
        onClick={handleCloseDialog}
        tabIndex={0}
      >
        <StyledIconClose />
      </ButtonClose>

      {children}
    </StyledDialog>
  )
})

Dialog.displayName = 'Dialog'

export default Dialog
