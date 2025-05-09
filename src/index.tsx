import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import App from './components/App/App'
import store from './redux/store'
import theme, { GlobalStyle } from './theme/theme'
import './vendor/fonts/fonts.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    {/* <ConfigProvider theme={{ components: { */}
    {/* DatePicker: {zIndexPopup: 111111111}}}}> */}
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
    {/* </ConfigProvider> */}
  </Provider>
)
