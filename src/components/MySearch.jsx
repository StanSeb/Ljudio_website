import React, { useState, useEffect } from "react";

function MySearch() {

    const heroApi = 'https://yt-music-api.herokuapp.com'

    const [searchTerm, setSearchTerm] = useState('')
    const [albumResults, setAlbumResults] = useState([])
    const [artistResults, setArtistResults] = useState([])
    const [songResults, setSongResults] = useState([])
    const [videoResults, setVideoResults] = useState([])
    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

    async function fetchData() {
        try{
            const response = await fetch(heroApi + '/api/yt/search/' + searchTerm)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)
            const dataContent = dataObject['content']

            let albumArray = []
            let artistArray = []
            let songArray = []
            let videoArray = []

            

            for(let i = 0; i < dataContent.length; i++){
                if(dataContent[i].type == 'album'){
                    albumArray.push(dataContent[i])                    
                }
                else if(dataContent[i].type == 'artist'){
                    artistArray.push(dataContent[i])
                }
                else if(dataContent[i].type == 'song'){
                    songArray.push(dataContent[i])
                }
                else if(dataContent[i].type == 'video'){
                    videoArray.push(dataContent[i])
                }
                else{
                    console.log(dataContent[i])
                }
            }

            setAlbumResults(albumArray)
            setArtistResults(artistArray)
            setSongResults(songArray)
            setVideoResults(videoArray)
            
            
            
        }catch(e){
            console.error(e)
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        fetchData()     
        //console.log(searchResults)
    }


    return (
        <div id="search-container">
            <form onSubmit={handleSubmit}>
                <div id="input-container">
                    <input type="text" value={searchTerm} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div id="result-container">
                <ul>
                    <h2>Albums</h2>
                    {albumResults.map((item, index) => (
                        <li key={index}>
                            <p>{item.name}</p>
                            </li>
                    ))}
                </ul>
                <ul>
                    <h2>Artists</h2>
                {artistResults.map((item, index) => (
                        <li key={index}>
                            <p>{item.name}</p>
                            </li>
                    ))}
                </ul>
                <ul>
                    <h2>Songs</h2>
                {songResults.map((item, index) => (
                        <li key={index}>
                            <p>{item.name}</p>
                            </li>
                    ))}
                </ul>
                <ul>
                    <h2>Videos</h2>
                {videoResults.map((item, index) => (
                        <li key={index}>
                            <p>{item.name}</p>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MySearch