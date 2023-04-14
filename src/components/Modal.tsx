import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div data-testid="modal" onClick={onClose} className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 lg:hidden">
          <div data-testid="modal-content" className="w-full p-4 rounded-lg sm:w-3/5 h-3/5">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
