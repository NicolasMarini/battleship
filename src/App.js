import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import "./App.css"
import Board from "./components/Board"
import main from "./reducers/main"
import { selectShip } from "./actions/actions"
// import {selectShip} from "./actions/actions"
import { useDispatch, useSelector } from "react-redux"

const store = createStore(main)

function App() {
  console.log("initial state: ", store.getState())

  return (
    <Provider store={store}>
      <div>
        <Board playerId="player1" />

        <Board playerId="cpu" />
      </div>
    </Provider>
  )
}

export default App
