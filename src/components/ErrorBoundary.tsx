import React, { type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error in component:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          background: '#fbfbfd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6e6e73',
          fontSize: '14px'
        }}>
          <p>Loading globe experience...</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
