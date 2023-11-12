import { ICustomers } from "@/interfaces/Customer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: ICustomers[]
}

const initialState: InitialState = {
  value: []
}

export const customers = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<ICustomers[]>) => {
      return {
        value: action.payload
      }
    },
    pushCustomer: (state, action: PayloadAction<ICustomers>) => {
      state.value.push(action.payload)
    },
  }
})

export const { setCustomers, pushCustomer } = customers.actions
export default customers.reducer