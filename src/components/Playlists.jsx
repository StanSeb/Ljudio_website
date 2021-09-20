import React, { useState, useEffect } from "react";

function Playlists(props) {

    const playlistApi = 'https://yt-music-api.herokuapp.com/api/yt/playlists/'

    const [playlistResults, setPlaylistResults] = useState([])

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    async function getPlaylists() {
        try {
            const response = await fetch(playlistApi + params.searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let playlistArray = []

            for (let i = 0; i < dataContent.length; i++) {
                playlistArray.push(dataContent[i])
            }

            setPlaylistResults(playlistArray)

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
        <div id="playlist-container">
            <ul>
                <h2 style={{textTransform: 'uppercase'}}>Playlists with {params.searchTerm}</h2>
                {playlistResults.map((item, index) => (
                    <li key={index}>
                        <div id="result-li-container">
                        <img id="playlist-image" src={checkThumbnailsForArrayOrObject(item.thumbnails)} alt="" />
                        <div id="playlist-text">
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