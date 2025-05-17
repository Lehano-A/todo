import ls from '../../utils/localStorage'
import { initialDataTasks } from '../../vendor/initialDataTasks'
import { initialTasks } from '../reducers/slices/tasksSlice'
import { AppDispatch } from '../store'

// инициализация задач при запуске приложения
export const initialTasksThunk = () => (dispatch: AppDispatch) => {
  const data = ls.getAllTasks()

  if (data) {
    dispatch(initialTasks({ allTasks: data }))
  } else {
    dispatch(initialTasks({ allTasks: initialDataTasks }))
    ls.saveTasks(initialDataTasks)
  }
}
