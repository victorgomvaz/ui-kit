import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('associates label with input', () => {
    render(<Input label="Email" id="test-input" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('shows required indicator', () => {
    render(<Input label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('input--sm');

    rerender(<Input size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('input--md');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('input--lg');
  });

  it('handles disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('input--disabled');
  });

  it('handles error state', () => {
    render(<Input error errorMessage="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input--error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Error message');
  });

  it('renders helper text', () => {
    render(<Input helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(<Input error errorMessage="Error" helperText="Helper" />);
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Input value="test" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');

    await user.clear(input);
    await user.type(input, 'new value');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles uncontrolled value', () => {
    render(<Input defaultValue="default" />);
    expect(screen.getByRole('textbox')).toHaveValue('default');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    expect(screen.getByLabelText(/password/i) || screen.getByRole('textbox')).toHaveAttribute('type', 'password');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with error', async () => {
    const { container } = render(<Input label="Test input" error errorMessage="Error message" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when required', async () => {
    const { container } = render(<Input label="Test input" required />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
