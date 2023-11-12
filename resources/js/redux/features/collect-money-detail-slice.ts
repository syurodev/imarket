import { ThuNo } from "@/interfaces/CollectMoney"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  value: ThuNo | null
}

const initialState: InitialState = {
  value: null
}

export const collectMoneyDetail = createSlice({
  name: "collectMoneyDetail",
  initialState,
  reducers: {
    setCollectMoneyDetail: (state, action: PayloadAction<ThuNo>) => {
      return {
        value: action.payload
      }
    },
  }
})

export const { setCollectMoneyDetail } = collectMoneyDetail.actions
export default collectMoneyDetail.reducer