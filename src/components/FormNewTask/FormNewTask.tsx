import React, { forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import uniqid from 'uniqid'

import { TODO_TASKS } from '../../constants'
import { ReactComponent as IconClose } from '../../images/icons/close.svg'
import { TaskType } from '../Main/Task/task.type'
import useActionsWithTasks from '../hooks/useActionsWithTasks'

const StyledDialog = styled('dialog')`
  border: none;
  border-radius: 10px;
  padding: 30px;
  min-width: 400px;

  :where(& input, & textarea, & label, & div) {
    width: 100%;
  }
`

const Title = styled('h2')`
  margin-bottom: 25px;
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
  font-family: Rubik-Regular, Roboto, Arial, sans-serif;

  &:disabled {
    background: ${({ theme }) => theme.palette.grey[300]};
    cursor: default;
  }
`

const defaultValues = { id: '', nameTask: '', description: '', deadline: '' }

const FormNewTask = forwardRef(function (props, ref: any) {
  const [inputsValues, setInputsValues] = useState<TaskType>(defaultValues)
  const [isPressedButtonCreateTask, setIsPressedButtonCreateTask] = useState(false)

  const { addNewTask } = useActionsWithTasks()

  useEffect(() => {
    if (isPressedButtonCreateTask) {
      addNewTask(TODO_TASKS, inputsValues)
    }

    return () => {
      setIsPressedButtonCreateTask(false)
      setInputsValues(defaultValues)
    }
  }, [isPressedButtonCreateTask])

  // обработать закрытие диалогового окна
  function handleCloseDialog() {
    if (ref.current) {
      ref.current.close()
    }
  }

  // обработать входящее значение инпута
  function handleInputValue(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target

    setInputsValues((prevState) => ({ ...prevState, [name]: value }))
  }

  // обработать создание новой задачи
  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    addNewTaskInLS()
    handleCloseDialog()
  }

  // добавить новую задачу в ЛХ
  function addNewTaskInLS() {
    setIsPressedButtonCreateTask(true)
    setInputsValues((prevState) => ({ ...prevState, id: uniqid() }))
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

      <Title>Создаём новую задачу</Title>

      <form onSubmit={handleCreateNewTask}>
        <Label>
          Название задачи
          <NameTask
            name='nameTask'
            onChange={handleInputValue}
            placeholder='Испечь пирожки...'
            required
            value={inputsValues.nameTask}
          />
        </Label>

        <Label>
          Описание
          <Description
            name='description'
            onChange={handleInputValue}
            placeholder='3 стакана муки, 1 стакан молока, дрожжи, кубик сливочного масла...'
            rows={9}
            value={inputsValues.description}
          />
        </Label>

        <Label>
          Крайний срок выполнения
          <Deadline
            name='deadline'
            type='date'
          />
        </Label>

        <ButtonSubmit disabled={!inputsValues.nameTask}>Создать</ButtonSubmit>
      </form>
    </StyledDialog>
  )
})

FormNewTask.displayName = 'FormNewTask'

export default FormNewTask
