import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import AddIcon from '../../../../images/icons/add.svg'
import { activateForm } from '../../../../redux/reducers/slices/formAddTaskSlice'
import { getToDoTasksFromLS } from '../../../../redux/reducers/slices/todoTasksSlice'
import { RootState } from '../../../../redux/store'
import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const StyledTodo = styled(Column)`
  background-color: #8080800f;
  position: relative;

  :where(& > div):not(:last-of-type) {
    margin-bottom: 15px;
  }
`
const StyledAddIcon = styled('svg')`
  background: url(${AddIcon}) no-repeat center center;
  width: 100%;
  height: 100%;
`

const ButtonAddTask = styled('button')`
  position: absolute;
  top: 15px;
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-color: white;
  border-radius: 50%;
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
    <StyledTodo>
      <ButtonAddTask onClick={showFormAddNewTask}>
        <StyledAddIcon></StyledAddIcon>
      </ButtonAddTask>

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
  )
}

export default Todo
