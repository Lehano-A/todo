import React from 'react'
import styled from 'styled-components'

import Column from '../../../../styled/column'

const StyledDone = styled(Column)`
  background-color: rgba(245, 186, 196, 0.27);
`

function Done() {
  return <StyledDone></StyledDone>
}

export default Done
