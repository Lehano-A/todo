import React, { useRef } from 'react'
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

function Main() {
  const refFormAddTask = useRef(null)

  return (
    <StyledMain>
      <Todo refFormAddTask={refFormAddTask} />
      <InProcess />
      <Done />

      <FormNewTask ref={refFormAddTask} />
    </StyledMain>
  )
}

export default Main
