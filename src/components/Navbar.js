const navbar = (props) => {
    return(
        <ul className="navbar-class">
            <li className="project-name">Typing Speed Test</li>
            <li className="profile-name">{(props.profileName === "") ? ("Profile Name") : (props.profileName) }</li>
        </ul>
    )
}

export default navbar;