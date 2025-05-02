import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { TODO_COLUMN_NAME } from '../../../../constants'
import { ReactComponent as AddIcon } from '../../../../images/icons/add.svg'
import { activateForm } from '../../../../redux/reducers/slices/formNewTaskSlice'
import { getTasksFromLS } from '../../../../redux/reducers/slices/tasksSlice'
import { RootState } from '../../../../redux/store'
import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const Box = styled('div')`
  position: relative;
  display: flex;
  background-color: transparent;
`

const StyledTodo = styled(Column)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
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

function Todo({ refFormAddTask }: any) {
  const dispatch = useDispatch()

  const todoTasks = useSelector((state: RootState) => state.tasks.todo)
  const isActiveFormAddTask = useSelector((state: RootState) => state.formNewTask.isActive)

  useEffect(() => {
    dispatch(getTasksFromLS('todo'))
  }, [])

  useEffect(() => {
    if (isActiveFormAddTask && refFormAddTask.current) {
      refFormAddTask.current.showModal()
    }
  }, [isActiveFormAddTask])

  // активировать форму добавления новой задачи
  function activateFormAddNewTask() {
    dispatch(activateForm())
  }

  return (
    <Droppable droppableId='todo'>
      {(provided) => (
        <Box
          className='todo'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <ButtonAddTask onClick={activateFormAddNewTask}>
            <StyledAddIcon></StyledAddIcon>
          </ButtonAddTask>

          <StyledTodo>
            <TitleColumn>Сделать</TitleColumn>

            {todoTasks.length > 0 ? (
              todoTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id}
                  index={index}
                >
                  {(provided) => (
                    <Task
                      currentColumnLocation={TODO_COLUMN_NAME}
                      data={task}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))
            ) : (
              <TextNoTasks>Пока нет задач</TextNoTasks>
            )}
            {provided.placeholder}
          </StyledTodo>
        </Box>
      )}
    </Droppable>
  )
}

export default Todo
