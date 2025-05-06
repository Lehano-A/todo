import { combineReducers } from '@reduxjs/toolkit'

import dialogsSlice from './slices/dialogsSlice'
import dndSlice from './slices/dndSlice'
import tasksSlice from './slices/tasksSlice'

const rootReducer = combineReducers({
  tasks: tasksSlice,
  dnd: dndSlice,
  dialogs: dialogsSlice,
})

export default rootReducer
