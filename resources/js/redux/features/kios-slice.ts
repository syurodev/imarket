import { IKios } from "@/interfaces/Kios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: IKios[]
}

const initialState: InitialState = {
  value: []
}

export const kios = createSlice({
  name: "kios",
  initialState,
  reducers: {
    setKios: (state, action: PayloadAction<IKios[]>) => {
      return {
        value: action.payload
      }
    },
    pushKios: (state, action: PayloadAction<IKios>) => {
      state.value.push(action.payload)
    },
  }
})

export const { setKios, pushKios } = kios.actions
export default kios.reducer