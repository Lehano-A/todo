import { ColumnName } from '../../../../../redux/reducers/slices/tasksSlice'

export function getOppositeColumnNames(currentColumnLocation: ColumnName) {
  if (currentColumnLocation === 'todo') {
    return [
      { id: 'inProcess', name: 'В процессе' },
      { id: 'done', name: 'Завершены' },
    ]
  }

  if (currentColumnLocation === 'inProcess') {
    return [
      { id: 'todo', name: 'Сделать' },
      { id: 'done', name: 'Завершены' },
    ]
  }

  if (currentColumnLocation === 'done') {
    return [
      { id: 'todo', name: 'Сделать' },
      { id: 'inProcess', name: 'В процессе' },
    ]
  }

  return []
}
