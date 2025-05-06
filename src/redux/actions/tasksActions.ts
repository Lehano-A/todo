import ls from '../../utils/localStorage'
import { defaultTasks, initialTasks } from '../reducers/slices/tasksSlice'
import { AppDispatch } from '../store'

// инициализация задач при запуске приложения
export const initialTasksThunk = () => (dispatch: AppDispatch) => {
  const data = ls.getAllTasks()

  dispatch(initialTasks({ allTasks: data ? data : defaultTasks }))
}
