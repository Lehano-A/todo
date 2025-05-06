import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { DONE_COLUMN_NAME, INPROCESS_COLUMN_NAME, TODO_COLUMN_NAME } from '../../../constants'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { ReactComponent as AddIcon } from '../../../images/icons/add.svg'
import { initialTasksThunk } from '../../../redux/actions/tasksActions'
import { openDialog } from '../../../redux/reducers/slices/dialogsSlice'
import { disableDrop, enableDrop } from '../../../redux/reducers/slices/dndSlice'
import { transferTask } from '../../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../../redux/store'
import Column from '../../../styled/column'
import Task from '../Task/Task'
import { TaskType, TasksType } from '../Task/task.type'
import { Columns, StyledColumnProps } from './columns.type'

const BoxForStickyAddButton = styled('div')`
  position: relative;
  display: flex;
  background-color: transparent;
`

const StyledColumn = styled(Column)<StyledColumnProps>`
  background-color: ${({ theme, $bgColor }) => theme.palette.taskColumns[$bgColor]};
  position: relative;
`

const TitleColumn = styled('h2')`
  position: absolute;
  top: -10px;
  font-size: 1.8rem;
  margin-bottom: 40px;
`

const StyledAddIcon = styled(AddIcon)`
  width: 100%;
  height: 100%;
`

const ButtonAddTask = styled('button')`
  position: sticky;
  top: 50px;
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-color: white;
  border-radius: 50%;
  margin: 90px 10px 0 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};

    & svg {
      fill: white;
    }
  }
`

const columns: Columns[] = [
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

  // активировать форму добавления новой задачи
  function openDialogAddNewTask() {
    dispatch(openDialog({ dialogName: 'dialogAddNewTask' }))
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
            {(provided) => (
              <BoxForStickyAddButton>
                {columnName === TODO_COLUMN_NAME && (
                  <ButtonAddTask onClick={openDialogAddNewTask}>
                    <StyledAddIcon></StyledAddIcon>
                  </ButtonAddTask>
                )}

                <StyledColumn
                  $bgColor={columnName}
                  className={columnName}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <TitleColumn>{title}</TitleColumn>

                  {allTasks[columnName].map((task: TaskType, index) => {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Task
                            currentColumnLocation={columnName}
                            data={task}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    )
                  })}

                  {provided.placeholder}
                </StyledColumn>
              </BoxForStickyAddButton>
            )}
          </Droppable>
        )
      })}
    </DragDropContext>
  )
}

export default TaskColumns
