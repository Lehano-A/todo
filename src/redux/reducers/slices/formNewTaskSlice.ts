import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActive: false,
}

const formNewTaskSlice = createSlice({
  name: 'formNewTask',
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

export const { activateForm, deactivateForm } = formNewTaskSlice.actions

export default formNewTaskSlice.reducer
