import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const palette = {
  primary: { main: '#5433ff' },
  secondary: { main: '' },
  accent: { main: '' },
  error: { dark: '#ce001a', main: '#ffadb7' },
  bg: { main: '' },
  gradients: {
    main: 'linear-gradient(to right, #5433ff, #20bdff, #a5fecb)',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    900: '#212121',
  },
  taskColumns: {
    todo: '#f5f5f5',
    inProcess: 'rgba(250, 231, 179, 0.27)',
    done: 'rgba(186, 245, 209, 0.27);',
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

  h2, p {
    margin: 0;
  }
`

const theme = {
  palette,
  focus: {
    input: `
    background: linear-gradient(#fff 0 0) padding-box, ${palette.gradients.main} border-box;
    border: 2px solid transparent;
    border-radius: 4px;
    `,
  },
}

export default theme

export { GlobalStyle }
