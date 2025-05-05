import { configureStore } from '@reduxjs/toolkit'

import { saveTasksToLSMiddleware } from './middlewares/saveTasksToLSMiddleware'
import rootReducer from './reducers/rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveTasksToLSMiddleware),
})

export default store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
