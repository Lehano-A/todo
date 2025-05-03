import { combineReducers } from '@reduxjs/toolkit'

import dndSlice from './slices/dndSlice'
import formNewTaskSlice from './slices/formNewTaskSlice'
import tasksSlice from './slices/tasksSlice'

const rootReducer = combineReducers({
  formNewTask: formNewTaskSlice,
  tasks: tasksSlice,
  dnd: dndSlice,
})

export default rootReducer
