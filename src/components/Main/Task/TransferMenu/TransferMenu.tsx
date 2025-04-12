import React from 'react'
import styled from 'styled-components'

import { ReactComponent as IconClose } from '../../../../images/icons/close.svg'
import { ColumnName } from '../../../../redux/reducers/slices/tasksSlice'
import { getOppositeColumnNames } from './utils/transferMenuUtils'

const StyledIconClose = styled(IconClose)`
  fill: ${({ theme }) => theme.palette.grey[300]};
`

const Box = styled('ul')`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  list-style: none;
  padding: 20px;
  margin: 0;
  font-weight: bold;
`

const ButtonClose = styled('button')`
  position: absolute;
  top: 5px;
  right: 8px;
`

const ButtonBox = styled('div')`
  display: flex;
  gap: 15px;
  height: 100%;
`

const StyledButtonTransferMenu = styled('button')`
  display: flex;
  border-radius: 8px;
  padding: 10px 25px;
  height: 100%;
`

const Button = styled(StyledButtonTransferMenu)<ButtonProps>`
  text-wrap: nowrap;
  background-color: ${({ theme, $columnName }) => theme.palette.taskColumns[$columnName]};
`

interface ButtonProps {
  $columnName: ColumnName
}

interface TransferMenuProps {
  currentColumnLocation: ColumnName
  handleTransfer: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleCloseTransferMenu: () => void
}

function TransferMenu({ currentColumnLocation, handleTransfer, handleCloseTransferMenu }: TransferMenuProps) {
  const [first, second] = getOppositeColumnNames(currentColumnLocation)

  return (
    <Box>
      <p>Переместить в колонку:</p>

      <ButtonClose onClick={handleCloseTransferMenu}>
        <StyledIconClose />
      </ButtonClose>

      <ButtonBox>
        <li>
          <Button
            $columnName={first.id as ColumnName}
            name={first.id}
            onClick={handleTransfer}
          >
            {first.name}
          </Button>
        </li>
        <li>
          <Button
            $columnName={second.id as ColumnName}
            name={second.id}
            onClick={handleTransfer}
          >
            {second.name}
          </Button>
        </li>
      </ButtonBox>
    </Box>
  )
}

export default TransferMenu
