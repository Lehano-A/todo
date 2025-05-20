import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { closeDialog } from '../../redux/reducers/slices/dialogsSlice'
import { removeTask } from '../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../redux/store'
import Dialog from '../common/Dialog/Dialog'

interface DialogRemoveTaskProps {
  refDialog: React.RefObject<HTMLDialogElement>
}

const CommonBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  word-break: break-all;
`

const ButtonsBox = styled('div')`
  display: flex;
  justify-content: center;
`

const BoxText = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`

const ConfirmationQuestion = styled('p')`
  font-size: 1.6rem;
`

const NameTask = styled('span')`
  font-family: Rubik;
  font-weight: 600;
  margin-top: 10px;
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

function DialogRemoveTask({ refDialog }: DialogRemoveTaskProps & { handleRemoveTask?: () => void }) {
  const { dialogRemoveTask } = useSelector((state: RootState) => state.dialogs)
  const { columnName, dataTask } = dialogRemoveTask

  const dispatch = useDispatch()

  // обработать закрытие диалогового окна
  function handleCloseDialog() {
    if (refDialog.current) {
      refDialog.current.close()
      dispatch(closeDialog({ dialogName: 'dialogRemoveTask' }))
    }
  }

  // удалить задачу
  function handleRemoveTask() {
    if (columnName) dispatch(removeTask({ columnName, id: dataTask.id }))

    handleCloseDialog()
  }

  return (
    <Dialog
      ref={refDialog}
      handleCloseDialog={handleCloseDialog}
      style={{ maxWidth: '500px' }}
    >
      <CommonBox>
        <BoxText>
          <ConfirmationQuestion>Вы действительно хотите эту удалить задачу?</ConfirmationQuestion>
          <NameTask>{dataTask.nameTask}</NameTask>
        </BoxText>

        <ButtonsBox>
          <ButtonConfirm onClick={handleRemoveTask}>Удалить</ButtonConfirm>
          <ButtonCancel onClick={handleCloseDialog}>Отмена</ButtonCancel>
        </ButtonsBox>
      </CommonBox>
    </Dialog>
  )
}

export default DialogRemoveTask
