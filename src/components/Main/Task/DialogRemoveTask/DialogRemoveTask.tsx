import React from 'react'
import styled from 'styled-components'

import Dialog from '../../../common/Dialog/Dialog'
import { TaskType } from '../task.type'

interface DialogRemoveTaskProps {
  data: TaskType
  refDialog: React.RefObject<HTMLDialogElement>
}

const CommonBox = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const ButtonsBox = styled('div')`
  display: flex;
  justify-content: center;
`

const Text = styled('p')`
  margin-bottom: 30px;
`

const StyledNameTask = styled('span')`
  font-family: Rubik;
  font-weight: 600;
`

const StyledButton = styled('button')`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey[300]};
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
  }
`

const ButtonConfirm = styled(StyledButton)`
  margin-right: 50px;
`

const ButtonCancel = styled(StyledButton)``

function DialogRemoveTask({
  data,
  handleRemoveTask,
  refDialog,
}: DialogRemoveTaskProps & { handleRemoveTask: () => void }) {
  const { nameTask } = data

  function handleCancel() {
    if (refDialog.current) {
      refDialog.current.close()
    }
  }

  return (
    <Dialog ref={refDialog}>
      <CommonBox>
        <Text>
          Вы действительно хотите удалить задачу <StyledNameTask>{nameTask}</StyledNameTask>?
        </Text>

        <ButtonsBox>
          <ButtonConfirm onClick={handleRemoveTask}>Удалить</ButtonConfirm>
          <ButtonCancel onClick={handleCancel}>Отмена</ButtonCancel>
        </ButtonsBox>
      </CommonBox>
    </Dialog>
  )
}

export default DialogRemoveTask
