import React, { TransitionEvent, useMemo, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { useCalcHeightTask } from '../../../hooks/useCalcHeightTask'
import { simpleFocusOutlineStyle } from '../../../styled/css/highlighting'
import { visibleTaskControlsStyle } from '../../../styled/css/visibleTaskControlsStyle'
import Deadline from './Deadline/Deadline'
import TaskBody from './TaskBody/TaskBody'
import { InnerBoxTaskBodyProps, StyleParamsTaskType, TaskElementsRefs, TaskProps } from './task.types'
import { calcRestOfDaysBeforeDeadline } from './utils/calcRestOfDaysBeforeDeadline'
import { getColorsTaskElements } from './utils/getColorsTaskElements'

const CommonWrapper = styled('div')<{ $hasDeadline: boolean; $isTaskDone: InnerBoxTaskBodyProps['$isTaskDone'] }>`
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

const InnerBoxTaskBody = styled('div')<InnerBoxTaskBodyProps>`
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

  height: ${({ $wasClickedButtonDescription, $styleParamsTask }) =>
    $wasClickedButtonDescription && $styleParamsTask?.opened.task.height
      ? `${$styleParamsTask?.opened.task.height}px`
      : `${$styleParamsTask?.closed.task.height}px`};

  &:hover,
  &:focus {
    ${visibleTaskControlsStyle}
  }
`

const OuterBoxTaskBody = styled('div')`
  position: relative;
`

const OrdinalNumber = styled('span')`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -18px;
  color: ${({ theme }) => theme.palette.grey[400]};
`

function Task({ data, ordinalNumber, currentColumnLocation, provided }: TaskProps) {
  const theme = useTheme()

  const [wasClickedButtonDescription, setWasClickedButtonDescription] = useState(false) // сам факт нажатия кнопки
  const [isActiveDescription, setIsActiveDescription] = useState(false) // активно - при нажатии кнопки, неактивно - при завершении transition
  const [isDisabledButtonShowDescription, setIsDisabledButtonShowDescription] = useState(false)

  const [styleParamsTask, setStyleParamsTask] = useState<StyleParamsTaskType>({
    closed: {
      task: { heightWithoutValues: null, height: null },
    }, // description в закрытом виде
    opened: {
      task: { heightWithoutValues: null, height: null },
    }, // с открытым description
  })

  const refs: TaskElementsRefs = {
    refTask: useRef<HTMLDivElement>(null),
    refTitle: useRef<HTMLHeadingElement>(null),
    refTextDescription: useRef<HTMLParagraphElement>(null),
  }

  const isTaskDone = currentColumnLocation === 'done' // находится ли задача в колонке 'done'

  const restOfDays = useMemo(() => calcRestOfDaysBeforeDeadline(data.deadline), [data.deadline])

  const styleTaskElements = useMemo(() => getColorsTaskElements(theme, restOfDays, isTaskDone), [restOfDays])

  // высчитываем высоту задачи
  useCalcHeightTask({
    data,
    refs,
    styleParamsTask,
    setStyleParamsTask,
    wasClickedButtonDescription,
  })

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

      <OuterBoxTaskBody>
        <OrdinalNumber>{ordinalNumber}</OrdinalNumber>

        <InnerBoxTaskBody
          ref={refs.refTask}
          $isTaskDone={isTaskDone}
          $hasDeadline={Boolean(data.deadline)}
          $styleParamsTask={styleParamsTask}
          $wasClickedButtonDescription={wasClickedButtonDescription}
          $styleTaskElements={styleTaskElements}
          onTransitionEnd={handleTransitionEnd}
        >
          <TaskBody
            data={data}
            refs={refs}
            isActiveDescription={isActiveDescription}
            isDisabledButtonShowDescription={isDisabledButtonShowDescription}
            wasClickedButtonDescription={wasClickedButtonDescription}
            handleShowDescription={handleShowDescription}
            currentColumnLocation={currentColumnLocation}
            styleTaskElements={styleTaskElements}
          />
        </InnerBoxTaskBody>
      </OuterBoxTaskBody>
    </CommonWrapper>
  )
}

export default Task
