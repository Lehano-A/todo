import React from 'react'
import styled from 'styled-components'

import { TODO_TASKS } from '../../../constants'
import { ReactComponent as IconDelete } from '../../../images/icons/delete.svg'
import useActionsWithTasks from '../../hooks/useActionsWithTasks'
import { TaskType } from './task.type'

const StyledTask = styled('div')`
  position: relative;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;

  &:hover {
    & #buttonDeleteTask {
      visibility: visible;
      opacity: 1;
    }
  }
`

const StyledIconDelete = styled(IconDelete)`
  position: absolute;
  top: 5px;
  right: 5px;
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
`

interface TaskProps {
  data: TaskType
}

function Task({ data }: TaskProps) {
  const { id } = data
  const { removeTask } = useActionsWithTasks()

  function handleRemoveTask() {
    removeTask(TODO_TASKS, id)
  }

  return (
    <StyledTask>
      <Title>{data.nameTask}</Title>

      <ButtonDelete
        id='buttonDeleteTask'
        onClick={handleRemoveTask}
      >
        <StyledIconDelete />
      </ButtonDelete>
    </StyledTask>
  )
}

export default Task
