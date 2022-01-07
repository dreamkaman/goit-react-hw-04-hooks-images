import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalPortal = document.querySelector('#modal-root');

function Modal({ closeModal, children }) {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      console.log('ESC pressed!');
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalPortal,
  );
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func,
};
