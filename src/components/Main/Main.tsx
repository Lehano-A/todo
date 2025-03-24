import React from 'react'
import styled from 'styled-components'

import Done from './Columns/Done/Done'
import InProcess from './Columns/InProcess/InProcess'
import Todo from './Columns/Todo/Todo'

const StyledMain = styled('main')`
  display: flex;
  justify-content: center;
  width: 100%;
`

function Main() {
  return (
    <StyledMain>
      <Todo />
      <InProcess />
      <Done />
    </StyledMain>
  )
}

export default Main
