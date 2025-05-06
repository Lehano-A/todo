import { PayloadAction } from '@reduxjs/toolkit'

export interface SaveTasksToLSPayloadAction {
  type: string
  payload: {
    [key: string]: any
  }
}

// проверка action для мидлвэра
export function isAction(action: unknown): action is PayloadAction {
  return typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string'
}
