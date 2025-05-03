import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { DONE_COLUMN_NAME, INPROCESS_COLUMN_NAME, TODO_COLUMN_NAME } from '../../../constants'
import { ReactComponent as AddIcon } from '../../../images/icons/add.svg'
import { disableDrop, enableDrop } from '../../../redux/reducers/slices/dndSlice'
import { activateForm } from '../../../redux/reducers/slices/formNewTaskSlice'
import { getTasksFromLS, updateAfterDrag } from '../../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../../redux/store'
import Column from '../../../styled/column'
import Task from '../Task/Task'
import { TasksType } from '../Task/task.type'
import { Columns, StyledColumnProps } from './columns.type'

const Box = styled('div')`
  position: relative;
  display: flex;
  background-color: transparent;
`

const StyledColumn = styled(Column)<StyledColumnProps>`
  background-color: ${({ theme, $bgColor }) => theme.palette.taskColumns[$bgColor]};
  position: relative;
`

const TitleColumn = styled('h2')`
  // margin-top: -20px;
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

const TextNoTasks = styled('p')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const columns: Columns[] = [
  { columnName: TODO_COLUMN_NAME, title: 'Сделать' },
  { columnName: INPROCESS_COLUMN_NAME, title: 'В процессе' },
  { columnName: DONE_COLUMN_NAME, title: 'Завершены' },
]

function TaskColumns() {
  const dispatch = useDispatch()

  const allTasks = useSelector((state: RootState) => state.tasks)
  const wasDrop = useSelector((state: RootState) => state.dnd.wasDrop)

  useEffect(() => {
    if (wasDrop) {
      dispatch(disableDrop())
    }

    dispatch(getTasksFromLS())
  }, [wasDrop])

  // обработать drop (DnD) перемещения задачи
  function handleOnDragEnd(result: DropResult) {
    const { source, destination } = result
    const columnFrom = source.droppableId
    const columnWhere = destination?.droppableId

    if (destination) {
      const idPlaceFrom = source.index
      const idPlaceWhere = destination.index
      const elFrom = allTasks[columnFrom as keyof TasksType][idPlaceFrom]

      const copyTasks = JSON.parse(JSON.stringify(allTasks))
      copyTasks[columnFrom as keyof TasksType].splice(idPlaceFrom, 1) // удаляем переносимый элемент
      copyTasks[columnWhere as keyof TasksType].splice(idPlaceWhere, 0, elFrom) // вставляем переносимый элемент в выбранное место

      dispatch(updateAfterDrag({ tasks: copyTasks }))
      dispatch(enableDrop())
    }
  }

  // активировать форму добавления новой задачи
  function activateFormAddNewTask() {
    dispatch(activateForm())
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
              <Box
                className={columnName}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnName === TODO_COLUMN_NAME && (
                  <ButtonAddTask onClick={activateFormAddNewTask}>
                    <StyledAddIcon></StyledAddIcon>
                  </ButtonAddTask>
                )}

                <StyledColumn $bgColor={columnName}>
                  <TitleColumn>{title}</TitleColumn>

                  {allTasks[columnName].length > 0 ? (
                    allTasks[columnName].map((task, index) => (
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
                    ))
                  ) : (
                    <TextNoTasks>Тут пока пусто</TextNoTasks>
                  )}

                  {provided.placeholder}
                </StyledColumn>
              </Box>
            )}
          </Droppable>
        )
      })}
    </DragDropContext>
  )
}

export default TaskColumns
