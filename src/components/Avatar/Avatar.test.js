import { render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Avatar } from './Avatar';

expect.extend(toHaveNoViolations);

describe('Avatar', () => {
  it('renders avatar', () => {
    render(<Avatar />);
    expect(document.querySelector('.avatar')).toBeInTheDocument();
  });

  it('renders with name and shows initials', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows single initial for single name', () => {
    render(<Avatar name="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="/test.jpg" alt="Test" name="John Doe" />);
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('alt', 'Test');
  });

  it('falls back to initials when image fails', async () => {
    render(<Avatar src="/invalid.jpg" name="John Doe" />);
    const img = document.querySelector('img');
    
    // Simulate image error
    if (img) {
      img.dispatchEvent(new Event('error'));
    }

    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  it('applies size classes', () => {
    const { rerender } = render(<Avatar size="sm" name="Test" />);
    expect(document.querySelector('.avatar')).toHaveClass('avatar--sm');

    rerender(<Avatar size="md" name="Test" />);
    expect(document.querySelector('.avatar')).toHaveClass('avatar--md');

    rerender(<Avatar size="lg" name="Test" />);
    expect(document.querySelector('.avatar')).toHaveClass('avatar--lg');

    rerender(<Avatar size="xl" name="Test" />);
    expect(document.querySelector('.avatar')).toHaveClass('avatar--xl');
  });

  it('shows loading state', () => {
    render(<Avatar loading />);
    expect(document.querySelector('.avatar')).toHaveClass('avatar--loading');
  });

  it('renders custom fallback', () => {
    render(<Avatar fallback="Custom" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Avatar name="John Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with image', async () => {
    const { container } = render(<Avatar src="/test.jpg" alt="User avatar" name="John Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
