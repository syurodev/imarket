import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"

import customerReducer from "./features/customers-slice"
import mainReducer from "./features/main-slice"

export const store = configureStore({
  reducer: {
    customerReducer,
    mainReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector