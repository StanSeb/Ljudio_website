import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import Player from "./Player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

function Songs(props) {

    const songApi = 'https://yt-music-api.herokuapp.com/api/yt/songs/'

    const [songResults, setSongResults] = useState([])

    let chosenVideoId = '';

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    async function getSongs() {
        try {
            const response = await fetch(songApi + params.searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let songArray = []

            for (let i = 0; i < dataContent.length; i++) {
                songArray.push(dataContent[i])
            }

            setSongResults(songArray)

        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getSongs()
    }, [])

    function getVideoId(id) {
        chosenVideoId = id
        return render(<Player chosenVideo={id} />, document.getElementById('player-container'))
    }

    return <>
        <div id="songs-container">
            <ul>
                <h2 style={{textTransform: 'uppercase'}}>Songs with {params.searchTerm}</h2>
                {songResults.map((item, index) => (
                    <li key={index}>
                        <div id="result-li-container">
                            <img id="songs-image" src={item.thumbnails[0].url} alt="" />
                            <div id="songs-text">
                                <h4>Name</h4>
                                <p>{item.name}</p>
                                <h4>Artist</h4>
                                <p>{item.artist.name}</p>
                            </div>
                        </div>
                        <i id="song-btn" type="submit" onClick={() => { getVideoId(item.videoId) }}><FontAwesomeIcon icon={faPlayCircle} size='2x' /></i>
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default Songs