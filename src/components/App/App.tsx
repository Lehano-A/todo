import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { setFactWindowResize } from '../../redux/reducers/slices/commonSlice'
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
  const dispatch = useDispatch()
  const refFormAddTask = useRef<HTMLDialogElement>(null)
  const refDialogEditTask = useRef<HTMLDialogElement>(null)
  const refDialogRemoveTask = useRef<HTMLDialogElement>(null)

  const { dialogAddNewTask, dialogEditTask, dialogRemoveTask } = useSelector((state: RootState) => state.dialogs)

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(setFactWindowResize())
    })

    return () => {
      window.removeEventListener('resize', () => {
        dispatch(setFactWindowResize())
      })
    }
  }, [])

  useEffect(() => {
    if (dialogAddNewTask.isActive && refFormAddTask.current) {
      refFormAddTask.current.showModal()
    }

    if (dialogEditTask.isActive && refDialogEditTask.current) {
      refDialogEditTask.current.showModal()
    }

    if (dialogRemoveTask.isActive && refDialogRemoveTask.current) {
      refDialogRemoveTask.current.showModal()
    }
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
