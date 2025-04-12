import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { DONE_COLUMN_NAME } from '../../../../constants'
import { RootState } from '../../../../redux/store'
import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const StyledDone = styled(Column)`
  background-color: ${({ theme }) => theme.palette.taskColumns.done};
`

const TitleColumn = styled('h2')`
  margin-bottom: 40px;
`

function Done() {
  const doneTasks = useSelector((state: RootState) => state.tasks.done)

  return (
    <StyledDone>
      <TitleColumn>Завершены</TitleColumn>

      {doneTasks.map((task) => (
        <Task
          currentColumnLocation={DONE_COLUMN_NAME}
          data={task}
          key={task.id}
        />
      ))}
    </StyledDone>
  )
}

export default Done
