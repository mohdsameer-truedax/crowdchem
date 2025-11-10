// components/MDXErrorBoundary.tsx
import React, { type ReactNode } from "react";

type Props = { children: ReactNode; filePath: string };
type State = { hasError: boolean };

export class MDXErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[MDXError] Failed to render MDX file: ${this.props.filePath}`);
    console.error(error.stack);
    console.error(errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // return null to omit the item instead of crashing the page
      return null;
    }
    return this.props.children;
  }
}
