import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import App from './components/App/App'
import theme, { GlobalStyle } from './theme/theme'
import GlobalFonts from './vendor/fonts/fonts'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <GlobalFonts />
    <App />
  </ThemeProvider>
  // </StrictMode>
)
