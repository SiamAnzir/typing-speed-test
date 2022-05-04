import profilePic from '../img/profile.png';

const navbar = (props) => {
    return(
        <ul className="navbar-class">
            <li className="project-name">Typing Speed Test</li>
            <li className="profile-name"> <img src={profilePic} alt="profilePic" style={{height:'30px', width:'40px'}}/> {(props.profileName === "") ? ("Profile Name") : (props.profileName) }</li>
        </ul>
    )
}

export default navbar;