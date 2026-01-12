import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from './Badge';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
  it('renders badge with children', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies tone classes', () => {
    const { rerender } = render(<Badge tone="primary">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--primary');

    rerender(<Badge tone="success">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--success');

    rerender(<Badge tone="error">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--error');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--sm');

    rerender(<Badge size="md">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--md');

    rerender(<Badge size="lg">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--lg');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Badge variant="solid">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--solid');

    rerender(<Badge variant="outline">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--outline');

    rerender(<Badge variant="subtle">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('badge--subtle');
  });

  it('renders as span element', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge.tagName).toBe('SPAN');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>Test badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
