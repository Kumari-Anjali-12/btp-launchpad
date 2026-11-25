import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../../src/components/common/ErrorBoundary';

const BombComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test crash in child component');
  }
  return <div>Healthy Child Content</div>;
};

describe('Work Package 7: ErrorBoundary & Error Recovery', () => {
  it('renders children cleanly when no runtime error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal Application View</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Application View')).toBeInTheDocument();
  });

  it('catches render error, logs it, and displays Horizon-styled recovery fallback', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallbackTitle="Custom View Failure">
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Custom View Failure')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return to Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear Cache & Reload/i })).toBeInTheDocument();

    spy.mockRestore();
  });

  it('resets error state when Try Again is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const handleReset = vi.fn();

    const Wrapper = () => {
      const [explode, setExplode] = useState(true);
      return (
        <ErrorBoundary onReset={() => { setExplode(false); handleReset(); }}>
          <BombComponent shouldThrow={explode} />
        </ErrorBoundary>
      );
    };

    render(<Wrapper />);

    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Click Try Again
    fireEvent.click(screen.getByRole('button', { name: /Try Again/i }));

    expect(handleReset).toHaveBeenCalled();
    expect(screen.getByText('Healthy Child Content')).toBeInTheDocument();

    spy.mockRestore();
  });

  it('toggles technical diagnostics visibility', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BombComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    const toggleBtn = screen.getByRole('button', { name: /Show Technical Diagnostics/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    const matches = screen.getAllByText(/Test crash in child component/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /Hide Technical Diagnostics/i })).toBeInTheDocument();

    spy.mockRestore();
  });
});
