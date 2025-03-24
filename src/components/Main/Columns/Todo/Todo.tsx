import React from 'react'
import styled from 'styled-components'

import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const StyledTodo = styled(Column)`
  background-color: #8080800f;
`

function Todo() {
  return (
    <StyledTodo>
      <Task>DSFSDFDSFSDF</Task>
    </StyledTodo>
  )
}

export default Todo
