import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../redux/store'
import DialogAddNewTask from '../DialogAddNewTask/DialogAddNewTask'
import DialogEditTask from '../DialogEditTask/DialogEditTask'
import DialogRemoveTask from '../DialogRemoveTask/DialogRemoveTask'
import Header from '../Header/Header'
import Main from '../Main/Main'

const StyledApp = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const refFormAddTask = useRef<HTMLDialogElement>(null)
  const refDialogEditTask = useRef<HTMLDialogElement>(null)
  const refDialogRemoveTask = useRef<HTMLDialogElement>(null)

  const { dialogAddNewTask, dialogEditTask, dialogRemoveTask } = useSelector((state: RootState) => state.dialogs)

  useEffect(() => {
    if (dialogAddNewTask.isActive && refFormAddTask.current) {
      refFormAddTask.current.showModal()
    }
    // } else if (!dialogAddNewTask.isActive && refFormAddTask.current) {
    //   refFormAddTask.current.close()
    // }

    if (dialogEditTask.isActive && refDialogEditTask.current) {
      refDialogEditTask.current.showModal()
    }
    // } else if (!dialogEditTask.isActive && refDialogEditTask.current) {
    //   refDialogEditTask.current.close()
    // }

    if (dialogRemoveTask.isActive && refDialogRemoveTask.current) {
      refDialogRemoveTask.current.showModal()
    }
    // } else if (!dialogRemoveTask.isActive && refDialogRemoveTask.current) {
    //   refDialogRemoveTask.current.close()
    // }
  }, [dialogAddNewTask.isActive, dialogEditTask.isActive, dialogRemoveTask.isActive])

  return (
    <StyledApp>
      <Header />
      <Main />

      {dialogAddNewTask.isActive && <DialogAddNewTask ref={refFormAddTask} />}

      {dialogEditTask.isActive && <DialogEditTask refDialog={refDialogEditTask} />}

      {dialogRemoveTask.isActive && <DialogRemoveTask refDialog={refDialogRemoveTask} />}
    </StyledApp>
  )
}

export default App
