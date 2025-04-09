import React, { TransitionEvent, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { TODO_TASKS } from '../../../constants'
import { ReactComponent as IconArrowDown } from '../../../images/icons/arrow-down.svg'
import { ReactComponent as IconDelete } from '../../../images/icons/delete.svg'
import increment from '../../../utils/increment'
import useActionsWithTasks from '../../hooks/useActionsWithTasks'
import { translateBackward, translateForward } from './animation/translate'
import { StyledTaskProps } from './styledTask.type'
import { TaskType } from './task.type'

const StyledTask = styled('div')<StyledTaskProps>`
  position: relative;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  transition: height 0.6s ease;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.1);
  height: ${({ $wasClickedButtonDescription, $styleParamsParent }) =>
    $wasClickedButtonDescription && $styleParamsParent?.height ? $styleParamsParent?.height : '80px'};
  word-break: break-word;

  &:hover {
    & #buttonDeleteTask {
      visibility: visible;
      opacity: 1;
    }
  }
`

const StyledIconDelete = styled(IconDelete)``

const StyledIconArrowDown = styled(IconArrowDown)`
  transform: ${({ $wasClickedButtonDescription }) => $wasClickedButtonDescription && 'rotate(180deg)'};
  transition: transform 0.3s ease;
`

const Title = styled('h2')`
  font-size: 1rem;
`

const ButtonDelete = styled('button')`
  width: 20px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  position: absolute;
  top: 5px;
  right: 5px;
`

const ButtonShowDescription = styled('button')`
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  width: 50px;
  height: 30px;
`

const TextDescription = styled('p')<StyledTaskProps>`
  width: 100%;
  margin: 20px 0 0;
  visibility: ${({ $wasClickedButtonDescription, $isActiveDescription }) =>
    $wasClickedButtonDescription ? 'visible' : !$isActiveDescription && 'hidden'};
  animation: ${({ $wasClickedButtonDescription }) =>
    css`
      ${$wasClickedButtonDescription ? translateForward : translateBackward} 1s ease forwards
    `};
`

interface TaskProps {
  data: TaskType
}

function Task({ data }: TaskProps) {
  const { id } = data
  const { removeTask } = useActionsWithTasks()

  const refTask = useRef<HTMLDivElement>(null)
  const refTextDescription = useRef<HTMLParagraphElement>(null)

  const [wasClickedButtonDescription, setWasClickedButtonDescription] = useState(false) // сам факт нажатия кнопки
  const [isActiveDescription, setIsActiveDescription] = useState(false) // активно - при нажатии кнопки, неактивно - при завершении transition
  const [isDisabledButtonShowDescription, setIsDisabledButtonShowDescription] = useState(false)
  const [styleParamsParent, setStyleParamsParent] = useState<{ height: string | null }>({ height: null })

  useEffect(() => {
    // расчёт высоты параграфа
    if (refTask.current && refTextDescription.current) {
      const clientHeightTask = refTask.current.clientHeight
      const clientHeightText = refTextDescription.current.clientHeight

      const values = [clientHeightTask, clientHeightText] // значения для высоты параграфа

      if (values.every((value): value is number => typeof value === 'number')) {
        const calculatedHeight = increment(values)

        setStyleParamsParent((prevState) => ({
          ...prevState,
          height: `${calculatedHeight}px`,
        }))
      }
    }
  }, [])

  function handleRemoveTask() {
    removeTask(TODO_TASKS, id)
  }

  function handleShowDescription() {
    setWasClickedButtonDescription((prevState) => !prevState)
    setIsDisabledButtonShowDescription(true)

    if (!isActiveDescription) {
      setIsActiveDescription(true)
    }
  }

  function handleTransitionEnd(e: TransitionEvent) {
    if (e.propertyName === 'height') {
      if (!wasClickedButtonDescription) {
        setIsActiveDescription(false)
      }

      setIsDisabledButtonShowDescription(false)
    }
  }

  return (
    <StyledTask
      $styleParamsParent={styleParamsParent}
      $wasClickedButtonDescription={wasClickedButtonDescription}
      onTransitionEnd={handleTransitionEnd}
      ref={refTask}
    >
      <Title>{data.nameTask}</Title>

      <ButtonDelete
        id='buttonDeleteTask'
        onClick={handleRemoveTask}
      >
        <StyledIconDelete />
      </ButtonDelete>

      {data.description && (
        <ButtonShowDescription
          disabled={isDisabledButtonShowDescription}
          onClick={handleShowDescription}
        >
          <StyledIconArrowDown $wasClickedButtonDescription={wasClickedButtonDescription} />
        </ButtonShowDescription>
      )}

      <TextDescription
        $isActiveDescription={isActiveDescription}
        $styleParamsParent={styleParamsParent}
        $wasClickedButtonDescription={wasClickedButtonDescription}
        ref={refTextDescription}
      >
        {data.description}
      </TextDescription>
    </StyledTask>
  )
}

export default Task
