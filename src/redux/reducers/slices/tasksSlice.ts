import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TaskType } from '../../../components/Main/Task/task.type'
import { ALL_TASKS } from '../../../constants'
import ls from '../../../utils/localStorage'

interface TasksState {
  todo: TaskType[]
  inProcess: TaskType[]
  done: TaskType[]
}

export type ColumnName = 'todo' | 'inProcess' | 'done'

interface TaskPayload {
  locationId?: number
  columnName?: ColumnName
  task?: TaskType
  id?: string
  from?: ColumnName
  where?: ColumnName
  data?: TaskType
  columnTasks?: TaskType[]
}

const initialState: TasksState = {
  todo: [],
  inProcess: [],
  done: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TaskPayload>) => {
      const { columnName, task } = action.payload
      if (columnName && task) state[columnName].push(task)
    },

    getTasksFromLS: (state, action: PayloadAction<TaskPayload['columnName']>) => {
      const columnName = action.payload
      const allTasks = ls.get(ALL_TASKS)

      if (columnName) {
        const tasksFromColumn = allTasks?.[columnName]

        if (Array.isArray(tasksFromColumn)) {
          state[columnName] = tasksFromColumn
        }
      }

      if (allTasks) {
        state.todo = allTasks.todo
        state.inProcess = allTasks.inProcess
        state.done = allTasks.done
      }
    },

    remove: (state, action: PayloadAction<TaskPayload>) => {
      const { columnName, id } = action.payload
      if (columnName) {
        const filtered = state[columnName].filter((task) => task.id !== id)

        state[columnName] = filtered
      }
    },

    updateAfterDrag: (state, action: PayloadAction<TaskPayload>) => {
      const allTasks = ls.get(ALL_TASKS)

      if (allTasks && action.payload.columnTasks) {
        allTasks.todo = action.payload.columnTasks
        state.todo = action.payload.columnTasks
        ls.updateColumns(allTasks)
      }
    },

    transfer: (state, action: PayloadAction<TaskPayload>) => {
      const { from, where, data } = action.payload
      const allTasks = ls.get(ALL_TASKS)

      if (from && where && data && allTasks) {
        const filtered = state[from].filter((el) => el.id !== data.id)
        state[from] = filtered
        state[where].push(data)

        allTasks[from] = filtered
        allTasks[where] = state[where]

        ls.updateColumns(allTasks)
      }
    },
  },
})

export const { add, remove, getTasksFromLS, updateAfterDrag, transfer } = tasksSlice.actions

export default tasksSlice.reducer
