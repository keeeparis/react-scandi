import { createSlice } from '@reduxjs/toolkit'

interface modalSliceProps {
  isModal: boolean
}

const initialState: modalSliceProps = {
  isModal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggle(state) {
      state.isModal = !state.isModal
    },
    close(state) {
      state.isModal = false
    },
  },
})

export const { toggle, close } = modalSlice.actions

export default modalSlice.reducer
