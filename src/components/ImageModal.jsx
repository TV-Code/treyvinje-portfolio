import React from 'react';
import { styled } from '@mui/material/styles';

const ModalOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

const ModalContent = styled('div')({
  maxWidth: '90%',
  maxHeight: '90%',
  overflow: 'auto',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
  transform: 'scale(0.9)',
  opacity: 0,
  '&.active': {
    transform: 'scale(1)',
    opacity: 1,
  },
});

const ModalImage = styled('img')({
  display: 'block',
  width: '100%',
  height: 'auto',
});

function ImageModal({ isOpen, onClose, image }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} className={isOpen ? 'active' : ''}>
        <ModalImage src={image.src} alt={`${image.frame} view`} />
      </ModalContent>
    </ModalOverlay>
  );
}

export default ImageModal;