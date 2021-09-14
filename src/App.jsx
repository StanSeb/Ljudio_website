import React, { useState } from 'react'
import MySearch from './components/MySearch'

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
        <Link to="/">Home</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <h1>Ljudio</h1>
              <MySearch />
          </Route>
        </Switch>
      </main>

    </Router>
  )
}

export default App
