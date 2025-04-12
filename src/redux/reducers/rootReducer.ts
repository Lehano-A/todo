import { combineReducers } from '@reduxjs/toolkit'

import formAddTaskSlice from './slices/formAddTaskSlice'
import tasksSlice from './slices/tasksSlice'

const rootReducer = combineReducers({
  formAddTask: formAddTaskSlice,
  tasks: tasksSlice,
})

export default rootReducer
