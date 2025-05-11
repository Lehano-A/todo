import styled from 'styled-components'

import { TaskControlProps } from '../components/Main/Task/task.types'
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

export const TaskControl = styled('button')<TaskControlProps>`
  & svg {
    fill: ${({ $styleTaskElements }) => $styleTaskElements.control.fill};
  }

  &:hover {
    & svg {
      transition: fill 0.15s ease-in;
      fill: ${({ $styleTaskElements }) => $styleTaskElements.control.hover};
    }
  }

  &:focus-visible {
    ${simpleFocusOutlineStyle}

    & svg {
      transition: fill 0.15s ease-in;
      fill: ${({ $styleTaskElements }) => $styleTaskElements.control.hover};
    }
  }
`
