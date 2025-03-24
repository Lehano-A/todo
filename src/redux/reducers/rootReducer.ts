import { combineReducers } from '@reduxjs/toolkit'

import formAddTaskSlice from './slices/formAddTaskSlice'

const rootReducer = combineReducers({ formAddTask: formAddTaskSlice })

export default rootReducer
