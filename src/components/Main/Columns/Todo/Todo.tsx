import React from 'react'
import styled from 'styled-components'

import AddIcon from '../../../../images/icons/add.svg'
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
  filter: invert(51%) sepia(100%) saturate(327%) hue-rotate(100deg) brightness(95%) contrast(86%);
`

const AddTask = styled('button')`
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-color: white;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  position: absolute;
  bottom: 25px;
  padding: 0;
`

function Todo() {
  return (
    <StyledTodo>
      <Task>DSFSDFDSFSDF</Task>

      <AddTask>
        <StyledAddIcon></StyledAddIcon>
      </AddTask>
    </StyledTodo>
  )
}

export default Todo
