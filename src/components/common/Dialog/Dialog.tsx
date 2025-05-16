import React, { forwardRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as IconClose } from '../../../images/icons/close.svg'
import { PrimaryButton } from '../../../styled/buttons'
import { DialogProps, DialogStyledProps } from './dialog.types'

const StyledDialog = styled('dialog')<{ $style: DialogStyledProps }>`
  border: none;
  border-radius: 10px;
  padding: 30px;
  min-width: 300px;
  max-width: ${({ $style }) => ($style?.maxWidth ? $style.maxWidth : '700px')};
  width: 100%;
  overflow: visible;

  :where(& input, & textarea, & .ant-picker) {
    width: 100%;
  }
`

const StyledIconClose = styled(IconClose)`
  fill: ${({ theme }) => theme.palette.primary.main};
`

const ButtonClose = styled(PrimaryButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const Dialog = forwardRef(function (
  { children, handleCloseDialog, style }: React.PropsWithChildren & DialogProps,
  ref: any
) {
  // обработать закрытие диалогового окна

  function handleClose() {
    if (ref.current) {
      ref.current.close()
    }
  }

  return (
    <StyledDialog
      ref={ref}
      id='dialog'
      onClose={handleCloseDialog || handleClose}
      $style={style || {}}
    >
      <span
        autoFocus
        tabIndex={-1}
      ></span>
      {/* "утка" для фокуса при открытии dialog */}

      <ButtonClose
        onClick={handleCloseDialog || handleClose}
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
