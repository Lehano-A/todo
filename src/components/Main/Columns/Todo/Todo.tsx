import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import AddIcon from '../../../../images/icons/add.svg'
import { activateForm } from '../../../../redux/reducers/slices/formAddTaskSlice'
import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const StyledTodo = styled(Column)`
  background-color: #8080800f;
  position: relative;
`

const StyledAddIcon = styled('svg')`
  background: url(${AddIcon}) no-repeat center center;
  width: 100%;
  height: 100%;
  // filter: invert(51%) sepia(100%) saturate(327%) hue-rotate(100deg) brightness(95%) contrast(86%);
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
interface FormAddTaskState {
  formAddTask: {
    isActive: boolean
  }
}

function Todo({ refFormAddTask }: any) {
  const dispatch = useDispatch()
  const isActiveFormAddTask = useSelector((state: FormAddTaskState) => state.formAddTask.isActive)

  function handleFormAddTask(e: any) {
    // console.log('e', e.currentTarget)
    // e.currentTarget.showModal()

    if (refFormAddTask.current) {
      refFormAddTask.current.showModal()
    }

    dispatch(activateForm())
  }
  return (
    <StyledTodo>
      <Task>DSFSDFDSFSDF</Task>

      <ButtonAddTask onClick={handleFormAddTask}>
        <StyledAddIcon></StyledAddIcon>
      </ButtonAddTask>
    </StyledTodo>
  )
}

export default Todo
