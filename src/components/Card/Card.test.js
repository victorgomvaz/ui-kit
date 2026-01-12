import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card } from './Card';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  it('renders card with children', () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(
      <Card variant="default">
        <div>Test</div>
      </Card>
    );
    expect(document.querySelector('.card')).toHaveClass('card--default');

    rerender(
      <Card variant="outlined">
        <div>Test</div>
      </Card>
    );
    expect(document.querySelector('.card')).toHaveClass('card--outlined');

    rerender(
      <Card variant="elevated">
        <div>Test</div>
      </Card>
    );
    expect(document.querySelector('.card')).toHaveClass('card--elevated');
  });

  it('renders Card.Header', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(document.querySelector('.card__header')).toBeInTheDocument();
  });

  it('renders Card.Body', () => {
    render(
      <Card>
        <Card.Body>Body</Card.Body>
      </Card>
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(document.querySelector('.card__body')).toBeInTheDocument();
  });

  it('renders Card.Footer', () => {
    render(
      <Card>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(document.querySelector('.card__footer')).toBeInTheDocument();
  });

  it('renders all card sections', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Content</Card.Body>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
