import { RefObject } from 'react'

import { InnerBoxTaskBodyProps } from '../../task.types'

export interface ContentBoxProps {
  children?: React.ReactNode
  refContentBox: RefObject<HTMLDivElement>
  isOpenedContent: InnerBoxTaskBodyProps['$isOpenedContent']
  wasToggledButtonShowContent: InnerBoxTaskBodyProps['$wasToggledButtonShowContent']
}

export interface StyledBox {
  $isOpenedContent: ContentBoxProps['isOpenedContent']
  $wasToggledButtonShowContent: ContentBoxProps['wasToggledButtonShowContent']
}
