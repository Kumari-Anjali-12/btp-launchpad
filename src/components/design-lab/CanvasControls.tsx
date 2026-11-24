import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Trash2 } from 'lucide-react';

export interface CanvasControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onFitView: () => void;
  onClearCanvas: () => void;
  nodeCount: number;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetView,
  onFitView,
  onClearCanvas,
  nodeCount,
}) => {
  return (
    <div
      aria-label="Canvas Zoom and Navigation Controls"
      className="absolute bottom-4 left-4 z-20 flex items-center gap-1 rounded-xl border border-slate-200/90 bg-white/95 p-1.5 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-sap-slate-900/95"
    >
      <button
        type="button"
        onClick={onZoomIn}
        aria-label="Zoom In Canvas"
        title="Zoom In (+)"
        disabled={zoomLevel >= 2}
        className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
      >
        <ZoomIn className="h-4 w-4" />
      </button>

      <span className="min-w-[42px] text-center font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 select-none">
        {Math.round(zoomLevel * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomOut}
        aria-label="Zoom Out Canvas"
        title="Zoom Out (-)"
        disabled={zoomLevel <= 0.4}
        className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
      >
        <ZoomOut className="h-4 w-4" />
      </button>

      <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />

      <button
        type="button"
        onClick={onFitView}
        aria-label="Fit Canvas to Content"
        title="Fit Content to View"
        className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
      >
        <Maximize2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onResetView}
        aria-label="Reset Canvas View"
        title="Reset Zoom to 100%"
        className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
      </button>

      {nodeCount > 0 && (
        <>
          <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <button
            type="button"
            onClick={onClearCanvas}
            aria-label="Clear Canvas Blueprint"
            title="Clear all components from canvas"
            className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};
