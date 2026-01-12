import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from './Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  it('renders checkbox', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label="Test checkbox" />);
    expect(screen.getByLabelText('Test checkbox')).toBeInTheDocument();
  });

  it('associates label with checkbox', () => {
    render(<Checkbox label="Test" id="test-checkbox" />);
    const checkbox = screen.getByLabelText('Test');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });

  it('handles controlled checked state', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Test" checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles uncontrolled checked state', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Test" defaultChecked />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('handles disabled state', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Test" disabled onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles indeterminate state', () => {
    render(<Checkbox label="Test" indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('forwards ref and sets indeterminate', () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} indeterminate />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current.indeterminate).toBe(true);
  });

  it('supports name and value attributes', () => {
    render(<Checkbox name="test" value="value1" label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'test');
    expect(checkbox).toHaveAttribute('value', 'value1');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Test checkbox" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when checked', async () => {
    const { container } = render(<Checkbox label="Test checkbox" defaultChecked />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<Checkbox label="Test checkbox" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when indeterminate', async () => {
    const { container } = render(<Checkbox label="Test checkbox" indeterminate />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
