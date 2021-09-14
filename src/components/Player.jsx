import React from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'

var playState = null;

class Player extends React.Component {
    
    constructor(props) {
        super(props);        
    }    

    render() {
        const opts = {
            height: '576',
            width: '1024',
            playerVars: {
                autoplay: 1,
            },
        };       

        return (
            <div>
                <YouTube videoId={this.props.chosenVideoId} opts={opts} onReady={this._onReady} />
                <div id="player-buttons">
                    <button id="pause-btn" onClick={() => {playState.target.pauseVideo()}}>
                        <FontAwesomeIcon icon={faPauseCircle} />
                    </button>
                </div>
            </div>
        )
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.playVideo();
        playState = event;
    }

}

export default Player