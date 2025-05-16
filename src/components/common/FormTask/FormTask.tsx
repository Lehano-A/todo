import { DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as IconCalendar } from '../../../images/icons/calendar.svg'
import { ReactComponent as IconClear } from '../../../images/icons/clear.svg'
import { TaskType } from '../../Main/Task/task.types'

const Title = styled('h2')`
  font-size: 1.6rem;
  margin-bottom: 25px;
`

const StyledIconCalendar = styled(IconCalendar)`
  width: 22px;
  height: 22px;
  fill: ${({ theme }) => theme.palette.grey[250]};
`

const StyledIconClear = styled(IconClear)`
  width: 22px;
  height: 22px;
  fill: ${({ theme }) => theme.palette.grey[250]};
`

const BoxLabelInput = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 20px;
`

const Label = styled('label')`
  margin-bottom: 3px;
`

const NameTask = styled('input')`
  &:focus {
    ${({ theme }) => theme.palette.focus.input};
  }
`

const Date = styled(DatePicker)`
  transition: none;

  &:focus-within, &:active {
    ${({ theme }) => theme.palette.focus.input}};
  }
`

const Description = styled('textarea')`
  min-width: 100%;
  max-width: 100%;
  min-height: 60px;
  max-height: 600px;
  margin-bottom: -4px;

  &:focus {
    ${({ theme }) => theme.palette.focus.input};
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
  title?: string
}

function FormTask({ handleSubmit, valuesForInputs, title, nameButtonSubmit = 'Создать' }: FormTaskProps) {
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

    if (inputsValues.nameTask === '' || current === preset || current === defaults) {
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
      [name]: value,
    }))
  }

  // обработать выбор даты
  function handleDatePick(date: unknown, dateString: string | string[]) {
    if (!Array.isArray(dateString)) {
      setInputsValues((prevState) => ({
        ...prevState,
        deadline: dateString,
      }))
    }
  }

  // скрыть даты перед сегодняшним днём
  function disableDateBeforeToday(current: Dayjs): boolean {
    return current && current < dayjs().endOf('day')
  }

  // обработать сабмит формы
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    handleSubmit(e, inputsValues)
  }

  return (
    <>
      {title && <Title>{title}</Title>}

      <form onSubmit={handleFormSubmit}>
        <BoxLabelInput>
          <Label htmlFor='taskNameInput'>Название задачи </Label>
          <NameTask
            id='taskNameInput'
            required
            maxLength={300}
            name='nameTask'
            placeholder='Испечь пирожки...'
            value={inputsValues.nameTask}
            onChange={handleInputValue}
          />
        </BoxLabelInput>

        <BoxLabelInput>
          <Label htmlFor='taskDescriptionTextArea'>Описание</Label>
          <Description
            id='taskDescriptionTextArea'
            rows={9}
            name='description'
            placeholder='3 стакана муки, 1 стакан молока, дрожжи, кубик сливочного масла...'
            value={inputsValues.description}
            onChange={handleInputValue}
          />
        </BoxLabelInput>

        <BoxLabelInput>
          <Label htmlFor='deadlineDatePicker'> Крайняя дата выполнения (включительно) </Label>
          <Date
            id='deadlineDatePicker'
            placeholder='дд.мм.гггг'
            format={{ format: 'DD.MM.YYYY' }}
            disabledDate={disableDateBeforeToday}
            getPopupContainer={() => document.getElementById('dialog') || document.body}
            onChange={handleDatePick}
            value={inputsValues.deadline ? dayjs(inputsValues.deadline, 'DD.MM.YYYY') : inputsValues.deadline}
            allowClear={{ clearIcon: <StyledIconClear /> }}
            suffixIcon={<StyledIconCalendar />}
          />
        </BoxLabelInput>
        <ButtonSubmit disabled={isDisabledSubmit}>{nameButtonSubmit}</ButtonSubmit>
      </form>
    </>
  )
}

export default FormTask
