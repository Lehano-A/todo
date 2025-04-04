import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledTask = styled('div')`
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
`

const Title = styled('h2')`
  font-size: 1rem;
`

function Task({ children }: PropsWithChildren) {
  return (
    <StyledTask>
      <Title>{children}</Title>
    </StyledTask>
  )
}

export default Task
