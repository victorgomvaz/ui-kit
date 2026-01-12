import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Switch } from './Switch';

expect.extend(toHaveNoViolations);

describe('Switch', () => {
  it('renders switch', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Switch label="Test switch" />);
    expect(screen.getByLabelText('Test switch')).toBeInTheDocument();
  });

  it('associates label with switch', () => {
    render(<Switch label="Test" id="test-switch" />);
    const switchElement = screen.getByLabelText('Test');
    expect(switchElement).toHaveAttribute('id', 'test-switch');
  });

  it('handles controlled checked state', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Switch label="Test" checked={false} onChange={handleChange} />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    await user.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles uncontrolled checked state', async () => {
    const user = userEvent.setup();
    render(<Switch label="Test" defaultChecked />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');

    await user.click(switchElement);
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  it('handles disabled state', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Switch label="Test" disabled onChange={handleChange} />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();

    await user.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Switch size="sm" />);
    expect(screen.getByRole('switch').closest('.switch')).toHaveClass('switch--sm');

    rerender(<Switch size="md" />);
    expect(screen.getByRole('switch').closest('.switch')).toHaveClass('switch--md');

    rerender(<Switch size="lg" />);
    expect(screen.getByRole('switch').closest('.switch')).toHaveClass('switch--lg');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Switch label="Test switch" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when checked', async () => {
    const { container } = render(<Switch label="Test switch" defaultChecked />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<Switch label="Test switch" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
