import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActive: false,
}

const formAddTaskSlice = createSlice({
  name: 'formAddTask',
  initialState,
  reducers: {
    activateForm: (state) => {
      state.isActive = true
    },

    deactivateForm: (state) => {
      state.isActive = false
    },
  },
})

export const { activateForm, deactivateForm } = formAddTaskSlice.actions

export default formAddTaskSlice.reducer
