import { css } from 'styled-components'

// фокус с простым выделением элемента
export const simpleFocusOutlineStyle = css`
  outline: 2px solid ${({ theme }) => theme.palette.primary.main};
`
