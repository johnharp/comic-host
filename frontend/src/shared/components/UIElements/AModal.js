import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './AModal.css';

const AModalOverlay = props => {
  const content = (
    <div className={`amodal ${props.className}`} style={props.style}>
      <header className={`amodal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`amodal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`amodal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const AModal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="amodal"
      >
        <AModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default AModal;
