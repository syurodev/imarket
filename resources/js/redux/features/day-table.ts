import { DayTable } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: DayTable[]
}

const initialState: InitialState = {
  value: []
}

export const dayTable = createSlice({
  name: "dayTable",
  initialState,
  reducers: {
    setDayTable: (state, action: PayloadAction<DayTable[]>) => {
      return {
        value: action.payload
      }
    },
    pushDayTableItem: (state, action: PayloadAction<DayTable>) => {
      state.value.push(action.payload)
    },
  }
})

export const { setDayTable, pushDayTableItem } = dayTable.actions
export default dayTable.reducer