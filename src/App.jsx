import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import MySearch from './components/MySearch'
import MyResults from './components/MyResults'
import Artists from './components/Artists'
import Albums from './components/Albums'
import Songs from './components/Songs'
import Playlists from './components/Playlists'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function App() {

  return (
    <Router>
      <nav>
        <i onClick={() => history.back()}><FontAwesomeIcon icon={faArrowLeft} size='2x' /></i>                
        <h1>Ljudio</h1>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <MySearch />
          </Route>
          <Route exact path="/results/:searchTerm" component={MyResults} />
          <Route exact path="/artists/:searchTerm" component={Artists} />
          <Route exact path="/albums/:searchTerm" component={Albums} />
          <Route exact path="/songs/:searchTerm" component={Songs} />
          <Route exact path="/playlists/:searchTerm" component={Playlists} />
        </Switch>
      </main>
      <footer>
        <div id="player-container">
          <h1>Search and play a song/playlist<br /> to get access to player controls</h1>
        </div>
      </footer>
    </Router>
  )
}

export default App
