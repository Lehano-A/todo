import { createSlice } from '@reduxjs/toolkit'

interface DndState {
  wasDrop: boolean | null
}

const initialState: DndState = {
  wasDrop: null,
}

const dndSlice = createSlice({
  name: 'dnd',
  initialState,
  reducers: {
    enableDrop: (state) => {
      state.wasDrop = true
    },
    disableDrop: (state) => {
      state.wasDrop = false
    },
  },
})

export const { enableDrop, disableDrop } = dndSlice.actions

export default dndSlice.reducer
