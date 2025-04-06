import { combineReducers } from '@reduxjs/toolkit'

import formAddTaskSlice from './slices/formAddTaskSlice'
import todoTasksSlice from './slices/todoTasksSlice'

const rootReducer = combineReducers({ todoTasks: todoTasksSlice, formAddTask: formAddTaskSlice })

export default rootReducer
