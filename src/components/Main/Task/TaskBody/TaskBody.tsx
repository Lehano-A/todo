import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { ReactComponent as IconArrowDown } from '../../../../images/icons/arrow-down.svg'
import { ReactComponent as IconDelete } from '../../../../images/icons/delete.svg'
import { ReactComponent as IconEdit } from '../../../../images/icons/edit.svg'
import { openDialog } from '../../../../redux/reducers/slices/dialogsSlice'
import { TaskControl } from '../../../../styled/buttons'
import ContentBox from './ContentBox/ContentBox'
import { TaskBodyProps } from './taskBody.types'

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
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
`

const Control = styled(TaskControl)`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonShowDescription = styled(TaskControl)`
  position: absolute;
  left: 50%;
  bottom: 2px; // 2px - чтобы была видна нижняя часть фокуса
  transform: translateX(-50%);
  width: 50px;
  height: 25px;
`

const Text = styled('p')`
  display: flex;
  width: 100%;
  font-size: 1.4rem;
  margin: 25px 0 0;
`

function TaskBody({
  data,
  refs,
  isActiveDescription,
  isDisabledButtonShowDescription,
  wasClickedButtonDescription,
  handleShowDescription,
  currentColumnLocation,
  styleTaskElements,
}: TaskBodyProps) {
  const { refTitle, refTextDescription } = refs

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
      <Title ref={refTitle}>{data.nameTask}</Title>

      <Controls id='taskControls'>
        <Control
          onClick={showDialogEditTask}
          $styleTaskElements={styleTaskElements}
        >
          <IconEdit />
        </Control>

        <Control
          onClick={showDialogRemoveTask}
          $styleTaskElements={styleTaskElements} // прокидывается внутрь TaskControl
        >
          <IconDelete />
        </Control>
      </Controls>

      {data.description && (
        <>
          <ButtonShowDescription
            $styleTaskElements={styleTaskElements} // прокидывается внутрь TaskControl
            disabled={isDisabledButtonShowDescription}
            onClick={handleShowDescription}
          >
            <StyledIconArrowDown $wasClickedButtonDescription={wasClickedButtonDescription} />
          </ButtonShowDescription>

          <ContentBox
            wasClickedButtonDescription={wasClickedButtonDescription}
            isActiveDescription={isActiveDescription}
            refContentBox={refTextDescription}
          >
            <Text>{data.description}</Text>
          </ContentBox>
        </>
      )}
    </>
  )
}

export default TaskBody
