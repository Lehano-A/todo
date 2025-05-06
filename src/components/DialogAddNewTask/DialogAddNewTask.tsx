import React, { forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import uniqid from 'uniqid'

import { closeDialog } from '../../redux/reducers/slices/dialogsSlice'
import { addNewTask } from '../../redux/reducers/slices/tasksSlice'
import { TaskType } from '../Main/Task/task.type'
import Dialog from '../common/Dialog/Dialog'
import FormTask from '../common/FormTask/FormTask'

const Title = styled('h2')`
  margin-bottom: 25px;
`

const DialogAddNewTask = forwardRef(function (_, ref: any) {
  const dispatch = useDispatch()

  // обработать закрытие диалогового окна
  function handleCloseDialog() {
    if (ref.current) {
      ref.current.close()
      dispatch(closeDialog({ dialogName: 'dialogAddNewTask' }))
    }
  }

  // обработать создание новой задачи
  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>, inputsValues: TaskType) {
    const values = {
      ...inputsValues,
      id: uniqid(),
    }

    dispatch(addNewTask(values))
    handleCloseDialog()
  }

  return (
    <Dialog
      ref={ref}
      handleCloseDialog={handleCloseDialog}
    >
      <Title>Создаём новую задачу</Title>

      <FormTask handleSubmit={handleCreateNewTask} />
    </Dialog>
  )
})

DialogAddNewTask.displayName = 'DialogAddNewTask'

export default DialogAddNewTask
