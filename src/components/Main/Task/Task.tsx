import { DraggableProvided } from '@hello-pangea/dnd'
import React, { TransitionEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { simpleFocusOutlineStyle } from '../../../styled/css/highlighting'
import { visibleTaskControlsStyle } from '../../../styled/css/visibleTaskControlsStyle'
import increment from '../../../utils/increment'
import { ColumnName } from '../Columns/columns.type'
import TaskBody from './TaskBody/TaskBody'
import { StyledTaskProps, TaskType } from './task.type'

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

  &:hover,
  &:focus {
    ${visibleTaskControlsStyle}
  }
`

const TextDeadline = styled('time')`
  position: absolute;
  padding: 5px;
  top: 0px;
  background: ${({ theme }) => theme.palette.error.dark};
  color: #fff;
  font-size: 1.3rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

export interface TaskProps {
  data: TaskType
  currentColumnLocation: ColumnName
  provided?: DraggableProvided
}

export interface StyleParamsParentType {
  default: {
    height: string | null
  }
  withDescription: {
    height: string | null
  }
}

function Task({ data, currentColumnLocation, provided }: TaskProps) {
  const refTask = useRef<HTMLDivElement>(null)
  const refTextDescription = useRef<HTMLParagraphElement>(null)

  const [wasClickedButtonDescription, setWasClickedButtonDescription] = useState(false) // сам факт нажатия кнопки
  const [isActiveDescription, setIsActiveDescription] = useState(false) // активно - при нажатии кнопки, неактивно - при завершении transition
  const [isDisabledButtonShowDescription, setIsDisabledButtonShowDescription] = useState(false)
  const [styleParamsParent, setStyleParamsParent] = useState<StyleParamsParentType>({
    default: { height: null }, // параметры без description
    withDescription: { height: null }, // параметры с description
  })

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
      {data.deadline && <TextDeadline>выполнить до {data.deadline}</TextDeadline>}

      <StyledTask
        $hasDeadline={Boolean(data.deadline)}
        $styleParamsParent={styleParamsParent}
        $wasClickedButtonDescription={wasClickedButtonDescription}
        onTransitionEnd={handleTransitionEnd}
        ref={refTask}
      >
        <TaskBody
          data={data}
          styleParamsParent={styleParamsParent}
          refTextDescription={refTextDescription}
          isActiveDescription={isActiveDescription}
          isDisabledButtonShowDescription={isDisabledButtonShowDescription}
          wasClickedButtonDescription={wasClickedButtonDescription}
          handleShowDescription={handleShowDescription}
          currentColumnLocation={currentColumnLocation}
        />
      </StyledTask>
    </CommonWrapper>
  )
}

export default Task
