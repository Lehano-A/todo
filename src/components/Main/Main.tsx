import React, { forwardRef, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import FormNewTask from '../FormNewTask/FormNewTask'
import Done from './Columns/Done/Done'
import InProcess from './Columns/InProcess/InProcess'
import Todo from './Columns/Todo/Todo'

const StyledMain = styled('main')`
  display: flex;
  justify-content: center;
  width: 100%;
`

interface FormAddTask {
  formAddTask: { isActive: boolean }
}

function Main() {
  const refFormAddTask = useRef(null)

  const isActiveFormNewTask = useSelector((state: FormAddTask) => state.formAddTask.isActive)

  return (
    <StyledMain>
      <Todo refFormAddTask={refFormAddTask} />
      <InProcess />
      <Done />

      {<FormNewTask ref={refFormAddTask} />}
    </StyledMain>
  )
}

export default Main
