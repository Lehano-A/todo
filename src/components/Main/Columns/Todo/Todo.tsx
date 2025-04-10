import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '../../../../images/icons/add.svg'
import { activateForm } from '../../../../redux/reducers/slices/formAddTaskSlice'
import { getToDoTasksFromLS } from '../../../../redux/reducers/slices/todoTasksSlice'
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

  :where(& > div):not(:last-of-type) {
    margin-bottom: 15px;
  }
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

  const todoTasks = useSelector((state: RootState) => state.todoTasks.tasks)

  useEffect(() => {
    dispatch(getToDoTasksFromLS())
  }, [])

  // показать форму добавления новой задачи
  function showFormAddNewTask() {
    if (refFormAddTask.current) {
      refFormAddTask.current.showModal()
    }

    dispatch(activateForm())
  }

  return (
    <Box>
      <ButtonAddTask onClick={showFormAddNewTask}>
        <StyledAddIcon></StyledAddIcon>
      </ButtonAddTask>

      <StyledTodo>
        {todoTasks.length > 0 ? (
          todoTasks.map((task) => (
            <Task
              data={task}
              key={task.id}
            />
          ))
        ) : (
          <TextNoTasks>Пока нет задач</TextNoTasks>
        )}
      </StyledTodo>
    </Box>
  )
}

export default Todo
