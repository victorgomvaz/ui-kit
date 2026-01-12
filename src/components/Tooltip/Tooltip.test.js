import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

describe('Tooltip', () => {
  it('renders tooltip wrapper with children', () => {
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await user.hover(trigger);

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Test tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await user.hover(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await user.tab();
    expect(trigger).toHaveFocus();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('hides tooltip on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await user.hover(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not show tooltip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Test tooltip" disabled>
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByText('Trigger');
    await user.hover(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies position classes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Tooltip content="Test" position="top">
        <button>Trigger</button>
      </Tooltip>
    );
    
    const trigger = screen.getByText('Trigger');
    await user.hover(trigger);
    expect(document.querySelector('.tooltip--top')).toBeInTheDocument();

    await user.unhover(trigger);
    rerender(
      <Tooltip content="Test" position="bottom">
        <button>Trigger</button>
      </Tooltip>
    );
    
    await user.hover(trigger);
    expect(document.querySelector('.tooltip--bottom')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
