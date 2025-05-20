import React, { useContext } from 'react'
import styled, { css } from 'styled-components'

import { TaskBodyContext } from '../../../../../../../contexts/TaskBodyContext'
import { translateBackward, translateForward } from './animation/translate'
import { ContentBoxProps, StyledContentBox } from './contentBox.types'

const Box = styled('div')<StyledContentBox>`
  display: ${({ $wasToggledButtonShowContent, $isOpenedContent }) =>
    $wasToggledButtonShowContent ? 'flex' : !$isOpenedContent && 'none'};

  animation: ${({ $wasToggledButtonShowContent }) => {
    return css`
      ${$wasToggledButtonShowContent ? translateForward : translateBackward} 1s ease forwards
    `
  }};
`

function ContentBox({ children, refs }: ContentBoxProps) {
  const { refContentBox } = refs

  const { isOpenedContent, wasToggledButtonShowContent } = useContext(TaskBodyContext)

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
