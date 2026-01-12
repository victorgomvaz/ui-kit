import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Radio } from './Radio';

expect.extend(toHaveNoViolations);

describe('Radio', () => {
  it('renders radio button', () => {
    render(<Radio name="test" value="1" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Radio name="test" value="1" label="Option 1" />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
  });

  it('associates label with radio', () => {
    render(<Radio name="test" value="1" label="Option" id="test-radio" />);
    const radio = screen.getByLabelText('Option');
    expect(radio).toHaveAttribute('id', 'test-radio');
  });

  it('handles controlled checked state', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Radio name="test" value="1" label="Option" checked={false} onChange={handleChange} />
    );

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await user.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles uncontrolled checked state', async () => {
    const user = userEvent.setup();
    render(<Radio name="test" value="1" label="Option" defaultChecked />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();

    await user.click(radio);
    // Still checked because it's the only one in the group
    expect(radio).toBeChecked();
  });

  it('handles disabled state', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Radio name="test" value="1" label="Option" disabled onChange={handleChange} />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();

    await user.click(radio);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports name and value attributes', () => {
    render(<Radio name="group1" value="value1" label="Option" />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'group1');
    expect(radio).toHaveAttribute('value', 'value1');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Radio name="test" value="1" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Radio name="test" value="1" label="Test radio" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when checked', async () => {
    const { container } = render(<Radio name="test" value="1" label="Test radio" defaultChecked />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<Radio name="test" value="1" label="Test radio" disabled />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
