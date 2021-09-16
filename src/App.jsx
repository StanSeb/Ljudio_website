import React from 'react'
import MySearch from './components/MySearch'

import {
  BrowserRouter as Router,
  Switch,
  Route,
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
        <div id="player-container">
          <h1>Search and play a song to get access to player controls</h1>
        </div>
      </footer>
    </Router>
  )
}

export default App
