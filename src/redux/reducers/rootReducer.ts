import { combineReducers } from '@reduxjs/toolkit'

import formNewTaskSlice from './slices/formNewTaskSlice'
import tasksSlice from './slices/tasksSlice'

const rootReducer = combineReducers({
  formNewTask: formNewTaskSlice,
  tasks: tasksSlice,
})

export default rootReducer
