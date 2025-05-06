import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { defaultFormValues } from '../../../components/common/FormTask/FormTask'
import { DIALOG_ADD_NEW_TASK } from '../../../constants'
import { DialogClosePayload, DialogOpenPayload } from '../../types/payloads/dialogsPayload.types'
import { DialogsState } from '../../types/slices/dialogsSlice.types'

const initialState: DialogsState = {
  dialogAddNewTask: { isActive: false, data: defaultFormValues },

  dialogEditTask: {
    isActive: false,
    columnName: null,
    data: defaultFormValues,
  },

  dialogRemoveTask: {
    isActive: false,
    columnName: null,
    data: defaultFormValues,
  },
}

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogOpenPayload>) => {
      const { dialogName, columnName = null, data = null } = action.payload

      state[dialogName].isActive = true

      if (data) {
        state[dialogName].data = data
      }

      // если это диалоги - 'editTask' и 'removeTask'
      if (dialogName !== DIALOG_ADD_NEW_TASK && columnName) {
        state[dialogName].columnName = columnName
      }
    },

    closeDialog: (state, action: PayloadAction<DialogClosePayload>) => {
      const { dialogName } = action.payload

      state[dialogName].isActive = false
      state[dialogName].data = defaultFormValues
    },
  },
})

export const { openDialog, closeDialog } = dialogsSlice.actions

export default dialogsSlice.reducer
