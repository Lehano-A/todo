import styled from 'styled-components'

import TaskColumns from './Columns/Columns'

const StyledMain = styled('main')`
  display: flex;
  justify-content: center;
  width: 100%;
`

const BoxColumns = styled('section')`
  display: flex;
  justify-content: center;
  width: 100%;

  :where(& > :nth-child(1n):not(:last-child)) {
    margin-right: 20px;
  }
`

function Main() {
  return (
    <StyledMain>
      <BoxColumns>
        <TaskColumns />
      </BoxColumns>
    </StyledMain>
  )
}

export default Main
