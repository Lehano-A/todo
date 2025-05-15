import { StyleTaskElements, TaskElementsRefs, TaskProps, TaskType } from '../task.types'

export interface TaskBodyProps {
  data: TaskType
  refs: TaskElementsRefs
  isOpenedContent: boolean
  isDisabledButtonShowContent: boolean
  wasToggledButtonShowContent: boolean
  currentColumnLocation: TaskProps['currentColumnLocation']
  styleTaskElements: StyleTaskElements
  handleShowContent: () => void
}
