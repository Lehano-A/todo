import { createContext } from 'react'

import { StyleTaskElements } from '../components/Main/TaskColumns/TaskItem/Task/task.types'

interface TaskBodyContextType {
  restOfDays: number | null
  isTaskDone: boolean
  isOpenedContent: boolean
  isDisabledButtonShowContent: boolean
  wasToggledButtonShowContent: boolean
  styleTaskElements: StyleTaskElements
  handleShowContent: () => void
}

const context: TaskBodyContextType = {
  restOfDays: null,
  isTaskDone: false,
  isOpenedContent: false,
  isDisabledButtonShowContent: false,
  wasToggledButtonShowContent: false,
  styleTaskElements: {
    bg: '',
    deadline: { bg: { main: '', done: '' } },
    control: { fill: '', hover: '' },
  },
  handleShowContent: () => {},
}

export const TaskBodyContext = createContext(context)
