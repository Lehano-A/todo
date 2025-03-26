import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const palette = {
  primary: { main: '#5433ff' },
  secondary: { main: '' },
  accent: { main: '' },
  bg: { main: '' },
  gradients: {
    main: 'linear-gradient(to right, #5433ff, #20bdff, #a5fecb)',
  },
}

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: Rubik-Light, Roboto, Arial, sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 0;
  }

  input, textarea {
    border-radius: 4px;
    border: 2px solid #d0d0d0;
    padding-left: 15px;
    padding-right: 15px;
  }

  input {
    height: 40px;
  }

  textarea {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  input:focus, textarea:focus {
    outline: none;
  }

`

const theme = {
  palette,
}

export default theme

export { GlobalStyle }
