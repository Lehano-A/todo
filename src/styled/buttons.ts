import styled from 'styled-components'

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

export const TaskButton = styled('button')`
  &:hover {
    & svg {
      transition: fill 0.15s ease-in;
      fill: ${({ theme }) => theme.palette.grey[500]};
    }
  }

  &:focus-visible {
    ${simpleFocusOutlineStyle}

    & svg {
      transition: fill 0.15s ease-in;
      fill: ${({ theme }) => theme.palette.grey[500]};
    }
  }
`
