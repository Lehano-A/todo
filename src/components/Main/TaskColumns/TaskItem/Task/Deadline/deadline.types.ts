import { StyleTaskElements } from '../task.types'

export interface StyledDeadlineProps {
  $isExpired: boolean
  $isTaskDone: boolean
  $styleTaskElements: StyleTaskElements
}
