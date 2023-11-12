import { ReactNode } from "react"
import { store } from "@/redux/store"
import { Provider } from "react-redux"

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}