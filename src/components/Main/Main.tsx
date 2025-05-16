import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { ReactComponent as AddIcon } from '../../images/icons/add.svg'
import { openDialog } from '../../redux/reducers/slices/dialogsSlice'
import { PrimaryButton } from '../../styled/buttons'
import TaskColumns from './TaskColumns/TaskColumns'

const StyledMain = styled('main')`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`

const BoxColumns = styled('section')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1400px;
  width: 100%;
  padding: 0 30px;
`

const ButtonAddTask = styled(PrimaryButton)`
  position: fixed;
  bottom: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  border-radius: 50%;
  margin: 90px 10px 0 0;
`

const StyledAddIcon = styled(AddIcon)`
  width: 100%;
  height: 100%;
`

function Main() {
  const dispatch = useDispatch()

  // активировать форму добавления новой задачи
  function openDialogAddNewTask() {
    dispatch(openDialog({ dialogName: 'dialogAddNewTask' }))
  }

  return (
    <StyledMain>
      <BoxColumns>
        <TaskColumns />
      </BoxColumns>

      <ButtonAddTask onClick={openDialogAddNewTask}>
        <StyledAddIcon />
      </ButtonAddTask>
    </StyledMain>
  )
}

export default Main
