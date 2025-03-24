import React from 'react'
import styled from 'styled-components'

import Header from '../Header/Header'
import Main from '../Main/Main'

const StyledApp = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const list = [
    { title: 'Починить дверь', id: 0 },
    { title: 'Проверить счётчики воды', id: 2 },
  ]

  return (
    <StyledApp>
      <Header />
      <Main />
    </StyledApp>
  )
}

export default App
