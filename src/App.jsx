import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import MySearch from './components/MySearch'
import MyResults from './components/MyResults'
import Artists from './components/Artists'
import Albums from './components/Albums'
import Songs from './components/Songs'
import Playlists from './components/Playlists'
import Artist from './components/Artist'
import Playlist from './components/Playlist'
import Song from './components/Song'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function App() {

  return (
    <Router>
      <nav>
        <i onClick={() => history.back()}><FontAwesomeIcon icon={faArrowLeft} size='2x' /></i>                
        <Link to="/" id="nav-logo">Ljudio</Link>
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
          <Route exact path="/artist/:id" component={Artist} />
          <Route exact path="/playlist/:id" component={Playlist} />
          <Route exact path="/song/:id" component={Song} />
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
