import { pluralize } from 'numeralize-ru'
import React, { TransitionEvent, useEffect, useMemo, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'

import { simpleFocusOutlineStyle } from '../../../styled/css/highlighting'
import { visibleTaskControlsStyle } from '../../../styled/css/visibleTaskControlsStyle'
import increment from '../../../utils/increment'
import TaskBody from './TaskBody/TaskBody'
import { DeadlineProps, StyleParamsParentType, StyledTaskProps, TaskProps } from './task.types'
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
    $wasClickedButtonDescription && $styleParamsParent?.withDescription.height
      ? $styleParamsParent?.withDescription.height
      : $styleParamsParent?.default.height};

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

const Deadline = styled('time')<DeadlineProps>`
  padding: 5px;
  color: #fff;
  font-size: 1.3rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: ${({ $styleTaskElements, $isTaskDone, $isExpired }) => {
    if ($isExpired) {
      return $styleTaskElements.deadline.bg.main
    }

    if ($isTaskDone) {
      return $styleTaskElements.deadline.bg.done
    }

    return $styleTaskElements.deadline.bg.main
  }};
`

const RestOfDays = styled('time')`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.error.dark};
`

function Task({ data, currentColumnLocation, provided }: TaskProps) {
  const theme = useTheme()

  const refTask = useRef<HTMLDivElement>(null)
  const refTextDescription = useRef<HTMLParagraphElement>(null)

  const isTaskDone = currentColumnLocation === 'done'

  const [wasClickedButtonDescription, setWasClickedButtonDescription] = useState(false) // сам факт нажатия кнопки
  const [isActiveDescription, setIsActiveDescription] = useState(false) // активно - при нажатии кнопки, неактивно - при завершении transition
  const [isDisabledButtonShowDescription, setIsDisabledButtonShowDescription] = useState(false)
  const [styleParamsParent, setStyleParamsParent] = useState<StyleParamsParentType>({
    default: { height: null }, // параметры без description
    withDescription: { height: null }, // параметры с description
  })

  const restOfDays = useMemo(() => calculateRestOfDaysBeforeDeadline(data.deadline), [data.deadline])
  const isExpired = Boolean(restOfDays && restOfDays <= 0)

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

  const textDeadline = useMemo(() => {
    // если непросрочено и задача находится не в колонке 'Done'
    if (!isExpired && !isTaskDone) {
      return `выполнить до ${data.deadline}`
    }

    // если просрочено
    if (isExpired) {
      return 'просрочено'
    }

    // если в колонке 'Done'
    if (isTaskDone) {
      return `выполнено`
    }
  }, [currentColumnLocation, data.deadline])

  return (
    <CommonWrapper
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}
      $hasDeadline={Boolean(data.deadline)}
      $isTaskDone={isTaskDone}
    >
      {(data.deadline || isTaskDone) && (
        <DeadlineBox>
          <Deadline
            $styleTaskElements={styleTaskElements}
            $isTaskDone={isTaskDone}
            $isExpired={isExpired}
          >
            {textDeadline}
          </Deadline>

          {!isTaskDone && <RestOfDays>{restOfDaysBeforeDeadline}</RestOfDays>}
        </DeadlineBox>
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
