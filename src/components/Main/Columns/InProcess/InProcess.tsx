import { Draggable, Droppable } from '@hello-pangea/dnd'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { INPROCESS_COLUMN_NAME } from '../../../../constants'
import { RootState } from '../../../../redux/store'
import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const StyledInProcess = styled(Column)`
  background-color: ${({ theme }) => theme.palette.taskColumns.inProcess};
`

const TitleColumn = styled('h2')`
  margin-bottom: 40px;
`

function InProcess() {
  const inProcessTasks = useSelector((state: RootState) => state.tasks.inProcess)

  return (
    <Droppable droppableId='inProcess'>
      {(provided) => (
        <StyledInProcess
          className='inProcess'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <TitleColumn>В процессе</TitleColumn>

          {inProcessTasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id}
              index={index}
            >
              {(provided) => (
                <Task
                  currentColumnLocation={INPROCESS_COLUMN_NAME}
                  data={task}
                  provided={provided}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </StyledInProcess>
      )}
    </Droppable>
  )
}

export default InProcess
