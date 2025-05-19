import { Draggable } from '@hello-pangea/dnd'
import React from 'react'
import styled from 'styled-components'

import { visibleTaskControlsStyle } from '../../../../styled/css/visibleTaskControlsStyle'
import Controls from '../../Task/Controls/Controls'
import Task from '../../Task/Task'
import { TaskType } from '../../Task/task.types'
import { TaskColumnName } from '../taskColumns.types'

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
interface TaskItemProps {
  data: TaskType
  isDraggingOver: boolean
  ordinalNumber: number
  currentColumnLocation: TaskColumnName
}

function TaskItem({ data, isDraggingOver, ordinalNumber, currentColumnLocation }: TaskItemProps) {
  return (
    <Item $isDraggingOver={isDraggingOver}>
      <Draggable
        draggableId={data.id}
        index={ordinalNumber}
      >
        {(provided) => (
          <Task
            index={data.id}
            provided={provided}
            data={data}
            ordinalNumber={ordinalNumber + 1}
            currentColumnLocation={currentColumnLocation}
          />
        )}
      </Draggable>
      <Controls
        data={data}
        currentColumnLocation={currentColumnLocation}
      />
    </Item>
  )
}

export default TaskItem
