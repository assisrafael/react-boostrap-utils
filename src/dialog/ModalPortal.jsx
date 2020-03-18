import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export function ModalPortal({ children, isOpen }) {
  const [container, setContainer] = useState();

  useEffect(() => {
    let body = document.getElementsByTagName('body')[0];
    if (!container) {
      let containerElem = document.createElement('div');
      body.appendChild(containerElem);
      setContainer(containerElem);
    }
    return () => {
      body.removeChild(container);
    };
  }, []);

  //FIXME: prop to define if modal will be always included into DOM
  if (!container || !isOpen) {
    return '';
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      {children}
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </React.Fragment>,
    container
  );
}

ModalPortal.propTypes = {
  children: PropTypes.any,
};