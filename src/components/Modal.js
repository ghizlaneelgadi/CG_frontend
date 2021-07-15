import React from "react";
import '../App.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container align-self-center align-middle">
        <button type="button" aria-label="Close" href="javascript:;" className="modal-close" onClick={handleClose} >×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
