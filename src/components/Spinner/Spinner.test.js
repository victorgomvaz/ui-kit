import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Spinner } from './Spinner';

expect.extend(toHaveNoViolations);

describe('Spinner', () => {
  it('renders spinner', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default accessible label', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  it('applies custom label', () => {
    render(<Spinner label="Loading data..." />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading data...');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--sm');

    rerender(<Spinner size="md" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--md');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--lg');
  });

  it('applies tone classes', () => {
    const { rerender } = render(<Spinner tone="primary" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--primary');

    rerender(<Spinner tone="secondary" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--secondary');

    rerender(<Spinner tone="success" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--success');

    rerender(<Spinner tone="error" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--error');

    rerender(<Spinner tone="warning" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--warning');

    rerender(<Spinner tone="neutral" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--neutral');
  });

  it('renders SVG spinner', () => {
    render(<Spinner />);
    const svg = screen.getByRole('status').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with custom label', async () => {
    const { container } = render(<Spinner label="Custom loading message" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
