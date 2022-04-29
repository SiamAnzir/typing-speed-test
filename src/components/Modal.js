import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, modalHandleSubmit,modalInputChange }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <form onSubmit={modalHandleSubmit}>
                    <label>Type Your Full Name</label>
                    <input className="modal-input-field" required type="text" placeholder="Profile Name...." minLength="8" onChange={modalInputChange}/>
                    <button className="modal-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;


export default Modal;

/**
 * <div className="modal-header">
 *                     <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
 *                         <span aria-hidden="true">&times;</span>
 *                     </button>
 *                 </div>**/