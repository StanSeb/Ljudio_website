import React, { useState, useEffect } from "react";

function Artists(props) {

    const artistApi = 'https://yt-music-api.herokuapp.com/api/yt/artists/'

    const [artistResults, setArtistResults] = useState([])

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    async function getArtists() {
        try {
            const response = await fetch(artistApi + params.searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let artistArray = []

            for (let i = 0; i < dataContent.length; i++) {
                artistArray.push(dataContent[i])
            }

            setArtistResults(artistArray)

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
                {artistResults.map((item, index) => (
                    <li key={index}>
                        <div id="result-li-container">
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