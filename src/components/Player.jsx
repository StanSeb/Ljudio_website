import React from "react";
import { render } from "react-dom";
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
    
    onPlaylistReady(event) {
        // access to player in all event handlers via event.target
        playState = event
        playState.target.loadPlaylist();
    }
    
    getVideoData = (() => {
        let playerInfo = playState.target.getVideoData().title            
        
        // Because I couldn't figure out states on a react class
        // I chose to render a temporary div-element and retract
        // the innerhtml and put that into my h4. 
        let tempDiv = document.createElement('div')
        tempDiv.setAttribute("id", "tempDiv")

        render(playerInfo, tempDiv)

        let trueContainer = document.getElementById('player-title')

        let getTitle = tempDiv.innerHTML

        trueContainer.innerHTML = 'Now playing: '+getTitle

    })   

    render() {
        return (
            <div id="player">
                <h4 id="player-title"></h4>
                <div id="player-buttons">
                    <i id="backward-btn" onClick={() => { playState.target.previousVideo() }}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} size='4x' />
                    </i>
                    <i id="pause-btn" onClick={() => { playState.target.pauseVideo() }}>
                        <FontAwesomeIcon icon={faPauseCircle} size='4x' />
                    </i>
                    <i id="play-btn" onClick={() => { playState.target.playVideo() }}>
                        <FontAwesomeIcon icon={faPlayCircle} size='4x' />
                    </i>
                    <i id="forward-btn" onClick={() => { playState.target.nextVideo() }}>
                        <FontAwesomeIcon icon={faChevronCircleRight} size='4x' />
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