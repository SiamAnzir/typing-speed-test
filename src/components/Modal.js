import React from 'react';
import ReactDOM from 'react-dom';
import profile from '../img/profilepic.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-regular-svg-icons";

const Modal = ({ isShowing, modalHandleSubmit,modalInputChange,profileName }) => (isShowing) ? ReactDOM.createPortal(
    <>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <form onSubmit={modalHandleSubmit}>
                    <div>
                        <img src={profile} alt="profile" style={{height:'300px',width:'320px'}}/>
                    </div>
                    <label>Type Your Full Name</label>
                    <input className="modal-input-field" required type="text" placeholder="Profile Name...." minLength="8" value={(profileName === "") ? ("") : (profileName)} onChange={modalInputChange}/>
                    <button className="modal-button" type="submit"><FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '.2rem' }}/>Submit</button>
                </form>
            </div>
        </div>
    </>, document.body
) : null;


export default Modal;

/**
 * <div className="modal-header">
 *                     <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
 *                         <span aria-hidden="true">&times;</span>
 *                     </button>
 *                 </div>
 *                 padding: 15px 32px;**/