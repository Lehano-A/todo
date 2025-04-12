import { keyframes } from 'styled-components'

const translateForward = keyframes`
  from {
    transform: translateY(50px);
  }

  to {
    transform: translateY(-10px);
  }
`

const translateBackward = keyframes`
  from {
  transform: translateY(-10px);
  }

  to {
    transform: translateY(50px);
  }
`

export { translateForward, translateBackward }
