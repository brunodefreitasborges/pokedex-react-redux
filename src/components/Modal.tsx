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
        <div onClick={onClose} className="fixed top-0 left-0 
        w-screen h-screen lg:hidden
         bg-black bg-opacity-50 flex justify-center items-center">
          <div className="rounded-lg 
          w-full sm:w-3/5 h-3/5 p-4">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
