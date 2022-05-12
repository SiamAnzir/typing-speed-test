import React, {useState} from "react";
import image from "../img/profilepic.png";
import {Bar,Doughnut} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Sidebar = (props) => {
    const bestAccuracy = (props.info.length < 1) ? ("0") : (Math.max(...props.info.map(result => result.Accuracy)));
    const bestWpm = (props.info.length < 1) ? ("0") : (Math.max(...props.info.map(result => result.WPM)));
    const [showing, setShowing] = useState(false);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ' Correct Entity Stat',
            },
        },
    };
    const totalWords = (props.correctWord + props.incorrectWord);
    const correctWordPercentage =Math.round(((props.correctWord/totalWords) * 100));
    const inCorrectWordPercentage =Math.round(((props.incorrectWord/totalWords) * 100));
    const labels = (Object.keys(props.correctChar).length !== 0) ? (Object.keys(props.correctChar)) : (["no-data-available"]);
    const data = {
        labels,
        datasets: [
            {
                label: 'Number of Correct Entry',
                data: (Object.values(props.correctChar).length !== 0) ? (Object.values(props.correctChar)) : (["no-data-available"]),
                backgroundColor: 'rgba(0, 0,255, 0.5)',
            },
        ],
    };
    return(
        (showing) ?
            (<div className="sidebar">
                <button onClick={() => setShowing(false)}>x</button>
                <div className="sidebar-row">
                    <div className="sidebar-column">
                        <h2>Profile Intro</h2>
                        <img src={image} alt="profile" style={{height:"180px",width:"180px"}}/>
                        <br/>
                        <p>{props.profileName}</p>
                    </div>
                    <div className="sidebar-column">
                        <Bar options={options} data={data} style={{height:'580px',width:'580px'}}/>
                    </div>
                    <div className="sidebar-column">
                        {(totalWords === 0) ? (<div></div>) : (
                            <>
                                <Doughnut
                                    data = {{
                                        labels:['Correct Words', 'InCorrect Words'],
                                        datasets: [{
                                            label: 'Total Words',
                                            data: [correctWordPercentage,inCorrectWordPercentage],
                                            backgroundColor: [
                                                'rgba(0, 255, 0, 0.5)',
                                                'rgba(255,0, 0, 0.5)'
                                            ],

                                            hoverOffset: 4
                                        }]
                                    }}
                                    style={{height:'250px',width:'250px'}}
                                />
                                <ul>
                                    <li style={{color:'green'}}>Correct Words: {correctWordPercentage}%</li>
                                    <li style={{color:'red'}}>InCorrect Words: {inCorrectWordPercentage}%</li>
                                </ul>
                            </>
                        )}
                    </div>
                    <div className="sidebar-column">
                        <h2>Full Statistics </h2>
                        <div style={{paddingRight:'10px'}}>
                            <ul>
                                <li><b>Number of Tests: {props.gamePlayed}</b></li>
                            </ul>
                            <ul>
                                <li style={{color:'green'}}><b>Total Correct Words: {props.correctWord}</b></li>
                            </ul>
                            <ul>
                                <li style={{color:'red'}}><b>Total InCorrect Words: {props.incorrectWord}</b></li>
                            </ul>
                            <ul>
                                <li><b>Highest Accuracy: {bestAccuracy}%</b></li>
                            </ul>
                            <ul>
                                <li><b>Average Accuracy: {props.averageAccuracy}%</b></li>
                            </ul>
                            <ul>
                                <li><b>Highest Speed(WPM) : {bestWpm}</b></li>
                            </ul>
                            <ul>
                                <li><b>Average Speed(WPM): {props.averageWpm}</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>) :
            (
                <div className="sideNavBtn">
                    <button className="full-stat-button" onClick={() => setShowing(true)} type="submit">See Full Stats</button>
                </div>
            )
    )
}

export default Sidebar;




/**
 * const Sidebar = ({showing,setShowing}) => showing ? ReactDOM.createPortal(
 *     <>
 *         <div className="sidebar">
 *             <span onClick={() => setShowing(false)}>x</span>
 *             <p>About</p>
 *             <p>Services</p>
 *             <p>Clients</p>
 *             <p>Contact</p>
 *         </div>
 *     </>,document.body
 * ) : null;
 *
 *
 * export default Sidebar;**/
