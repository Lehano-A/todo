import styled from 'styled-components'

import { StyleTaskElements } from '../components/Main/Task/task.types'
import { simpleFocusOutlineStyle } from './css/highlighting'

export const PrimaryButton = styled('button')`
  transition: background-color 0.15s ease-in;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.palette.primary.main};

    & svg {
      transition: fill 0.15s ease-in;
      fill: white;
    }
  }
`

export const TaskControl = styled('button')<{ $styleTaskElements?: StyleTaskElements }>`
  & svg {
    fill: ${({ theme, $styleTaskElements }) =>
      $styleTaskElements ? $styleTaskElements.control.fill : theme.palette.grey[500]};
  }

  &:hover {
    & svg {
      transition: fill 0.15s ease-in;
      fill: ${({ theme, $styleTaskElements }) =>
        $styleTaskElements ? $styleTaskElements.control.hover : theme.palette.grey[300]};
    }
  }

  &:focus-visible {
    ${simpleFocusOutlineStyle}

    & svg {
      transition: fill 0.15s ease-in;
      fill: ${({ theme, $styleTaskElements }) =>
        $styleTaskElements ? $styleTaskElements.control.hover : theme.palette.grey[300]};
    }
  }
`
