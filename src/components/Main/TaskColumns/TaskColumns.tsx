import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { DONE_COLUMN_NAME, INPROCESS_COLUMN_NAME, TODO_COLUMN_NAME } from '../../../constants'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { initialTasksThunk } from '../../../redux/actions/tasksActions'
import { disableDrop, enableDrop } from '../../../redux/reducers/slices/dndSlice'
import { transferTask } from '../../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../../redux/store'
import Column from '../../../styled/column'
import { TaskType, TasksType } from '../Task/task.types'
import TaskItem from './TaskItem/TaskItem'
import { StyledTaskColumnProps, TaskColumn } from './taskColumns.types'

const StyledColumn = styled(Column)<StyledTaskColumnProps>`
  background-color: ${({ theme, $bgColor }) => theme.palette.taskColumns[$bgColor]};
  position: relative;
`

const TitleColumn = styled('h2')`
  position: absolute;
  top: -10px;
  font-size: 1.8rem;
  margin-bottom: 40px;
`

const columns: TaskColumn[] = [
  { columnName: TODO_COLUMN_NAME, title: 'Сделать' },
  { columnName: INPROCESS_COLUMN_NAME, title: 'В процессе' },
  { columnName: DONE_COLUMN_NAME, title: 'Завершены' },
]

function TaskColumns() {
  const dispatch = useAppDispatch()

  const allTasks = useSelector((state: RootState) => state.tasks)
  const wasDrop = useSelector((state: RootState) => state.dnd.wasDrop)

  useEffect(() => {
    dispatch(initialTasksThunk())
  }, [])

  useEffect(() => {
    if (wasDrop) {
      dispatch(disableDrop())
    }
  }, [wasDrop])

  // обработать drop (DnD) перемещения задачи
  function handleOnDragEnd(result: DropResult) {
    const { source, destination } = result
    const columnFrom = source.droppableId as keyof TasksType
    const columnWhere = destination?.droppableId as keyof TasksType

    if (destination) {
      const idPlaceFrom = source.index
      const idPlaceWhere = destination.index

      dispatch(transferTask({ columnFrom, columnWhere, idPlaceFrom, idPlaceWhere }))
      dispatch(enableDrop())
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {columns.map((column, id) => {
        const { columnName, title } = column
        return (
          <Droppable
            key={id}
            droppableId={columnName}
          >
            {(provided, snapshot) => (
              <>
                <StyledColumn
                  $bgColor={columnName}
                  className={columnName}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TitleColumn>{title}</TitleColumn>

                  {allTasks[columnName].map((task: TaskType, index: number) => {
                    return (
                      <TaskItem
                        key={task.id}
                        data={task}
                        isDraggingOver={snapshot.isDraggingOver}
                        ordinalNumber={index}
                        currentColumnLocation={columnName}
                      />
                    )
                  })}

                  {provided.placeholder}
                </StyledColumn>
              </>
            )}
          </Droppable>
        )
      })}
    </DragDropContext>
  )
}

export default TaskColumns
