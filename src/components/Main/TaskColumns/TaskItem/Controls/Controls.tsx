import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { DONE_COLUMN_NAME } from '../../../../../constants'
import { TaskItemContext } from '../../../../../contexts/TaskItemContext'
import { ReactComponent as IconDelete } from '../../../../../images/icons/delete.svg'
import { ReactComponent as IconEdit } from '../../../../../images/icons/edit.svg'
import { openDialog } from '../../../../../redux/reducers/slices/dialogsSlice'
import { TaskControl } from '../../../../../styled/buttons'

const StyledControls = styled('div')<{ $hasDeadline: boolean }>`
  position: absolute;
  top: ${({ $hasDeadline }) => ($hasDeadline ? '32px' : '8px')};
  right: 6px;
  display: flex;
  flex-direction: column;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus {
    visibility: visible;
    opacity: 100;
  }
`

const Control = styled(TaskControl)`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Controls() {
  const { dataTask, currentColumnLocation } = useContext(TaskItemContext)

  const dispatch = useDispatch()

  // показать диалоговое окно удаления задачи
  function showDialogRemoveTask() {
    dispatch(openDialog({ dialogName: 'dialogRemoveTask', dataTask, columnName: currentColumnLocation }))
  }

  // показать диалоговое окно редактирования задачи
  function showDialogEditTask() {
    dispatch(openDialog({ dialogName: 'dialogEditTask', dataTask, columnName: currentColumnLocation }))
  }
  return (
    <StyledControls
      id='taskControls'
      $hasDeadline={
        Boolean(dataTask.deadline) || (dataTask.deadline === '' && currentColumnLocation === DONE_COLUMN_NAME)
      }
    >
      <Control onClick={showDialogEditTask}>
        <IconEdit />
      </Control>

      <Control onClick={showDialogRemoveTask}>
        <IconDelete />
      </Control>
    </StyledControls>
  )
}

export default Controls
