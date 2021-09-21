import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import Player from "./Player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'

function Playlist(props) {

    const playlistApi = 'https://yt-music-api.herokuapp.com/api/yt/playlist/'

    const [playlistObject, setPlaylistObject] = useState([])
    const [playlistResults, setPlaylistResults] = useState([])
    const [thumbnail, setThumbnail] = useState([])

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    let chosenVideoId = ''
    let chosenName = ''
    let chosenPlaylistId = ''

    async function getPlaylist() {
        try {
            const response = await fetch(playlistApi + params.id)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)

            let thumbnailArray = []
            let playlistArray = []

            for (let i = 0; i < dataObject.thumbnails.length; i++) {
                thumbnailArray.push(dataObject.thumbnails[i])
            }

            for (let i = 0; i < dataObject.content.length; i++) {
                playlistArray.push(dataObject.content[i])
            }

            setPlaylistObject(dataObject)
            setPlaylistResults(playlistArray)
            setThumbnail(thumbnailArray.pop().url)

        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPlaylist()
    }, [])

    function getVideoId(item) {
        chosenVideoId = item.videoId
        chosenName = item.name
        return render(<Player chosenVideo={chosenVideoId} title={chosenName}/>, document.getElementById('player-container'))
    }

    function getPlaylistId(id) {
        chosenPlaylistId = id
        return render(<Player chosenPlaylist={id} />, document.getElementById('player-container'))
    }

    function fetchLink() {

        navigator.clipboard.writeText('')
        navigator.clipboard.writeText(window.location.href)
        alert("The link has been copied to you clipboard!")
    }


    return (
        <div id="playlist-container">
            <h2 style={{ textTransform: 'uppercase' }}>{playlistObject.title}'s info page</h2>
            <div id="playlist-text-image">
                <img src={thumbnail} alt="" />
                <div id="playlist-text">
                    <p>Number of tracks: {playlistObject.trackCount}</p>
                    <p>{playlistObject.dateYear}</p>
                </div>
            </div>
            <div id="play-share">
                <i id="song-btn" type="submit" onClick={() => { getPlaylistId(params.id.substring(2)) }}><FontAwesomeIcon icon={faPlayCircle} size='4x' /></i>
                <i alt="Share" onClick={fetchLink}> <FontAwesomeIcon icon={faShare} size='3x' /></i>
            </div>
            <div id="result-li-container">
                <div id="playlist-songs">
                    <ul>
                        {playlistResults.map((song, index) => (
                            <li key={index}>
                                <p>{song.name}</p>
                                <i id="song-btn" type="submit" onClick={() => { getVideoId(song) }}><FontAwesomeIcon icon={faPlayCircle} size='2x' /></i>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Playlist