import React, { forwardRef } from 'react'
import styled from 'styled-components'

import withFakeFocus from '../../HOC/withFakeFocus'
import CloseIcon from '../../images/icons/close.svg'

const StyledDialog = styled('dialog')`
  position: relative;
  border: none;
  border-radius: 10px;
  padding: 30px;
  min-width: 400px;

  :where(& input, & textarea, & label, & div) {
    width: 100%;
  }
`

const StyledCloseIcon = styled('svg')`
  background: url(${CloseIcon}) no-repeat center center;
  width: 100%;
  height: 100%;
  // filter: brightness(0) saturate(100%);
`

const ButtonClose = styled('button')`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  &:focus {
    background-color: white;
  }

  &:focus-visible {
    outline: none;
  }
`

const styleButtonCloseForFakeFocus: React.CSSProperties = {
  position: 'absolute',
  right: '5px',
  top: '5px',
  width: '30px',
  height: '30px',
  borderRadius: '50%',
}

const Label = styled('label')`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const Input = styled('input')``

const TextArea = styled('textarea')`
  min-width: 400px;
  max-width: 1000px;
  min-height: 40px;
  margin-bottom: -4px;
`

const Deadline = styled('input')`
  &::placeholder {
    color: lime;
  }
`

const FormNewTask = forwardRef(function (props, ref: any) {
  const InputWithFakeFocus = withFakeFocus(Input)
  const TextAreaWithFakeFocus = withFakeFocus(TextArea)
  const DeadlineWithFakeFocus = withFakeFocus(Deadline)
  const ButtonCloseWithFakeFocus = withFakeFocus(ButtonClose)

  function handleClose() {
    if (ref.current) {
      ref.current.close()
    }
  }

  return (
    <StyledDialog ref={ref}>
      <ButtonCloseWithFakeFocus
        $wrapperStyle={styleButtonCloseForFakeFocus}
        onClick={handleClose}
      >
        <StyledCloseIcon />
      </ButtonCloseWithFakeFocus>

      <form>
        <Label>
          Название задачи
          <InputWithFakeFocus placeholder='Испечь пирожки...' />
        </Label>

        <Label>
          Описание
          <TextAreaWithFakeFocus
            placeholder='3 стакана муки, 1 стакан молока, дрожжи, кубик сливочного масла...'
            rows={9}
          />
        </Label>

        <Label>
          Крайний срок выполнения
          <DeadlineWithFakeFocus type='date' />
        </Label>
      </form>
    </StyledDialog>
  )
})

FormNewTask.displayName = 'FormNewTask'

export default FormNewTask
