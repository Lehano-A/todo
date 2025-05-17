import { Middleware } from '@reduxjs/toolkit'

import ls from '../../utils/localStorage'
import { isAction } from '../types/actions/actions.types'

const actionsWithSaveToLS = ['tasks/transferTask', 'tasks/addNewTask', 'tasks/removeTask', 'tasks/editTask']

// сохранить задачи в localStorage
export const saveTasksToLSMiddleware: Middleware = (store) => (next) => (action) => {
  // проверяем тип action
  if (isAction(action)) {
    // проверяем экшены, после которых нужно сохранить данные в LS
    if (actionsWithSaveToLS.includes(action.type)) {
      if (process.env.NODE_ENV === 'development') {
        showInConsole(action)
      }

      const result = next(action) // сначала пропускаем экшен через редьюсеры
      ls.saveTasks(store.getState().tasks)

      return result
    }
  }

  // сюда доходят экшены, для которых не нужна дополнительная логика
  return next(action)
}

function showInConsole(action: unknown) {
  console.group('middleware => Сохраняем в localStorage:')
  console.log('action: ', action)
  console.groupEnd()
}
