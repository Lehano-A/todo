import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import AddIcon from '../../../../images/icons/add.svg'
import { activateForm } from '../../../../redux/reducers/slices/formAddTaskSlice'
import Column from '../../../../styled/column'
import ls from '../../../../utils/localStorage'
import Task from '../../Task/Task'
import { TaskType } from '../../Task/task.type'

const StyledTodo = styled(Column)`
  background-color: #8080800f;
  position: relative;

  :where(& > div):not(:last-of-type) {
    margin-bottom: 10px;
  }
`
const StyledAddIcon = styled('svg')`
  background: url(${AddIcon}) no-repeat center center;
  width: 100%;
  height: 100%;
`

const ButtonAddTask = styled('button')`
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  bottom: 25px;
`

function Todo({ refFormAddTask }: any) {
  const dispatch = useDispatch()

  const [tasksFromLS, setTasksFromLS] = useState<TaskType[]>([])

  useEffect(() => {
    const data = ls.get('tasks')

    if (Array.isArray(data)) {
      setTasksFromLS(data)
    }
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
      {tasksFromLS.map((task, id) => (
        <Task key={id + task.nameTask}>{task.nameTask}</Task>
      ))}

      <ButtonAddTask onClick={showFormAddNewTask}>
        <StyledAddIcon></StyledAddIcon>
      </ButtonAddTask>
    </StyledTodo>
  )
}

export default Todo
