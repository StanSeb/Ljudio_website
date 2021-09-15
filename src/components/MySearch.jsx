import React, { useState } from "react";
import { render } from "react-dom";
import Player from "./Player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

function MySearch() {

    const heroApi = 'https://yt-music-api.herokuapp.com/api/yt/search/'

    const [searchTerm, setSearchTerm] = useState('')
    const [albumResults, setAlbumResults] = useState([])
    const [artistResults, setArtistResults] = useState([])
    const [songResults, setSongResults] = useState([])
    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

    let chosenVideoId = '';

    async function fetchData() {
        try {
            const response = await fetch(heroApi + searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let albumArray = []
            let artistArray = []
            let songArray = []



            for (let i = 0; i < dataContent.length; i++) {
                if (dataContent[i].type == 'album') {
                    albumArray.push(dataContent[i])
                }
                else if (dataContent[i].type == 'artist') {
                    artistArray.push(dataContent[i])
                }
                else if (dataContent[i].type == 'video') {
                    songArray.push(dataContent[i])
                }
                else {
                    console.log('Nothing else matters...')
                }
            }

            setAlbumResults(albumArray)
            setArtistResults(artistArray)
            setSongResults(songArray)

        } catch (e) {
            console.error(e)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetchData()
        //console.log(searchResults)
    }

    function getVideoId(id) {
        chosenVideoId = id
        console.log(chosenVideoId)

        return render(<Player chosenVideoId={id} />, document.getElementById('player-container'))
    }

   

    return (
        <div id="search-and-results-container">
            <div id="search-container">
                <form onSubmit={handleSubmit}>
                    <div id="input-container">
                        <input type="text" value={searchTerm} onChange={handleChange} />
                        <button type="submit">
                        <FontAwesomeIcon icon={faSearch} size='2x' />
                        </button>
                    </div>
                </form>
            </div>
            <div id="result-container">
                <ul>
                    <h2>Albums</h2>
                    {albumResults.map((item, index) => (
                        <li key={index}>
                            <img id="album-image" src={item.thumbnails[0].url} alt="" />                            
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
                <ul>
                    <h2>Artists</h2>
                    {artistResults.map((item, index) => (
                        <li key={index}>
                            <img id="artist-image" src={item.thumbnails[0].url} alt="" />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
                <ul>
                    <h2>Songs</h2>
                    {songResults.map((item, index) => (
                        <li key={index}>
                            <img id="song-image" src={item.thumbnails.url} alt="" />
                            <p>{item.name}</p>
                            <button id="song-btn" type="submit" onClick={() => { getVideoId(item.videoId) }}><FontAwesomeIcon icon={faPlayCircle} size='2x' /></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MySearch