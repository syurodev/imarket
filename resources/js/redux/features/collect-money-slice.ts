import { CollectMoney } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: CollectMoney[]
}

const initialState: InitialState = {
  value: []
}

export const collectMoney = createSlice({
  name: "collectMoney",
  initialState,
  reducers: {
    setCollectMoney: (state, action: PayloadAction<CollectMoney[]>) => {
      return {
        value: action.payload
      }
    },
  }
})

export const { setCollectMoney } = collectMoney.actions
export default collectMoney.reducer