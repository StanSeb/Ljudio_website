import React from "react";
import YouTube from "react-youtube";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

var playState = null;

class Player extends React.Component {

    constructor(props) {
        super(props);
    }

    onVideoReady(event) {
        // access to player in all event handlers via event.target
        playState = event;
        playState.target.playVideo();
    }

    onPlaylistReady(event) {
        // access to player in all event handlers via event.target
        playState = event;
        playState.target.loadPlaylist();
    }

    render() {
        const opts = {
            height: '0',
            width: '0',
            playerVars: {
                autoplay: 1,
                playlist: this.props.chosenPlaylist
            },
        };

        return (
            <div id="player">
                <h3>Playing: {this.props.chosenVideo}</h3>
                <div id="player-buttons">
                    <button id="backward-btn"  onClick={() => { playState.target.previousVideo() }}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} size='5x'/>
                    </button>
                    <button id="pause-btn" onClick={() => { playState.target.pauseVideo() }}>
                        <FontAwesomeIcon icon={faPauseCircle} size='5x' />
                    </button>
                    <button id="play-btn" onClick={() => { playState.target.playVideo() }}>
                        <FontAwesomeIcon icon={faPlayCircle} size='5x' />
                    </button>
                    <button id="forward-btn" onClick={() => { playState.target.nextVideo() }}>
                        <FontAwesomeIcon icon={faChevronCircleRight} size='5x' />
                    </button>
                </div>
                <div className="yt">
                    <YouTube videoId={this.props.chosenVideo}
                    opts={opts} onReady={this.onVideoReady} />
                </div>
                <div className="yt">
                    <YouTube
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            listType: 'playlist',
                            list: this.props.chosenPlaylist
                        }
                    }} onReady={this.onPlaylistReady} />
                </div>
            </div>
        )
    }

}

export default Player