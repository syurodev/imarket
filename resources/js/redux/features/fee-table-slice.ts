import { IFeeTable } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: IFeeTable[]
}

const initialState: InitialState = {
  value: []
}

export const feeTable = createSlice({
  name: "feeTable",
  initialState,
  reducers: {
    setFeeTable: (state, action: PayloadAction<IFeeTable[]>) => {
      return {
        value: action.payload
      }
    },
    pushCustomer: (state, action: PayloadAction<IFeeTable>) => {
      state.value.push(action.payload)
    },
  }
})

export const { setFeeTable, pushCustomer } = feeTable.actions
export default feeTable.reducer