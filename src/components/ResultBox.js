import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSquarePollHorizontal,
    faSquarePollVertical,
    faCircleCheck,
    faCircleXmark, faPercent,faGaugeSimpleHigh
} from "@fortawesome/free-solid-svg-icons";

const resultBox = (props) => {
    return(
        <div>
            <div className="result-box">
                <div className="result-header">
                    <h1><FontAwesomeIcon icon={faSquarePollHorizontal}  style={{ marginRight: '.5rem' }}/>Current Result</h1>
                </div>
                <div className="row">
                    <div className="column" style={{borderRight:'2px solid #003366'}}>
                        <h4><FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '.2rem' }} color="green"/>Correct Words</h4>
                        <h4>{(props.correctWord !== 0) ? (
                            props.currentResult.correctWords
                        ) : (props.correctWord)}</h4>
                    </div>
                    <div className="column">
                        <h4><FontAwesomeIcon icon={faCircleXmark} style={{ marginRight: '.2rem' }} color="red"/>InCorrect Words</h4>
                        <h4>{(props.incorrectWord !== 0) ? (
                            props.currentResult.inCorrectWords
                        ) : (props.incorrectWord)}</h4>
                    </div>
                </div>
                <div className="row" style={{borderTop:'2px solid #003366'}}>
                    <div className="column" style={{borderRight:'2px solid #003366'}}>
                        <h4><FontAwesomeIcon icon={faGaugeSimpleHigh} style={{ marginRight: '.2rem' }}/>WPM</h4>
                        <h4>{(props.correctWord !== 0) ? (
                            props.currentResult.WPM
                        ) : (
                            0
                        )}</h4>
                    </div>
                    <div className="column">
                        <h4><FontAwesomeIcon icon={faPercent} style={{ marginRight: '.2rem'}}/>Accuracy</h4>
                        <h4>
                            {(props.correctWord !== 0 ? (
                                props.currentResult.Accuracy + "%"
                            ) : (
                                "0%"
                            ))}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="avg-result-box">
                <div className="result-header">
                    <h3><FontAwesomeIcon icon={faSquarePollVertical} style={{ marginRight: '.5rem' }}/>Average Typing Speed</h3>
                </div>
                <div>
                    <h4>{props.averageWpm}</h4>
                </div>
            </div>
        </div>
    )
}

export default resultBox;