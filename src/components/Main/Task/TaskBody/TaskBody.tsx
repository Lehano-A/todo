import React, { useRef } from 'react'
import styled, { css } from 'styled-components'

import { TODO_COLUMN_NAME } from '../../../../constants'
import { ReactComponent as IconArrowDown } from '../../../../images/icons/arrow-down.svg'
import { ReactComponent as IconDelete } from '../../../../images/icons/delete.svg'
import useActionsWithTasks from '../../../hooks/useActionsWithTasks'
import DialogRemoveTask from '../DialogRemoveTask/DialogRemoveTask'
import { StyleParamsParentType } from '../Task'
import { StyledTaskProps, TaskType } from '../task.type'
import { translateBackward, translateForward } from './animation/translate'

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
    removeTask(TODO_COLUMN_NAME, id)
  }

  return (
    <>
      <Title>{data.nameTask}</Title>

      <Controls id='taskControls'>
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
    </>
  )
}

export default TaskBody
