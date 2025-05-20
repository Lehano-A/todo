import { Draggable } from '@hello-pangea/dnd'
import React, { useContext } from 'react'
import styled from 'styled-components'

import { TaskItemContext } from '../../../../contexts/TaskItemContext'
import { visibleTaskControlsStyle } from '../../../../styled/css/visibleTaskControlsStyle'
import Controls from './Task/Controls/Controls'
import Task from './Task/Task'

const Item = styled('div')<{ $isDraggingOver: boolean }>`
  display: flex;
  width: 100%;
  position: relative;
  padding: 0 30px;

  &:hover,
  &:focus-visible,
  &:focus-within {
    ${({ $isDraggingOver }) => !$isDraggingOver && visibleTaskControlsStyle}
  }
`

function TaskItem() {
  const { dataTask, indexCurrentTask, isDraggingOver } = useContext(TaskItemContext)

  return (
    <Item $isDraggingOver={isDraggingOver}>
      <Draggable
        draggableId={dataTask.id}
        index={indexCurrentTask}
      >
        {(provided) => <Task provided={provided} />}
      </Draggable>

      <Controls />
    </Item>
  )
}

export default TaskItem
