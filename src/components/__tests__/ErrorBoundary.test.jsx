import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

/**
 * A helper component that throws on render when `shouldThrow` is true.
 */
function ProblemChild({ shouldThrow = true }) {
  if (shouldThrow) {
    throw new Error('Test explosion');
  }
  return <p data-testid="child-content">All good</p>;
}

describe('ErrorBoundary', () => {
  // Suppress console.error noise from React's error boundary logging
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.queryByTestId('error-boundary-fallback')).not.toBeInTheDocument();
  });

  it('catches a rendering error and shows the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test explosion')).toBeInTheDocument();
    expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
  });

  it('displays a retry button in the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary-retry')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary-retry')).toHaveTextContent('Try again');
  });

  it('resets error state when retry button is clicked', () => {
    let shouldThrow = true;

    function ConditionalChild() {
      if (shouldThrow) {
        throw new Error('Boom');
      }
      return <p data-testid="child-content">Recovered</p>;
    }

    render(
      <ErrorBoundary>
        <ConditionalChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByTestId('error-boundary-retry'));

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.queryByTestId('error-boundary-fallback')).not.toBeInTheDocument();
  });
});
