import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const textBox = (props) => {
    return(
        <div>
            <div className="text-box">
                <div className="header-row">
                    <div className="header-column">
                        <p className="counter">
                            {(props.count < 10) ? ( "00:0"+props.count ) : ("00:"+props.count)}
                        </p>
                    </div>
                    <div className="header-column">
                        <input className="input-field" ref={props.textInput} disabled={props.status !== "started"} type="text" onKeyDown={props.handleKeyUpdate} value={props.currentValue} onChange={(e) => props.setCurrentValue(e.target.value)}/>
                    </div>
                    <div className="header-column">
                        <button className="start-button" onClick={props.countDownStart}>
                            <FontAwesomeIcon icon={faArrowsRotate} style={{ marginRight: '.5rem' }}/>
                            {
                                (props.status === "finished") ? (
                                    "Restart"
                                ) : (
                                    "Start"
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className="row">
                    {props.words.map((word,index) => (
                        <span key={index}>
                <span>
                  {word.split("").map((char,i) => (
                      <span className={props.setCharClass(index,i,char)} key={i}>{char}</span>
                  ))}
                </span>
                <span> </span>
              </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default textBox;