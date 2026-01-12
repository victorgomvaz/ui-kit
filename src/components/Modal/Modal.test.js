import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Modal } from './Modal';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Modal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders modal with title', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Title">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby');
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key when closeOnEscape is true', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={true}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={false}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders Modal.Body', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.Body>Body content</Modal.Body>
      </Modal>
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders Modal.Footer', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
        <Modal.Footer>Footer content</Modal.Footer>
      </Modal>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(document.querySelector('.modal--sm')).toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(document.querySelector('.modal--lg')).toBeInTheDocument();
  });

  it('prevents body scroll when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
