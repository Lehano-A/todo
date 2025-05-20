import { createContext } from 'react'

import { TaskType } from '../components/Main/TaskColumns/TaskItem/Task/task.types'
import { TaskColumnName } from '../components/Main/TaskColumns/taskColumns.types'

interface TaskItemContextType {
  dataTask: TaskType
  isDraggingOver: boolean
  ordinalNumber: number
  indexCurrentTask: number
  currentColumnLocation: TaskColumnName
}

const context: TaskItemContextType = {
  dataTask: { id: '', nameTask: '', description: '', deadline: '' },
  isDraggingOver: false,
  ordinalNumber: 1,
  indexCurrentTask: 0,
  currentColumnLocation: 'todo',
}

export const TaskItemContext = createContext(context)
