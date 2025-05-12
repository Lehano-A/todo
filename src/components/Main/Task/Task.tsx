import React, { TransitionEvent, useEffect, useMemo, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { simpleFocusOutlineStyle } from '../../../styled/css/highlighting'
import { visibleTaskControlsStyle } from '../../../styled/css/visibleTaskControlsStyle'
import Deadline from './Deadline/Deadline'
import TaskBody from './TaskBody/TaskBody'
import { StyleParamsParentType, StyledTaskProps, TaskProps } from './task.types'
import { calculateDescriptionHeight } from './utils/calculateDescriptionHeight'
import { calculateRestOfDaysBeforeDeadline } from './utils/calculateRestOfDaysBeforeDeadline'
import { getColorsTaskElements } from './utils/getColorsTaskElements'

const CommonWrapper = styled('div')<{ $hasDeadline: boolean; $isTaskDone: StyledTaskProps['$isTaskDone'] }>`
  position: relative;
  margin: 8px 0;
  padding-top: ${({ $isTaskDone, $hasDeadline }) => ($isTaskDone || $hasDeadline ? '25px' : 0)};

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
  transition: height 0.6s ease;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.1);
  word-break: break-word;
  background-color: ${({ $styleTaskElements }) => $styleTaskElements.bg};
  border-radius: ${({ $isTaskDone, $hasDeadline }) => ($isTaskDone || $hasDeadline ? 0 : '12px')} 12px 12px 12px;
  height: ${({ $wasClickedButtonDescription, $styleParamsParent }) =>
    $wasClickedButtonDescription && $styleParamsParent?.withOpenedDescription.height
      ? `${$styleParamsParent?.withOpenedDescription.height}px`
      : `${$styleParamsParent?.initial.height}px`};

  &:hover,
  &:focus {
    ${visibleTaskControlsStyle}
  }
`

function Task({ data, currentColumnLocation, provided }: TaskProps) {
  const theme = useTheme()

  const refTask = useRef<HTMLDivElement>(null)
  const refTextDescription = useRef<HTMLParagraphElement>(null)

  const isTaskDone = currentColumnLocation === 'done' // находится ли задача в колонке 'done'

  const [wasClickedButtonDescription, setWasClickedButtonDescription] = useState(false) // сам факт нажатия кнопки
  const [isActiveDescription, setIsActiveDescription] = useState(false) // активно - при нажатии кнопки, неактивно - при завершении transition
  const [isDisabledButtonShowDescription, setIsDisabledButtonShowDescription] = useState(false)
  const [styleParamsParent, setStyleParamsParent] = useState<StyleParamsParentType>({
    initial: { height: null }, // начальная высота задачи (в закрытом виде)
    withOpenedDescription: { height: null }, // параметры с description
  })

  const restOfDays = useMemo(() => calculateRestOfDaysBeforeDeadline(data.deadline), [data.deadline])

  const styleTaskElements = useMemo(() => getColorsTaskElements(theme, restOfDays), [restOfDays])

  useEffect(() => {
    // расчёт высоты параграфа Description
    if (refTask.current && refTextDescription.current) {
      calculateDescriptionHeight(styleParamsParent, setStyleParamsParent, refTask, refTextDescription)
    }
  }, [wasClickedButtonDescription, data.nameTask, data.description])

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
      $isTaskDone={isTaskDone}
    >
      {(data.deadline || isTaskDone) && (
        <Deadline
          data={data}
          restOfDays={restOfDays}
          isTaskDone={isTaskDone}
          currentColumnLocation={currentColumnLocation}
          styleTaskElements={styleTaskElements}
        />
      )}

      <StyledTask
        $isTaskDone={isTaskDone}
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
