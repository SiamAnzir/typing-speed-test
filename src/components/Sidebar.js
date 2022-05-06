import React from "react";
import ReactDOM from "react-dom";

const Sidebar = ({showing,setShowing}) => showing ? ReactDOM.createPortal(
    <>
        <div className="sidebar">
            <span onClick={() => setShowing(false)}>x</span>
            <p>About</p>
            <p>Services</p>
            <p>Clients</p>
            <p>Contact</p>
        </div>
    </>,document.body
) : null;

export default Sidebar;