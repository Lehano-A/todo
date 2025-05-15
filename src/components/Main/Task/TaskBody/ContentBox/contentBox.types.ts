import { RefObject } from 'react'

import { InnerBoxTaskBodyProps } from '../../task.types'

export interface ContentBoxProps {
  children?: React.ReactNode
  refContentBox: RefObject<HTMLDivElement>
  isActiveDescription: InnerBoxTaskBodyProps['$isActiveDescription']
  wasClickedButtonDescription: InnerBoxTaskBodyProps['$wasClickedButtonDescription']
}

export interface StyledBox {
  $isActiveDescription: ContentBoxProps['isActiveDescription']
  $wasClickedButtonDescription: ContentBoxProps['wasClickedButtonDescription']
}
