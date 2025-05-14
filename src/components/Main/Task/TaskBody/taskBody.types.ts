import { StyleTaskElements, TaskElementsRefs, TaskProps, TaskType } from '../task.types'

export interface TaskBodyProps {
  data: TaskType
  refs: TaskElementsRefs
  isActiveDescription: boolean
  isDisabledButtonShowDescription: boolean
  wasClickedButtonDescription: boolean
  currentColumnLocation: TaskProps['currentColumnLocation']
  styleTaskElements: StyleTaskElements
  handleShowDescription: () => void
}
