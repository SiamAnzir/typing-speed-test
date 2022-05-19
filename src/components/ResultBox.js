import React from "react";

const resultBox = (props) => {
    return(
        <div>
            <div className="result-box">
                <div className="result-header">
                    <h1>Current Result</h1>
                </div>
                <div className="row">
                    <div className="column" style={{borderRight:'2px solid #003366'}}>
                        <h4>Correct Words</h4>
                        <h4>{(props.correctWord !== 0) ? (
                            props.currentResult.correctWords
                        ) : (props.correctWord)}</h4>
                    </div>
                    <div className="column">
                        <h4>InCorrect Words</h4>
                        <h4>{(props.incorrectWord !== 0) ? (
                            props.currentResult.inCorrectWords
                        ) : (props.incorrectWord)}</h4>
                    </div>
                </div>
                <div className="row" style={{borderTop:'2px solid #003366'}}>
                    <div className="column" style={{borderRight:'2px solid #003366'}}>
                        <h4>WPM</h4>
                        <h4>{(props.correctWord !== 0) ? (
                            props.currentResult.WPM
                        ) : (
                            0
                        )}</h4>
                    </div>
                    <div className="column">
                        <h4>Accuracy</h4>
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
                    <h3>Average WPM</h3>
                </div>
                <div>
                    <h4>{props.averageWpm}</h4>
                </div>
            </div>
        </div>
    )
}

export default resultBox;