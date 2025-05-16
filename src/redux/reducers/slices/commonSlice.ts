import { createSlice } from '@reduxjs/toolkit'

interface CommonState {
  didWindowResize: number
}

const initialState: CommonState = {
  didWindowResize: 0,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setFactWindowResize: (state) => {
      state.didWindowResize += 1
    },
  },
})

export const { setFactWindowResize } = commonSlice.actions

export default commonSlice.reducer
