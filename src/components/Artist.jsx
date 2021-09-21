import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

function Artist(props) {

    const artistApi = 'https://yt-music-api.herokuapp.com/api/yt/artist/'

    const [artistResults, setArtistResults] = useState([])
    const [thumbnail, setThumbnail] = useState([])
    const [artistSongs, setArtistSongs] = useState([])
    const [artistSingles, setArtistSingles] = useState([])
    const [artistAlbums, setArtistAlbums] = useState([])

    // Defining variables to get in to the object we get from props
    let match = props.match
    let params = match.params

    async function getArtist() {
        try {
            const response = await fetch(artistApi + params.id)
            const data = await response.json()
            const stringifyData = (JSON.stringify(data, undefined, 4))
            const dataObject = JSON.parse(stringifyData)

            let thumbnailArray = []
            let songsArray = []
            let singlesArray = []
            let albumsArray = []

            for (let i = 0; i < dataObject.thumbnails.length; i++) {
                thumbnailArray.push(dataObject.thumbnails[i])
            }

            for (let i = 0; i < dataObject.products.songs.content.length; i++) {
                songsArray.push(dataObject.products.songs.content[i])
            }

            for (let i = 0; i < dataObject.products.singles.content.length; i++) {
                singlesArray.push(dataObject.products.singles.content[i])
            }

            for (let i = 0; i < dataObject.products.albums.content.length; i++) {
                albumsArray.push(dataObject.products.albums.content[i])
            }

            setArtistResults(dataObject)
            setArtistSongs(songsArray)
            setArtistSingles(singlesArray)
            setArtistAlbums(albumsArray)
            setThumbnail(thumbnailArray.pop().url)

        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getArtist()
    }, [])

    function fetchLink() {
        navigator.clipboard.writeText('')
        navigator.clipboard.writeText(window.location.href)
        alert("The link has been copied to you clipboard!")
    }


    return (
        <div id="artist-container">
            <h2 style={{ textTransform: 'uppercase' }}>{artistResults.name}'s info page</h2>
            <div id="result-li-container">
                <img id="artist-image" src={thumbnail} alt="" />
                <div id="artist-text">
                    <p><em>{artistResults.description}</em></p>
                    <div id="share">
                        <i alt="Share" onClick={fetchLink}> <FontAwesomeIcon icon={faShare} size='3x' /></i>
                    </div>
                </div>
                <div id="artist-songs">
                    <h2>Top songs</h2>
                    <ul>
                        {artistSongs.map((song, index) => (
                            <li key={index}>
                                <p>{song.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="artist-singles">
                    <h2>Singles</h2>
                    <ul>
                        {artistSingles.map((single, index) => (
                            <li key={index}>
                                <p>{single.name} - Release year: {single.year}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="artist-albums">
                    <h2>Albums</h2>
                    <ul>
                        {artistAlbums.map((album, index) => (
                            <li key={index}>
                                <img src={album.thumbnails[1].url} alt="" />
                                <p>{album.name}</p>
                                <p>Release year: {album.year}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Artist