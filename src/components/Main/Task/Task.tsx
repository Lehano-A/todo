import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { ReactComponent as IconDelete } from '../../../images/icons/delete.svg'

const StyledTask = styled('div')`
  position: relative;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;

  &:hover {
    & #buttonDeleteTask {
      visibility: visible;
      opacity: 1;
    }
  }
`

const StyledIconDelete = styled(IconDelete)`
  position: absolute;
  top: 5px;
  right: 5px;
`

const Title = styled('h2')`
  font-size: 1rem;
`

const ButtonDelete = styled('button')`
  width: 20px;
  height: 20px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
`

function Task({ children }: PropsWithChildren) {
  return (
    <StyledTask>
      <Title>{children}</Title>

      <ButtonDelete id='buttonDeleteTask'>
        <StyledIconDelete />
      </ButtonDelete>
    </StyledTask>
  )
}

export default Task
