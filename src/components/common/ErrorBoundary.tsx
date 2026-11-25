import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { resetUserProgress } from '../../lib/storage';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('[BTP Launchpad ErrorBoundary] Uncaught runtime exception:', error, errorInfo);
  }

  handleTryAgain = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReturnHome = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
  };

  handleClearCacheAndReload = (): void => {
    try {
      resetUserProgress(true);
    } catch (e) {
      console.error('Failed to reset progress during recovery:', e);
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const { fallbackTitle = 'An Unexpected Application Error Occurred' } = this.props;

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[400px] flex items-center justify-center p-6 bg-[#fbf9f4] dark:bg-[#141517] w-full"
        >
          <div className="max-w-xl w-full rounded-2xl border border-rose-200 bg-white p-6 shadow-xl dark:border-rose-900/60 dark:bg-stone-900 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {fallbackTitle}
                </h2>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  BTP Launchpad encountered an unexpected rendering error. Your learning progress in storage has been preserved. You can retry the current view, return to the dashboard, or recover defaults.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
              <button
                type="button"
                onClick={this.handleTryAgain}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors focus-visible:outline focus-visible:outline-2"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Try Again</span>
              </button>

              <button
                type="button"
                onClick={this.handleReturnHome}
                className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-750 transition-colors focus-visible:outline focus-visible:outline-2"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Return to Dashboard</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearCacheAndReload}
                className="flex items-center gap-1.5 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60 transition-colors focus-visible:outline focus-visible:outline-2 ml-auto"
                title="Clears corrupted state and reloads"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Cache & Reload</span>
              </button>
            </div>

            {/* Collapsible Error Diagnostics */}
            {this.state.error && (
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
                <button
                  type="button"
                  onClick={this.toggleDetails}
                  className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                >
                  {this.state.showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  <span>{this.state.showDetails ? 'Hide Technical Diagnostics' : 'Show Technical Diagnostics'}</span>
                </button>

                {this.state.showDetails && (
                  <div className="mt-2 rounded-lg bg-stone-100 p-3 font-mono text-[10px] text-stone-800 dark:bg-stone-950 dark:text-stone-300 max-h-48 overflow-y-auto space-y-1">
                    <p className="font-bold text-rose-600 dark:text-rose-400">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="whitespace-pre-wrap leading-tight text-stone-600 dark:text-stone-400">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
