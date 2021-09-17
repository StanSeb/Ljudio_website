import React, { useState } from "react";
import { render } from "react-dom";

import MyResults from "./MyResults";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function MySearch() {

    const heroApi = 'https://yt-music-api.herokuapp.com/api/yt/search/'

    const [searchTerm, setSearchTerm] = useState('')
    const [albumResults, setAlbumResults] = useState([])
    const [artistResults, setArtistResults] = useState([])
    const [songResults, setSongResults] = useState([])
    const [playlistResults, setPlaylistResults] = useState([])
    const [showResults, setShowresults] = useState(false)

    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

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
            let playlistArray = []

            for (let i = 0; i < dataContent.length; i++) {

                if (dataContent[i].type == 'album') {
                    albumArray.push(dataContent[i])
                }
                else if (dataContent[i].type == 'artist') {
                    artistArray.push(dataContent[i])
                }
                else if (dataContent[i].type == 'song') {
                    songArray.push(dataContent[i])
                }
                else if (dataContent[i].type.includes('playlist')){
                    playlistArray.push(dataContent[i])
                }
                else {
                    console.log('Nothing else matters...')
                }
            }

            setAlbumResults(albumArray)
            setArtistResults(artistArray)
            setSongResults(songArray)
            setPlaylistResults(playlistArray)
            setShowresults(true)

        } catch (e) {
            console.error(e)
        }

    }


    function handleSubmit(e) {
        e.preventDefault()
        fetchData()

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
            <div id="result-container" style={{display: showResults ? 'flex' : 'none' }}>
                <MyResults albumResults={albumResults} artistResults={artistResults} songResults={songResults} playlistResults={playlistResults} />
            </div>
        </div>
    )
}

export default MySearch