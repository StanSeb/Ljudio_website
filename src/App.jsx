import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import MySearch from './components/MySearch'
import MyResults from './components/MyResults'

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
        <div id="player-container">
          <h1>Search and play a song to get access to player controls</h1>
        </div>
      </footer>
    </Router>
  )
}

export default App
