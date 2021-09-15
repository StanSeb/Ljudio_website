import React from 'react'
import MySearch from './components/MySearch'
import PlayerWindow from './components/PlayerWindow'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


function App() {


  return (
    <Router>
      <nav>
        <h1>Ljudio</h1>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <MySearch />
          </Route>
        </Switch>
      </main>
      <footer>
            <PlayerWindow />
      </footer>
    </Router>
  )
}

export default App
