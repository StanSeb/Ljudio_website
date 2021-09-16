import React from "react";
import { render } from "react-dom";
import Player from "./Player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

function MyResults(props) {

    let chosenVideoId = '';

    let playlistUrl = "https://music.youtube.com/playlist?list="
    let artistUrl = "https://music.youtube.com/channel/"
    let songUrl = "https://www.youtube.com/watch?v="

    function getVideoId(id) {
        chosenVideoId = id
        console.log(chosenVideoId)

        return render(<Player chosenVideo={id} />, document.getElementById('player-container'))
    }

    function fetchLink(url){
        navigator.clipboard.writeText(url)
        alert("The link has been copied to you clipboard!")
    }

    return <>
        <ul>
            <h2>Albums</h2>
            {props.albumResults.map((item, index) => (
                <li key={index}>
                    <div id="result-li-container" onClick={() => fetchLink(playlistUrl + item.playlistId)}>
                        <img id="album-image" src={item.thumbnails[0].url} alt="" />
                        <div id="albumText">
                            <h4>Name</h4>
                            <p>{item.name}</p>
                            <h4>Artist</h4>
                            <p>{item.artist}</p>
                            <h4>Release year</h4>
                            <p>{item.year}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        <ul>
            <h2>Artists</h2>
            {props.artistResults.map((item, index) => (
                <li key={index}>
                    <div id="result-li-container" onClick={() => fetchLink(artistUrl + item.browseId)}>
                        <img id="artist-image" src={item.thumbnails[0].url} alt="" />
                        <p>{item.name}</p>
                    </div>
                </li>
            ))}
        </ul>
        <ul>
            <h2>Songs</h2>
            {props.songResults.map((item, index) => (
                <li key={index}>
                    <div id="result-li-container" onClick={() => fetchLink(songUrl + item.videoId)}>
                        <img id="song-image" src={item.thumbnails[0].url} alt="" />
                        <p>{item.name}</p>
                    </div>
                        <button id="song-btn" type="submit" onClick={() => { getVideoId(item.videoId) }}><FontAwesomeIcon icon={faPlayCircle} size='2x' /></button>
                </li>
            ))}
        </ul>
    </>
}

export default MyResults