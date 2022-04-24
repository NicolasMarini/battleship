import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route, Link } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import "./App.css"
import Board from "./components/Board"
import main from "./reducers/main"
import { selectShip } from "./actions/actions"
// import {selectShip} from "./actions/actions"
import { useDispatch, useSelector } from "react-redux"
import StartScreen from "./screens/StartScreen"
import GameScreen from "./screens/GameScreen"

const store = createStore(main)

function App() {
  console.log("initial state: ", store.getState())

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/game" element={<GameScreen />} />
        </Routes>

        {/* <div>
          <Board playerId="player1" />

          <Board playerId="cpu" />
        </div> */}
      </BrowserRouter>
    </Provider>
  )
}

export default App
