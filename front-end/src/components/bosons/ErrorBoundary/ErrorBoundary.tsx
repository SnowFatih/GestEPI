import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

interface Props {
  children?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can use your own error logging service here
    console.error(error, errorInfo);
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main>
          <section className="bg-white">
            <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
              <RiAlarmWarningFill size={60} className="drop-shadow-glow animate-flicker text-red-500" />
              <h1 className="mt-8 text-4xl md:text-6xl">Une erreur est survenue, merci de réessayer plus tard !</h1>
            </div>
          </section>
        </main>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}
