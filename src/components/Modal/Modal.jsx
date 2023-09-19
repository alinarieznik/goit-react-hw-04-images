import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyledBackdrop, StyledModal, StyledImg } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, tags }) {
  useEffect(() => {
    const onEscClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscClose);
    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <StyledBackdrop onClick={handleBackdropClick}>
      <StyledModal>
        <StyledImg src={largeImageURL} alt={tags} />
      </StyledModal>
    </StyledBackdrop>,
    modalRoot
  );
}
