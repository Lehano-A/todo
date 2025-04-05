import { createSlice } from '@reduxjs/toolkit'

import { TaskType } from '../../../components/Main/Task/task.type'
import { TODO_TASKS } from '../../../constants'
import ls from '../../../utils/localStorage'

interface TodoState {
  tasks: TaskType[]
}

const initialState: TodoState = {
  tasks: [],
}

const todoTasksSlice = createSlice({
  name: 'todoTasks',
  initialState,
  reducers: {
    addNewTaskInToDo: (state, action) => {
      state.tasks.push(action.payload)
    },

    removeTaskFromToDo: (state, action) => {
      const filtered = state.tasks.filter((task) => task.id !== action.payload)

      state.tasks = filtered
    },

    getToDoTasksFromLS: (state) => {
      const tasks = ls.get(TODO_TASKS)
      if (Array.isArray(tasks)) {
        state.tasks = tasks
      }
    },
  },
})

export const { addNewTaskInToDo, removeTaskFromToDo, getToDoTasksFromLS } = todoTasksSlice.actions

export default todoTasksSlice.reducer
