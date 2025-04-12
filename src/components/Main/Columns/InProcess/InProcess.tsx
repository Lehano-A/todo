import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { INPROCESS_COLUMN_NAME } from '../../../../constants'
import { RootState } from '../../../../redux/store'
import Column from '../../../../styled/column'
import Task from '../../Task/Task'

const StyledInProcess = styled(Column)`
  background-color: ${({ theme }) => theme.palette.taskColumns.inProcess};
`

const TitleColumn = styled('h2')`
  margin-bottom: 40px;
`

function InProcess() {
  const inProcessTasks = useSelector((state: RootState) => state.tasks.inProcess)

  return (
    <StyledInProcess>
      <TitleColumn>В процессе</TitleColumn>

      {inProcessTasks.map((task) => (
        <Task
          currentColumnLocation={INPROCESS_COLUMN_NAME}
          data={task}
          key={task.id}
        />
      ))}
    </StyledInProcess>
  )
}

export default InProcess
