import React, { useState, useEffect } from "react";

function Albums(props) {

    const albumApi = 'https://yt-music-api.herokuapp.com/api/yt/search/'

    const [albumResults, setAlbumResults] = useState([])

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    async function getAlbums() {
        try {
            const response = await fetch(albumApi + params.searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let albumArray = []

            for (let i = 0; i < dataContent.length; i++) {
                if (dataContent[i].type == 'album') {
                    albumArray.push(dataContent[i])
                }
            }

            setAlbumResults(albumArray)

        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getAlbums()
    }, [])

    function checkThumbnailsForArrayOrObject(thumbnails) {
        if (Object.prototype.toString.call(thumbnails) === '[object Array]') {
            return thumbnails[0].url
        } else {
            return thumbnails.url
        }
    }

    return <>
        <div id="album-container">
            <ul>
                <h2 style={{ textTransform: 'uppercase' }}>Albums with {params.searchTerm}</h2>
                {albumResults.map((item, index) => (
                    <li key={index}>
                        <div id="result-li-container">
                            <img id="album-image" src={checkThumbnailsForArrayOrObject(item.thumbnails)} alt="" />
                            <div id="album-text">
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
        </div>
    </>
}

export default Albums