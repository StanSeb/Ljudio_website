import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { useHistory } from 'react-router-dom'

import Player from "./Player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

function MyResults(props) {

    let chosenVideoId = ''
    let chosenName = ''
    let chosenPlaylistId = ''
    let propsSearchTerm = props.location.state.searchTerm

    const history = useHistory()

    const heroApi = 'https://yt-music-api.herokuapp.com/api/yt/search/'

    const [albumResults, setAlbumResults] = useState([])
    const [artistResults, setArtistResults] = useState([])
    const [songResults, setSongResults] = useState([])
    const [playlistResults, setPlaylistResults] = useState([])

    async function fetchData() {

        try {
            const response = await fetch(heroApi + propsSearchTerm)
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
                else if (dataContent[i].type.includes('playlist')) {
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

        } catch (e) {
            console.error(e)
        }
    }

    // With [] at the end meaning it only does it ones
    useEffect(() => {
        fetchData()
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

    function checkThumbnailsForArrayOrObject(thumbnails) {
        if (Object.prototype.toString.call(thumbnails) === '[object Array]') {
            return thumbnails[0].url
        } else {
            return thumbnails.url
        }
    }

    function goToArtists() {
        history.push({
            pathname: '/artists/' + propsSearchTerm,
            state: {
                searchTerm: propsSearchTerm,
            }
        })
    }

    function goToSongs() {
        history.push({
            pathname: '/songs/' + propsSearchTerm,
            state: {
                searchTerm: propsSearchTerm,
            }
        })
    }

    function goToPlaylists() {
        history.push({
            pathname: '/playlists/' + propsSearchTerm,
            state: {
                searchTerm: propsSearchTerm,
            }
        })
    }

    function goToAlbums() {
        history.push({
            pathname: '/albums/' + propsSearchTerm,
            state: {
                searchTerm: propsSearchTerm,
            }
        })
    }

    return <>
        <div id="result-container">
            <h2>Top hits</h2>
            <div id="result-ul-list">
                {artistResults[0] != null &&
                    <ul>
                        <div id="topic-more-container">
                            <h3>Artists</h3>
                            <p onClick={goToArtists}>More &gt;</p>
                        </div>
                        <li>
                            <div id="hover-li-container" onClick={() => {
                            history.push({
                                pathname: '/artist/' + artistResults[0].browseId,
                                state: {
                                    id: artistResults[0].browseId,
                                }
                            })
                        }}>
                                <img id="artist-image" src={artistResults[0].thumbnails[0].url} alt="" />
                                <p>{artistResults[0].name}</p>
                            </div>
                        </li>

                    </ul>
                }
                <ul>
                    <div id="topic-more-container">
                        <h3>Songs</h3>
                        <p onClick={goToSongs}>More &gt;</p>
                    </div>
                    {songResults.slice(0, 2).map((item, index) => (
                        <li key={index}>
                            <div id="result-li-container">
                                <img id="song-image" src={checkThumbnailsForArrayOrObject(item.thumbnails)} alt="" />
                                <p>{item.name}</p>
                            </div>
                            <i id="song-btn" type="submit" onClick={() => { getVideoId(item) }}><FontAwesomeIcon icon={faPlayCircle} size='2x' /></i>
                        </li>
                    ))}
                </ul>
                <ul>
                    {albumResults.length != 0 &&
                        <div id="topic-more-container">
                            <h3>Albums</h3>
                            <p onClick={goToAlbums}>More &gt;</p>
                        </div>
                    }
                    {albumResults.slice(0, 2).map((item, index) => (
                        <li key={index}>
                            <div id="result-li-container">
                                <img id="album-image" src={checkThumbnailsForArrayOrObject(item.thumbnails)} alt="" />
                                <p>{item.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <ul>
                    <div id="topic-more-container">
                        <h3>Playlists</h3>
                        <p onClick={goToPlaylists}>More &gt;</p>
                    </div>
                    {playlistResults.slice(0, 2).map((item, index) => (
                        <li key={index}>
                            <div id="hover-li-container" onClick={() => {
                            history.push({
                                pathname: '/playlist/' + item.browseId,
                                state: {
                                    id: item.browseId,
                                }
                            })
                        }}>
                                <img id="playlist-image" src={checkThumbnailsForArrayOrObject(item.thumbnails)} alt="" />
                                <p>{item.title}</p>
                            </div>
                            <i id="song-btn" type="submit" onClick={() => { getPlaylistId(item.browseId.substring(2)) }}><FontAwesomeIcon icon={faPlayCircle} size='2x' /></i>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    </>
}

export default MyResults