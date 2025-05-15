import React from 'react'
import styled, { css } from 'styled-components'

import { translateBackward, translateForward } from './animation/translate'
import { ContentBoxProps, StyledBox } from './contentBox.types'

const Box = styled('div')<StyledBox>`
  display: ${({ $wasToggledButtonShowContent, $isOpenedContent }) =>
    $wasToggledButtonShowContent ? 'flex' : !$isOpenedContent && 'none'};

  animation: ${({ $wasToggledButtonShowContent }) => {
    return css`
      ${$wasToggledButtonShowContent ? translateForward : translateBackward} 1s ease forwards
    `
  }};
`

function ContentBox({ children, refContentBox, isOpenedContent, wasToggledButtonShowContent }: ContentBoxProps) {
  return (
    <Box
      ref={refContentBox}
      $wasToggledButtonShowContent={wasToggledButtonShowContent}
      $isOpenedContent={isOpenedContent}
    >
      {children}
    </Box>
  )
}

export default ContentBox
