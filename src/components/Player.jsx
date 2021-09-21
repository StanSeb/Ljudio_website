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
        super(props)
        this.state = {
            playInfo: null
        }
    }

    onPlaylistReady(event) {
        // access to player in all event handlers via event.target
        playState = event
        playState.target.loadPlaylist();
    }

    getVideoData(){
        console.log(playState.target.getVideoData().title)
        this.state.playInfo = playState.target.getVideoData().title
        console.log("TITERRU" + this.state.playInfo)
    }


    render() {
        return (
            <div id="player">
                <h4>Now playing: {this.state.playInfo}</h4>
                <div id="player-buttons">
                    <i id="backward-btn" onClick={() => { playState.target.previousVideo() }}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} size='5x' />
                    </i>
                    <i id="pause-btn" onClick={() => { playState.target.pauseVideo() }}>
                        <FontAwesomeIcon icon={faPauseCircle} size='5x' />
                    </i>
                    <i id="play-btn" onClick={() => { playState.target.playVideo() }}>
                        <FontAwesomeIcon icon={faPlayCircle} size='5x' />
                    </i>
                    <i id="forward-btn" onClick={() => { playState.target.nextVideo() }}>
                        <FontAwesomeIcon icon={faChevronCircleRight} size='5x' />
                    </i>
                </div>
                <div className="yt">
                    <YouTube videoId={this.props.chosenVideo}
                        opts={{
                            playerVars: {
                                autoplay: 1,
                                listType: 'playlist',
                                list: this.props.chosenPlaylist
                            }
                        }} onReady={this.onPlaylistReady} onStateChange={this.getVideoData}/>
                </div>
            </div>
        )
    }
}    

export default Player