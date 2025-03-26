import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import App from './components/App/App'
import store from './redux/store'
import theme, { GlobalStyle } from './theme/theme'
import GlobalFonts from './vendor/fonts/fonts'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GlobalFonts />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
