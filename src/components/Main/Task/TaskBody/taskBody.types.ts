import { StyleTaskElements, TaskElementsRefs, TaskType } from '../task.types'

export interface TaskBodyProps {
  data: TaskType
  refs: TaskElementsRefs
  isOpenedContent: boolean
  isDisabledButtonShowContent: boolean
  wasToggledButtonShowContent: boolean
  styleTaskElements: StyleTaskElements
  handleShowContent: () => void
}
