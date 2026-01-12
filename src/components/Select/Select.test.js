import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Select } from './Select';

expect.extend(toHaveNoViolations);

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Select', () => {
  it('renders select element', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select label="Choose option" options={options} />);
    expect(screen.getByLabelText('Choose option')).toBeInTheDocument();
  });

  it('associates label with select', () => {
    render(<Select label="Test" id="test-select" options={options} />);
    const select = screen.getByLabelText('Test');
    expect(select).toHaveAttribute('id', 'test-select');
  });

  it('shows required indicator', () => {
    render(<Select label="Name" required options={options} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    render(<Select options={options} placeholder="Select..." />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('applies size classes', () => {
    const { rerender } = render(<Select size="sm" options={options} />);
    expect(screen.getByRole('combobox')).toHaveClass('select--sm');

    rerender(<Select size="md" options={options} />);
    expect(screen.getByRole('combobox')).toHaveClass('select--md');

    rerender(<Select size="lg" options={options} />);
    expect(screen.getByRole('combobox')).toHaveClass('select--lg');
  });

  it('handles disabled state', () => {
    render(<Select disabled options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass('select--disabled');
  });

  it('handles error state', () => {
    render(<Select error errorMessage="Error message" options={options} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('select--error');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Error message');
  });

  it('renders helper text', () => {
    render(<Select helperText="Helper text" options={options} />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(<Select error errorMessage="Error" helperText="Helper" options={options} />);
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('handles controlled value', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Select value="1" onChange={handleChange} options={options} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('1');

    await user.selectOptions(select, '2');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles uncontrolled value', () => {
    render(<Select defaultValue="2" options={options} />);
    expect(screen.getByRole('combobox')).toHaveValue('2');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Select ref={ref} options={options} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Select label="Test select" options={options} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with error', async () => {
    const { container } = render(
      <Select label="Test select" error errorMessage="Error message" options={options} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when required', async () => {
    const { container } = render(<Select label="Test select" required options={options} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
