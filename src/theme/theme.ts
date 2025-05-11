import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const palette = {
  primary: { main: '#5433ff' },
  secondary: { main: '' },
  accent: { main: '' },
  error: { dark: '#ce001a', main: '#ffadb7', light: '#ffe8eb' },
  bg: { main: '' },

  gradients: {
    main: 'linear-gradient(to right, #5433ff, #20bdff, #a5fecb)',
  },

  red: {
    50: '#ffebee',
    75: '#ffe1e7',
    100: '#ffcdd2',
    150: '#ffadb7',
    200: '#ef9a9a',
    250: '#eb8181',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
    950: '#ab0e0e',
    1000: '#880b0b',
  },

  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    250: '#d0d0d0',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  taskColumns: {
    todo: '#f5f5f5',
    inProcess: 'rgba(250, 231, 179, 0.27)',
    done: 'rgba(186, 245, 209, 0.27);',
  },

  focus: {
    get input() {
      return `
      background: linear-gradient(#fff 0 0) padding-box, ${palette.gradients.main} border-box;
      border: 2px solid transparent;
      border-radius: 4px;
      `
    },
  },
}

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
    font-size: 1.4rem;
  }

  :root {
    font-size: 0.625rem;
    font-family: Rubik,  Roboto, Arial,
    sans-serif;
    font-weight: 400;
  }

  body {
     color: ${palette.grey[900]}
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  input, textarea, .ant-picker {
    border-radius: 4px;
    border: 2px solid ${palette.grey[250]};
    padding-left: 15px;
    padding-right: 15px;
  }

  input, .ant-picker {
    height: 40px;
  }

  textarea {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  input:focus, textarea:focus, button:focus {
    outline: none;
  }

  h2, p {
    margin: 0;
  }
`

const theme = {
  palette,
}

export default theme

export { GlobalStyle }
