import React, { useState } from "react"

// Using history to push to MyResults
// with a dynamic url and with a prop through "state"
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function MySearch() {

    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        history.push({
            pathname: '/results/' + searchTerm,
            state: {
                searchTerm: searchTerm,
            }
        })
    }


    return (
        <div id="search-and-results-container">
            <div id="search-container">
                <form onSubmit={handleSubmit}>
                    <div id="input-container">
                        <input type="text" value={searchTerm} onChange={handleChange} />
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} size='2x' />
                        </button>
                    </div>
                </form>
            </div>
            <div id="home-info-text">
                <p style={{ lineHeight: '3rem' }}>
                    <em>
                        "Ljudio is an application which uses Google IFrame API
                        <br />
                        together with Herokuapp
                        for searching
                        <br />
                        Youtube
                        videos, artists, albums, playlists and songs.
                        <br />
                        Have fun and start searching!"
                    </em>
                </p>
            </div>
        </div>
    )
}

export default MySearch