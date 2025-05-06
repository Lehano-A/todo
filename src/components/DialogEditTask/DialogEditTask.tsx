import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { closeDialog } from '../../redux/reducers/slices/dialogsSlice'
import { editTask } from '../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../redux/store'
import { TaskType } from '../Main/Task/task.type'
import Dialog from '../common/Dialog/Dialog'
import FormTask from '../common/FormTask/FormTask'

interface DialogEditTaskProps {
  refDialog: React.RefObject<HTMLDialogElement>
}

function DialogEditTask({ refDialog }: DialogEditTaskProps) {
  const dispatch = useDispatch()

  const { dialogEditTask } = useSelector((state: RootState) => state.dialogs)
  const { columnName, data } = dialogEditTask

  // обработать закрытие диалогового окна
  function handleCloseDialog() {
    if (refDialog.current) {
      refDialog.current.close()
      dispatch(closeDialog({ dialogName: 'dialogEditTask' }))
    }
  }

  function handleEditSubmit(e: React.FormEvent<HTMLFormElement>, inputsValues: TaskType) {
    if (columnName) {
      dispatch(editTask({ columnName, newData: inputsValues, id: data.id }))
      handleCloseDialog()
    }
  }

  return (
    <Dialog
      ref={refDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <FormTask
        valuesForInputs={dialogEditTask.data}
        handleSubmit={handleEditSubmit}
        nameButtonSubmit='Обновить'
      />
    </Dialog>
  )
}

export default DialogEditTask
