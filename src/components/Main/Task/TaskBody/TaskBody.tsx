import React from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'

import { ReactComponent as IconArrowDown } from '../../../../images/icons/arrow-down.svg'
import { ReactComponent as IconDelete } from '../../../../images/icons/delete.svg'
import { ReactComponent as IconEdit } from '../../../../images/icons/edit.svg'
import { openDialog } from '../../../../redux/reducers/slices/dialogsSlice'
import { StyleParamsParentType, TaskProps } from '../Task'
import { StyledTaskProps, TaskType } from '../task.type'
import { translateBackward, translateForward } from './animation/translate'

const StyledIconArrowDown = styled(IconArrowDown)`
  transform: ${({ $wasClickedButtonDescription }) => $wasClickedButtonDescription && 'rotate(180deg)'};
  transition: transform 0.3s ease;
`

const Title = styled('h2')`
  font-size: 1.4rem;
  font-weight: 600;
`

const Controls = styled('div')`
  position: absolute;
  top: 5px;
  right: 8px;
  display: flex;
  gap: 5px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
`

const StyledControl = styled('button')`
  width: 20px;
  height: 20px;
`

const Control = styled(StyledControl)``

const StyledIconEdit = styled(IconEdit)``

const StyledIconDelete = styled(IconDelete)``

const ButtonShowDescription = styled('button')`
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  width: 50px;
  height: 30px;
`

const TextDescription = styled('p')<StyledTaskProps>`
  font-size: 1.4rem;
  width: 100%;
  margin: 25px 0 0;

  display: ${({ $wasClickedButtonDescription, $isActiveDescription }) =>
    $wasClickedButtonDescription ? 'flex' : !$isActiveDescription && 'none'};

  animation: ${({ $wasClickedButtonDescription }) => {
    return css`
      ${$wasClickedButtonDescription ? translateForward : translateBackward} 1s ease forwards
    `
  }};
`

interface TaskBodyProps {
  data: TaskType
  styleParamsParent: StyleParamsParentType
  refTextDescription: React.RefObject<HTMLDivElement>
  isActiveDescription: boolean
  isDisabledButtonShowDescription: boolean
  wasClickedButtonDescription: boolean
  currentColumnLocation: TaskProps['currentColumnLocation']
  handleShowDescription: () => void
}

function TaskBody({
  data,
  styleParamsParent,
  refTextDescription,
  isActiveDescription,
  isDisabledButtonShowDescription,
  wasClickedButtonDescription,
  handleShowDescription,
  currentColumnLocation,
}: TaskBodyProps) {
  const dispatch = useDispatch()

  // показать диалоговое окно удаления задачи
  function showDialogRemoveTask() {
    dispatch(openDialog({ dialogName: 'dialogRemoveTask', data, columnName: currentColumnLocation }))
  }

  // показать диалоговое окно редактирования задачи
  function showDialogEditTask() {
    dispatch(openDialog({ dialogName: 'dialogEditTask', data, columnName: currentColumnLocation }))
  }

  return (
    <>
      <Title>{data.nameTask}</Title>

      <Controls id='taskControls'>
        <Control onClick={showDialogEditTask}>
          <StyledIconEdit />
        </Control>

        <Control onClick={showDialogRemoveTask}>
          <StyledIconDelete />
        </Control>
      </Controls>

      {data.description && (
        <ButtonShowDescription
          disabled={isDisabledButtonShowDescription}
          onClick={handleShowDescription}
        >
          <StyledIconArrowDown $wasClickedButtonDescription={wasClickedButtonDescription} />
        </ButtonShowDescription>
      )}

      <TextDescription
        $isActiveDescription={isActiveDescription}
        $styleParamsParent={styleParamsParent}
        $wasClickedButtonDescription={wasClickedButtonDescription}
        ref={refTextDescription}
      >
        {data.description}
      </TextDescription>
    </>
  )
}

export default TaskBody
