import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { getTasksFromLS } from '../../redux/reducers/slices/tasksSlice'
import FormNewTask from '../FormNewTask/FormNewTask'
import Done from './Columns/Done/Done'
import InProcess from './Columns/InProcess/InProcess'
import Todo from './Columns/Todo/Todo'

const StyledMain = styled('main')`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Columns = styled('section')`
  display: flex;
  justify-content: center;
  width: 100%;

  :where(& > :nth-child(1n):not(:last-child)) {
    margin-right: 20px;
  }
`

function Main() {
  const refFormAddTask = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasksFromLS())
  }, [])

  return (
    <StyledMain>
      <Columns>
        <Todo refFormAddTask={refFormAddTask} />
        <InProcess />
        <Done />
      </Columns>

      <FormNewTask ref={refFormAddTask} />
    </StyledMain>
  )
}

export default Main
