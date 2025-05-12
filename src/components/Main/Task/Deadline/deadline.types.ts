import { StyleTaskElements, TaskProps } from '../task.types'
import { RestOfDays } from '../utils/calculateRestOfDaysBeforeDeadline'

export interface DeadlineProps {
  data: TaskProps['data']
  currentColumnLocation: TaskProps['currentColumnLocation']
  restOfDays: RestOfDays
  isTaskDone: boolean
  styleTaskElements: StyleTaskElements
}

export interface StyledDeadlineProps {
  $isExpired: boolean
  $isTaskDone: boolean
  $styleTaskElements: StyleTaskElements
}
