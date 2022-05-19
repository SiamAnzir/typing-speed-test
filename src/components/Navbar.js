import React from "react";
import profilePic from '../img/profile.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faKeyboard} from "@fortawesome/free-regular-svg-icons";

const navbar = (props) => {
    return(
        <ul className="navbar-class">
            <li className="project-name">
                <FontAwesomeIcon icon={faKeyboard}/> Typing Speed Test
            </li>
            <li className="profile-name"> <FontAwesomeIcon icon={faUser} style={{ marginRight: '.8rem' }}/>
                {(props.profileName === "") ? ("Profile Name") : (props.profileName) }
            </li>
        </ul>
    )
}

export default navbar;