import { Modal } from '../src/components/Modal';
import { Button } from '../src/components/Button';
import { useState } from 'react';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'Modal component for dialogs and overlays. Features focus trap, escape key handling, and full accessibility with ARIA dialog attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: {
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'Modal title',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close when clicking overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on Escape key',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export const Default = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <Modal.Body>
            <p>This is the modal content. You can put any content here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const Sizes = {
  render: () => {
    const [size, setSize] = useState('md');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={() => { setSize('sm'); setIsOpen(true); }}>Small</Button>
          <Button onClick={() => { setSize('md'); setIsOpen(true); }}>Medium</Button>
          <Button onClick={() => { setSize('lg'); setIsOpen(true); }}>Large</Button>
          <Button onClick={() => { setSize('xl'); setIsOpen(true); }}>Extra Large</Button>
        </div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`${size.toUpperCase()} Modal`} size={size}>
          <Modal.Body>
            <p>This is a {size} sized modal.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal size options: small, medium, large, extra large, and full.',
      },
    },
  },
};

export const WithoutTitle = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Body>
            <p>This modal doesn't have a title.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal without a title header.',
      },
    },
  },
};

export const LongContent = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Long Content Modal">
          <Modal.Body>
            <p>This modal has scrollable content.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Paragraph {i + 1}</p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with long scrollable content.',
      },
    },
  },
};
