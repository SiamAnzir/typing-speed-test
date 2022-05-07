import React, {useState} from "react";
import image from "../img/profilepic.png";
import {Line} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Sidebar = (props) => {
    const [showing, setShowing] = useState(false);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ' Line Chart',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [12,43,212,5345,4543,33.78],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return(
        (showing) ?
            (<div className="sidebar">
                <span onClick={() => setShowing(false)}>x</span>
                <div className="sidebar-row">
                    <div className="sidebar-column">
                        <p>Profile Intro</p>
                        <img src={image} alt="profile" style={{height:"180px",width:"180px"}}/>
                        <br/>
                        <p>{props.profileName}</p>
                    </div>
                    <div className="sidebar-column">
                        <Line options={options} data={data} style={{height:'550px',width:'550px'}}/>
                    </div>
                    <div className="sidebar-column">
                        <p>Highest Results</p>
                        <div>
                            <p>Correct Words:</p>
                            <p>{props.correctWord}</p>
                        </div>
                        <div>
                            <p>InCorrect Words:</p>
                            <p>{props.incorrectWord}</p>
                        </div>
                    </div>
                    <div className="sidebar-column">
                        <p>Average Results</p>
                        <div>
                            <p>Correct Words:</p>
                            <p>{props.correctWord}</p>
                        </div>
                        <div>
                            <p>InCorrect Words:</p>
                            <p>{props.incorrectWord}</p>
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
 * export default Sidebar;**/
