import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import getFormattedDate from '../../../utils/getFormattedDate'
import { TaskType } from '../../Main/Task/task.type'

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

export const defaultFormValues: TaskType = { id: '', nameTask: '', description: '', deadline: '' }

interface FormTaskProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, inputsValues: TaskType) => void
  valuesForInputs?: TaskType
  nameButtonSubmit?: 'Создать' | 'Обновить'
}

function FormTask({ handleSubmit, valuesForInputs, nameButtonSubmit = 'Создать' }: FormTaskProps) {
  const [inputsValues, setInputsValues] = useState<TaskType>(defaultFormValues)
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true)

  useEffect(() => {
    if (valuesForInputs) {
      setInputsValues(valuesForInputs)
    }
  }, [])

  useEffect(() => {
    checkValidity()
  }, [inputsValues])

  // валидировать поля
  const checkValidity = useCallback(() => {
    const current = JSON.stringify(inputsValues)
    const preset = JSON.stringify(valuesForInputs)
    const defaults = JSON.stringify(defaultFormValues)

    if (current === preset || current === defaults) {
      setIsDisabledSubmit(true)
    } else {
      setIsDisabledSubmit(false)
    }
  }, [inputsValues, valuesForInputs])

  // обработать входящее значение инпута
  function handleInputValue(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target

    setInputsValues((prevState) => ({
      ...prevState,
      [name]: `${name === 'deadline' ? getFormattedDate(value) : value}`,
    }))
  }

  // обработать сабмит формы
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    handleSubmit(e, inputsValues)
  }

  return (
    <form onSubmit={handleFormSubmit}>
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
          defaultValue={valuesForInputs?.deadline}
          onChange={handleInputValue}
        />
      </Label>

      <ButtonSubmit disabled={isDisabledSubmit}>{nameButtonSubmit}</ButtonSubmit>
    </form>
  )
}

export default FormTask
