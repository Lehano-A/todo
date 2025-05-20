import { InnerBoxTaskBodyProps, TaskElementsRefs } from '../../task.types'

export interface ContentBoxProps {
  refs: TaskElementsRefs
  children?: React.ReactNode
}

export interface StyledContentBox {
  $isOpenedContent: InnerBoxTaskBodyProps['$isOpenedContent']
  $wasToggledButtonShowContent: InnerBoxTaskBodyProps['$wasToggledButtonShowContent']
}
