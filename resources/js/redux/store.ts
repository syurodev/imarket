import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"

import collectMoneyReducer from "./features/collect-money-slice"
import collectMoneyDetailReducer from "./features/collect-money-detail-slice"
import kiosReducer from "./features/kios-slice"
import customersReducer from "./features/customers-slice"
import feeTableReducer from "./features/fee-table-slice"
import monthTableReducer from "./features/month-table"
import dayTableReducer from "./features/day-table"
import mainReducer from "./features/main-slice"

export const store = configureStore({
  reducer: {
    collectMoneyReducer,
    collectMoneyDetailReducer,
    kiosReducer,
    customersReducer,
    feeTableReducer,
    monthTableReducer,
    dayTableReducer,
    mainReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector