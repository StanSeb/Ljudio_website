import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

function Artists(props) {

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    const history = useHistory()

    const artistsApi = 'https://yt-music-api.herokuapp.com/api/yt/artists/'

    const [artistsResults, setArtistsResults] = useState([])

    async function getArtists() {
        try {
            const response = await fetch(artistsApi + params.searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let artistsArray = []

            for (let i = 0; i < dataContent.length; i++) {
                artistsArray.push(dataContent[i])
            }

            setArtistsResults(artistsArray)
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getArtists()
    }, [])

    return <>
        <div id="artists-container">
            <ul>
                <h2 style={{textTransform: 'uppercase'}}>Artists with the name {params.searchTerm}</h2>
                {artistsResults.map((item, index) => (
                    <li key={index}>
                        <div id="result-li-container" onClick={() => {
                            history.push({
                                pathname: '/artist/' + item.browseId,
                                state: {
                                    id: item.browseId,
                                }
                            })
                        }}>
                            <img id="artist-image" src={item.thumbnails[0].url} alt="" />
                            <div id="artist-text">
                            <p>{item.name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default Artists