import { createSlice } from '@reduxjs/toolkit'

//create a state handler
export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ""
  },
  reducers: {
    // add new note
    addToken: (state,action) => {
      state.value = action.payload
    },
    deleteToken:(state) => {
      state.value = ""
    },

  }
})

// Action creators are generated for each case reducer function
export const { addToken,deleteToken } = tokenSlice.actions

export default tokenSlice.reducer