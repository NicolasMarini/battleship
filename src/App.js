import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import "./App.css"
import Board from "./components/Board"
import main from "./reducers/main"

const store = createStore(main)

function App() {
  console.log("initial state: ", store.getState())

  return (
    <Provider store={store}>
      <div>
        <Board />
      </div>
    </Provider>
  )
}

export default App
