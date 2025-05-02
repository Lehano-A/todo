import React, { forwardRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import uniqid from 'uniqid'

import { deactivateForm } from '../../redux/reducers/slices/formNewTaskSlice'
import getFormattedDate from '../../utils/getFormattedDate'
import { TaskType } from '../Main/Task/task.type'
import Dialog from '../common/Dialog/Dialog'
import useActionsWithTasks from '../hooks/useActionsWithTasks'

const Title = styled('h2')`
  margin-bottom: 25px;
`

const Label = styled('label')`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const NameTask = styled('input')`
  &:focus {
    ${({ theme }) => theme.focus.input};
  }
`

const Description = styled('textarea')`
  min-width: 400px;
  max-width: 1000px;
  min-height: 40px;
  margin-bottom: -4px;

  &:focus {
    ${({ theme }) => theme.focus.input};
  }
`

const Deadline = styled('input')`
  &:focus {
    ${({ theme }) => theme.focus.input};
  }
`

const ButtonSubmit = styled('button')`
  text-transform: uppercase;
  color: white;
  background: ${({ theme }) => theme.palette.gradients.main};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  font-family: Rubik, Roboto, Arial, sans-serif;
  font-weight: 500;

  &:disabled {
    background: ${({ theme }) => theme.palette.grey[300]};
    cursor: default;
  }
`

const defaultValues = { id: '', nameTask: '', description: '', deadline: '' }

const FormNewTask = forwardRef(function (props, ref: any) {
  const dispatch = useDispatch()

  const [inputsValues, setInputsValues] = useState<TaskType>(defaultValues)
  const [isPressedButtonCreateTask, setIsPressedButtonCreateTask] = useState(false)

  const { addNewTask } = useActionsWithTasks()

  useEffect(() => {
    if (isPressedButtonCreateTask) {
      addNewTask('todo', inputsValues)
      handleCloseDialog()
    }
  }, [isPressedButtonCreateTask])

  // обработать закрытие диалогового окна
  function handleCloseDialog() {
    if (ref.current) {
      ref.current.close()
      dispatch(deactivateForm())
    }
  }

  // обработать входящее значение инпута
  function handleInputValue(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target

    setInputsValues((prevState) => ({
      ...prevState,
      [name]: `${name === 'deadline' ? getFormattedDate(value) : value}`,
    }))
  }

  // обработать создание новой задачи
  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsPressedButtonCreateTask(true)
    setInputsValues((prevState) => ({ ...prevState, id: uniqid() }))
  }

  return (
    <Dialog
      ref={ref}
      handleCloseDialog={handleCloseDialog}
    >
      <Title>Создаём новую задачу</Title>

      <form onSubmit={handleCreateNewTask}>
        <Label>
          Название задачи
          <NameTask
            required
            maxLength={300}
            name='nameTask'
            placeholder='Испечь пирожки...'
            value={inputsValues.nameTask}
            onChange={handleInputValue}
          />
        </Label>

        <Label>
          Описание
          <Description
            rows={9}
            name='description'
            placeholder='3 стакана муки, 1 стакан молока, дрожжи, кубик сливочного масла...'
            value={inputsValues.description}
            onChange={handleInputValue}
          />
        </Label>

        <Label>
          Крайний срок выполнения
          <Deadline
            name='deadline'
            type='date'
            onChange={handleInputValue}
          />
        </Label>

        <ButtonSubmit disabled={!inputsValues.nameTask}>Создать</ButtonSubmit>
      </form>
    </Dialog>
  )
})

FormNewTask.displayName = 'FormNewTask'

export default FormNewTask
