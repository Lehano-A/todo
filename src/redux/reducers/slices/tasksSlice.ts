import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TODO_COLUMN_NAME } from '../../../constants'
import { EditTaskPayload, RemoveTaskPayload, TransferTaskPayload } from '../../types/payloads/tasksPayload.types'
import { TasksState } from '../../types/slices/tasksSlice.types'

export const defaultTasks = {
  todo: [],
  inProcess: [],
  done: [],
}

const initialState: TasksState = defaultTasks

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // инициализировать задачи при запуске приложения
    initialTasks: (state, action) => {
      const { allTasks } = action.payload
      const { todo, inProcess, done } = allTasks
      state.todo = todo
      state.inProcess = inProcess
      state.done = done
    },

    // добавить новую задачу
    addNewTask: (state, action) => {
      state[TODO_COLUMN_NAME].push(action.payload)
    },

    // удалить задачу
    removeTask: (state, action: PayloadAction<RemoveTaskPayload>) => {
      const { columnName, id } = action.payload

      if (columnName) {
        const filtered = state[columnName].filter((task) => task.id !== id)

        state[columnName] = filtered
      }
    },

    // переместить задачу в другую колонку
    transferTask: (state, action: PayloadAction<TransferTaskPayload>) => {
      const { columnFrom, columnWhere, idPlaceFrom, idPlaceWhere } = action.payload
      const elFrom = state[columnFrom][idPlaceFrom]

      state[columnFrom].splice(idPlaceFrom, 1) // удаляем переносимый элемент
      state[columnWhere].splice(idPlaceWhere, 0, elFrom) //
    },

    // редактировать задачу
    editTask: (state, action: PayloadAction<EditTaskPayload>) => {
      const { columnName, newData, id } = action.payload

      const updatedColumn = state[columnName].map((task) => {
        if (task.id === id) {
          task = newData
        }

        return task
      })

      state[columnName] = updatedColumn
    },
  },
})

export const { addNewTask, removeTask, initialTasks, transferTask, editTask } = tasksSlice.actions

export default tasksSlice.reducer
