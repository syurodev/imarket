import { MonthTable } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: MonthTable[]
}

const initialState: InitialState = {
  value: []
}

export const monthTable = createSlice({
  name: "monthTable",
  initialState,
  reducers: {
    setMonthTable: (state, action: PayloadAction<MonthTable[]>) => {
      return {
        value: action.payload
      }
    },
    pushMonthTableItem: (state, action: PayloadAction<MonthTable>) => {
      state.value.push(action.payload)
    },
  }
})

export const { setMonthTable, pushMonthTableItem } = monthTable.actions
export default monthTable.reducer