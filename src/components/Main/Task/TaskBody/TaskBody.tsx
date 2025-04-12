import React, { forwardRef, useRef } from 'react'
import styled, { css } from 'styled-components'

import { ReactComponent as IconArrowDown } from '../../../../images/icons/arrow-down.svg'
import { ReactComponent as IconDelete } from '../../../../images/icons/delete.svg'
import { ReactComponent as IconTransfer } from '../../../../images/icons/transfer.svg'
import useActionsWithTasks from '../../../hooks/useActionsWithTasks'
import DialogRemoveTask from '../DialogRemoveTask/DialogRemoveTask'
import { StyleParamsParentType, TaskProps } from '../Task'
import { StyledTaskProps, TaskType } from '../task.type'
import { translateBackward, translateForward } from './animation/translate'

const Box = styled('div')<{ $isActiveTransferMenu: boolean }>`
  visibility: ${({ $isActiveTransferMenu }) => ($isActiveTransferMenu ? 'hidden' : 'visible')};
`

const StyledIconTransfer = styled(IconTransfer)``

const StyledIconDelete = styled(IconDelete)``

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

const ControlDelete = styled(StyledControl)``

const ControlTransfer = styled(StyledControl)``

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

// visibility: ${({ $wasClickedButtonDescription, $isActiveDescription }) =>
//   $wasClickedButtonDescription ? 'visible' : !$isActiveDescription && 'hidden'};

interface TaskBodyProps {
  data: TaskType
  styleParamsParent: StyleParamsParentType
  refTextDescription: React.RefObject<HTMLDivElement>
  isActiveDescription: boolean
  isActiveTransferMenu: boolean
  isDisabledButtonShowDescription: boolean
  wasClickedButtonDescription: boolean
  handleClickTransferTask: () => void
  handleShowDescription: () => void
}

function TaskBody({
  data,
  styleParamsParent,
  refTextDescription,
  isActiveDescription,
  isActiveTransferMenu,
  isDisabledButtonShowDescription,
  wasClickedButtonDescription,
  handleClickTransferTask,
  handleShowDescription,
}: TaskBodyProps) {
  const refDialog = useRef<HTMLDialogElement>(null)
  const { removeTask } = useActionsWithTasks()
  const { id } = data

  // показать диалоговое окно удаления задачи
  function showDialogRemoveTask() {
    if (refDialog.current) {
      refDialog.current.showModal()
    }
  }

  // удалить задачу
  function handleRemoveTask() {
    removeTask('todo', id)
  }

  return (
    <Box $isActiveTransferMenu={isActiveTransferMenu}>
      <Title>{data.nameTask}</Title>

      <Controls id='taskControls'>
        <ControlTransfer onClick={handleClickTransferTask}>
          <StyledIconTransfer />
        </ControlTransfer>

        <ControlDelete onClick={showDialogRemoveTask}>
          <StyledIconDelete />
        </ControlDelete>
      </Controls>

      <DialogRemoveTask
        data={data}
        handleRemoveTask={handleRemoveTask}
        refDialog={refDialog}
      />

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
    </Box>
  )
}

export default TaskBody
