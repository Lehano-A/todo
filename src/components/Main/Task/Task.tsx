import { pluralize } from 'numeralize-ru'
import React, { TransitionEvent, useEffect, useMemo, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { simpleFocusOutlineStyle } from '../../../styled/css/highlighting'
import { visibleTaskControlsStyle } from '../../../styled/css/visibleTaskControlsStyle'
import increment from '../../../utils/increment'
import TaskBody from './TaskBody/TaskBody'
import { StyleParamsParentType, StyleTaskElements, StyledTaskProps, TaskProps } from './task.types'
import { calculateRestOfDaysBeforeDeadline } from './utils/calculateRestOfDaysBeforeDeadline'
import { getColorsTaskElements } from './utils/getColorsTaskElements'

const CommonWrapper = styled('div')<{ $hasDeadline: boolean }>`
  position: relative;
  padding-top: ${({ $hasDeadline }) => ($hasDeadline ? '25px' : 0)};
  margin: 8px 0;

  &:focus-visible {
    ${simpleFocusOutlineStyle}
  }

  &:focus-within {
    ${visibleTaskControlsStyle}
  }
`

const StyledTask = styled('div')<StyledTaskProps>`
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px 20px 50px 20px;
  border-radius: ${({ $hasDeadline }) => ($hasDeadline ? 0 : '12px')} 12px 12px 12px;
  transition: height 0.6s ease;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.1);
  word-break: break-word;
  height: ${({ $wasClickedButtonDescription, $styleParamsParent }) =>
    $wasClickedButtonDescription && $styleParamsParent?.withDescription.height
      ? $styleParamsParent?.withDescription.height
      : $styleParamsParent?.default.height};

  background-color: ${({ $styleTaskElements }) => $styleTaskElements.bg};

  &:hover,
  &:focus {
    ${visibleTaskControlsStyle}
  }
`

const DeadlineBox = styled('div')`
  position: absolute;
  top: 1px; /* 1px, а не 0 - т.к. при открытии TextDescription, начинает мерцать нижняя граница во время анимации */
  display: flex;
  gap: 3px;
`

const TextDeadline = styled('time')<{ $styleTaskElements: StyleTaskElements }>`
  padding: 5px;
  background: ${({ $styleTaskElements }) => $styleTaskElements.deadline.bg};
  color: #fff;
  font-size: 1.3rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const RestOfDays = styled('time')`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.error.dark};
`

function Task({ data, currentColumnLocation, provided }: TaskProps) {
  const theme = useTheme()

  const refTask = useRef<HTMLDivElement>(null)
  const refTextDescription = useRef<HTMLParagraphElement>(null)

  const [wasClickedButtonDescription, setWasClickedButtonDescription] = useState(false) // сам факт нажатия кнопки
  const [isActiveDescription, setIsActiveDescription] = useState(false) // активно - при нажатии кнопки, неактивно - при завершении transition
  const [isDisabledButtonShowDescription, setIsDisabledButtonShowDescription] = useState(false)
  const [styleParamsParent, setStyleParamsParent] = useState<StyleParamsParentType>({
    default: { height: null }, // параметры без description
    withDescription: { height: null }, // параметры с description
  })

  const restOfDays = useMemo(() => calculateRestOfDaysBeforeDeadline(data.deadline), [data.deadline])

  // остаток дней до дедлайна
  const restOfDaysBeforeDeadline = useMemo(() => {
    const caseText = pluralize(Number(restOfDays), 'день', 'дня', 'дней')

    return `${restOfDays} ${caseText}`
  }, [restOfDays])

  const styleTaskElements = useMemo(() => getColorsTaskElements(theme, restOfDays), [restOfDays])

  useEffect(() => {
    // расчёт высоты параграфа
    if (refTask.current && refTextDescription.current) {
      if (wasClickedButtonDescription && styleParamsParent.withDescription.height === null) {
        const clientHeightTask = refTask.current.clientHeight
        const clientHeightText = refTextDescription.current.clientHeight
        const values = [clientHeightTask, clientHeightText] // значения для высоты параграфа

        if (values.every((value): value is number => typeof value === 'number')) {
          const calculatedHeight = increment(values)

          setStyleParamsParent((prevState) => ({
            ...prevState,
            withDescription: { height: `${calculatedHeight}px` },
          }))
        }
      }

      if (styleParamsParent.default.height === null) {
        const height = `${String(refTask.current.offsetHeight)}px`

        setStyleParamsParent((prevState) => ({ ...prevState, default: { height } }))
      }
    }
  }, [wasClickedButtonDescription])

  // показать описание задачи
  function handleShowDescription() {
    setWasClickedButtonDescription((prevState) => !prevState)
    setIsDisabledButtonShowDescription(true)

    if (!isActiveDescription) {
      setIsActiveDescription(true)
    }
  }

  // обработать окончание перехода (завершения открытия/закрытия описания задачи)
  function handleTransitionEnd(e: TransitionEvent) {
    if (e.propertyName === 'height') {
      if (!wasClickedButtonDescription) {
        setIsActiveDescription(false)
      }

      setIsDisabledButtonShowDescription(false)
    }
  }

  return (
    <CommonWrapper
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}
      $hasDeadline={Boolean(data.deadline)}
    >
      {data.deadline && (
        <DeadlineBox>
          <TextDeadline $styleTaskElements={styleTaskElements}>
            {restOfDays && restOfDays > 0 ? `выполнить до ${data.deadline}` : 'просрочено'}
          </TextDeadline>
          <RestOfDays>{restOfDaysBeforeDeadline}</RestOfDays>
        </DeadlineBox>
      )}

      <StyledTask
        $hasDeadline={Boolean(data.deadline)}
        $styleParamsParent={styleParamsParent}
        $wasClickedButtonDescription={wasClickedButtonDescription}
        $styleTaskElements={styleTaskElements}
        onTransitionEnd={handleTransitionEnd}
        ref={refTask}
      >
        <TaskBody
          data={data}
          refTextDescription={refTextDescription}
          isActiveDescription={isActiveDescription}
          isDisabledButtonShowDescription={isDisabledButtonShowDescription}
          wasClickedButtonDescription={wasClickedButtonDescription}
          handleShowDescription={handleShowDescription}
          currentColumnLocation={currentColumnLocation}
          styleTaskElements={styleTaskElements}
        />
      </StyledTask>
    </CommonWrapper>
  )
}

export default Task
