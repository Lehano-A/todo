import React from 'react'
import styled, { css } from 'styled-components'

import { translateBackward, translateForward } from './animation/translate'
import { ContentBoxProps, StyledBox } from './contentBox.types'

const Box = styled('div')<StyledBox>`
  display: ${({ $wasClickedButtonDescription, $isActiveDescription }) =>
    $wasClickedButtonDescription ? 'flex' : !$isActiveDescription && 'none'};

  animation: ${({ $wasClickedButtonDescription }) => {
    return css`
      ${$wasClickedButtonDescription ? translateForward : translateBackward} 1s ease forwards
    `
  }};
`

function ContentBox({ children, refContentBox, isActiveDescription, wasClickedButtonDescription }: ContentBoxProps) {
  return (
    <Box
      ref={refContentBox}
      $wasClickedButtonDescription={wasClickedButtonDescription}
      $isActiveDescription={isActiveDescription}
    >
      {children}
    </Box>
  )
}

export default ContentBox
