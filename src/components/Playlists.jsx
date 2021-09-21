import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

function Playlists(props) {

    const playlistsApi = 'https://yt-music-api.herokuapp.com/api/yt/playlists/'

    const [playlistsResults, setPlaylistsResults] = useState([])

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    const history = useHistory()

    async function getPlaylists() {
        try {
            const response = await fetch(playlistsApi + params.searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let playlistsArray = []

            for (let i = 0; i < dataContent.length; i++) {
                playlistsArray.push(dataContent[i])
            }

            setPlaylistsResults(playlistsArray)

        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPlaylists()
    }, [])

    function checkThumbnailsForArrayOrObject(thumbnails) {
        if (Object.prototype.toString.call(thumbnails) === '[object Array]') {
            return thumbnails[0].url
        } else {
            return thumbnails.url
        }
    }


    return <>
        <div id="playlists-container">
            <ul>
                <h2 style={{textTransform: 'uppercase'}}>Playlists with {params.searchTerm}</h2>
                {playlistsResults.map((item, index) => (
                    <li key={index}>
                        <div id="result-li-container" onClick={() => {
                            history.push({
                                pathname: '/playlist/' + item.browseId,
                                state: {
                                    id: item.browseId,
                                }
                            })
                        }}>
                        <img id="playlists-image" src={checkThumbnailsForArrayOrObject(item.thumbnails)} alt="" />
                        <div id="playlists-text">
                                <h4>Name</h4>
                                <p>{item.title}</p>
                                <h4>Author</h4>
                                <p>{item.author}</p>
                                <h4>Number of songs</h4>
                                <p>{item.trackCount}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default Playlists