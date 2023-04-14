import { fireEvent ,render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from '../Modal';

describe('Modal', () => {
    
    test('modal is visible when isOpen is true', () => {
        render(
          <Modal isOpen={true} onClose={() => {}}>
            <div>Modal content</div>
          </Modal>
        );
        const modal = screen.queryByTestId('modal');
        expect(modal).toBeInTheDocument();
      });

      test('modal is not visible when isOpen is false', () => {
        render(
          <Modal isOpen={false} onClose={() => {}}>
            <div>Modal content</div>
          </Modal>
        );
        const modal = screen.queryByTestId('modal');
        expect(modal).not.toBeInTheDocument();
      });

      test('onClose function is called when user clicks outside of modal', () => {
        const onCloseMock = jest.fn();
        render(
          <Modal isOpen={true} onClose={onCloseMock}>
            <div>Modal content</div>
          </Modal>
        );
        const modalOverlay = screen.getByTestId('modal');
        fireEvent.click(modalOverlay);
        expect(onCloseMock).toHaveBeenCalled();
      });

      test('modal content is rendered correctly', () => {
        render(
          <Modal isOpen={true} onClose={() => {}}>
            <div>Modal content</div>
          </Modal>
        );
        const modalContent = screen.getByText('Modal content');
        expect(modalContent).toBeInTheDocument();
      });

      test('modal styles are applied correctly', () => {
        render(
          <Modal isOpen={true} onClose={() => {}}>
            <div>Modal content</div>
          </Modal>
        );
        const modal = screen.getByTestId('modal');
        expect(modal).toHaveClass('fixed top-0 left-0 w-screen h-screen lg:hidden');
        const modalContent = screen.getByTestId('modal-content');
        expect(modalContent).toHaveClass('rounded-lg w-full sm:w-3/5 h-3/5 p-4');
      });
  });