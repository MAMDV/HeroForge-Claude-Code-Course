import { Component } from 'react';

/**
 * ErrorBoundary -- catches rendering errors in child components
 * and displays a graceful fallback UI instead of crashing the app.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="error-boundary-fallback"
          className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400"
        >
          <p className="font-semibold">Something went wrong</p>
          <p className="mt-1 text-sm">{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button
            data-testid="error-boundary-retry"
            onClick={this.handleRetry}
            className="mt-3 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
