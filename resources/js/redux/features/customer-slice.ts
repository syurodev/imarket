import { CustomerTable } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: CustomerTable[]
}

const initialState: InitialState = {
  value: []
}

export const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<CustomerTable[]>) => {
      return {
        value: action.payload
      }
    },
  }
})

export const { setCustomers } = customer.actions
export default customer.reducer