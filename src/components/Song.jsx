import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import Player from "./Player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

function Song(props) {

    const songApi = 'https://yt-music-api.herokuapp.com/api/yt/songs/'

    const [songObject, setSongObject] = useState([])
    const [thumbnail, setThumbnail] = useState([])
    const [songArtist, setSongArtist] = useState('')
    const [songAlbum, setSongAlbum] = useState('')
    const [songDuration, setSongDuration] = useState('')

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    async function getSong() {
        try {
            const response = await fetch(songApi + params.id)
            const data = await response.json()
            // data = JSON string
            // undefined = all objects are included in the resulting JSON string
            // 4 = inserts white space into the output JSON string for easier reading
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)

            setSongObject(dataObject.content[0])
            setThumbnail(dataObject.content[0].thumbnails.pop().url)
            setSongArtist(dataObject.content[0].artist.name)
            setSongAlbum(dataObject.content[0].album.name)

            let songMilli = dataObject.content[0].duration
            let songMinutes = Math.floor(songMilli / 60000)
            let songSeconds = ((songMilli % 60000) / 1000).toFixed(0)

            setSongDuration(songMinutes + 'm ' + songSeconds + 's')

        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getSong()
    }, [])

    function getVideoId(videoId) {
        return render(<Player chosenVideo={videoId} />, document.getElementById('player-container'))
    }

    function fetchLink() {

        navigator.clipboard.writeText('')
        navigator.clipboard.writeText(window.location.href)
        alert("The link has been copied to you clipboard!")
    }

    return (
        <div id="song-container">
            <h2 style={{ textTransform: 'uppercase' }}>{songObject.name}</h2>
            <div id="result-li-container">
                <div id="song-image">
                    <img src={thumbnail} alt="" />
                </div>
                <div id="song-text">
                    <h4>Artist</h4>
                    <p>{songArtist}</p>
                    <h4>Album</h4>
                    <p>{songAlbum}</p>
                    <h4>Duration</h4>
                    <p>{songDuration}</p>
                </div>
            </div>
            <div id="play-share">
                <i id="song-btn" type="submit" onClick={() => { getVideoId(songObject.videoId) }}><FontAwesomeIcon icon={faPlayCircle} size='4x' /></i>
                <i alt="Share" onClick={fetchLink}> <FontAwesomeIcon icon={faShare} size='3x' /></i>
            </div>
        </div >
    )
}

export default Song