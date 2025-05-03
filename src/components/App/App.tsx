import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../redux/store'
import FormNewTask from '../FormNewTask/FormNewTask'
import Header from '../Header/Header'
import Main from '../Main/Main'

const StyledApp = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const refFormAddTask = useRef<HTMLDialogElement>(null)

  const isActiveFormAddTask = useSelector((state: RootState) => state.formNewTask.isActive)

  useEffect(() => {
    if (isActiveFormAddTask && refFormAddTask.current) {
      refFormAddTask.current.showModal()
    }
  }, [isActiveFormAddTask])

  return (
    <StyledApp>
      <Header />
      <Main />

      {isActiveFormAddTask && <FormNewTask ref={refFormAddTask} />}
    </StyledApp>
  )
}

export default App
