import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const palette = {
  primary: { main: '' },
  secondary: { main: '' },
  accent: { main: '' },
  bg: { main: '' },
};

const GlobalStyle = createGlobalStyle`
  ${normalize}
`

const theme = {
  palette
}

export default theme

export { GlobalStyle }