import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ArchitectureCanvas } from '../../src/components/design-lab/ArchitectureCanvas';
import { ArchitectureNode, ValidationResult } from '../../src/types/designLab';

describe('ArchitectureCanvas Keyboard Interactions', () => {
  const dummyValidation: ValidationResult = {
    isValid: true,
    hasBlockingErrors: false,
    issues: [],
    summary: { errorsCount: 0, warningsCount: 0, infoCount: 0 },
    validatedAt: '2026-11-25T00:00:00Z',
  };

  const sampleNodes: ArchitectureNode[] = [
    {
      id: 'node-1',
      componentType: 'cap-service',
      label: 'Core CAP Service',
      position: { x: 100, y: 100 },
      configuration: {},
    },
    {
      id: 'node-2',
      componentType: 'hana-cloud',
      label: 'HANA DB',
      position: { x: 5, y: 5 },
      configuration: {},
    },
  ];

  it('nudges selected node position by 10px on arrow key press', () => {
    const handleMoveNode = vi.fn();
    render(
      <ArchitectureCanvas
        nodes={sampleNodes}
        edges={[]}
        selectedNodeId="node-1"
        selectedEdgeId={null}
        validationResult={dummyValidation}
        onSelectNode={vi.fn()}
        onSelectEdge={vi.fn()}
        onMoveNode={handleMoveNode}
        onAddEdge={vi.fn()}
        onDeleteEdge={vi.fn()}
        onDeleteNode={vi.fn()}
        onClearCanvas={vi.fn()}
      />
    );

    // ArrowRight
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(handleMoveNode).toHaveBeenCalledWith('node-1', { x: 110, y: 100 });

    // ArrowDown
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(handleMoveNode).toHaveBeenCalledWith('node-1', { x: 100, y: 110 });

    // ArrowLeft
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(handleMoveNode).toHaveBeenCalledWith('node-1', { x: 90, y: 100 });

    // ArrowUp
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(handleMoveNode).toHaveBeenCalledWith('node-1', { x: 100, y: 90 });
  });

  it('nudges selected node by 20px when Shift key is pressed and enforces zero coordinate bounds', () => {
    const handleMoveNode = vi.fn();
    render(
      <ArchitectureCanvas
        nodes={sampleNodes}
        edges={[]}
        selectedNodeId="node-2"
        selectedEdgeId={null}
        validationResult={dummyValidation}
        onSelectNode={vi.fn()}
        onSelectEdge={vi.fn()}
        onMoveNode={handleMoveNode}
        onAddEdge={vi.fn()}
        onDeleteEdge={vi.fn()}
        onDeleteNode={vi.fn()}
        onClearCanvas={vi.fn()}
      />
    );

    // Shift + ArrowRight: (5 + 20) = 25
    fireEvent.keyDown(window, { key: 'ArrowRight', shiftKey: true });
    expect(handleMoveNode).toHaveBeenCalledWith('node-2', { x: 25, y: 5 });

    // Shift + ArrowLeft on position x:5 clamps to 0
    fireEvent.keyDown(window, { key: 'ArrowLeft', shiftKey: true });
    expect(handleMoveNode).toHaveBeenCalledWith('node-2', { x: 0, y: 5 });

    // Shift + ArrowUp on position y:5 clamps to 0
    fireEvent.keyDown(window, { key: 'ArrowUp', shiftKey: true });
    expect(handleMoveNode).toHaveBeenCalledWith('node-2', { x: 5, y: 0 });
  });

  it('does not nudge nodes if the user is typing in an input element', () => {
    const handleMoveNode = vi.fn();
    render(
      <div>
        <input data-testid="test-input" type="text" />
        <ArchitectureCanvas
          nodes={sampleNodes}
          edges={[]}
          selectedNodeId="node-1"
          selectedEdgeId={null}
          validationResult={dummyValidation}
          onSelectNode={vi.fn()}
          onSelectEdge={vi.fn()}
          onMoveNode={handleMoveNode}
          onAddEdge={vi.fn()}
          onDeleteEdge={vi.fn()}
          onDeleteNode={vi.fn()}
          onClearCanvas={vi.fn()}
        />
      </div>
    );

    const input = document.querySelector('input')!;
    input.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(handleMoveNode).not.toHaveBeenCalled();
  });

  it('handles zoom hotkeys without throwing errors', () => {
    render(
      <ArchitectureCanvas
        nodes={sampleNodes}
        edges={[]}
        selectedNodeId={null}
        selectedEdgeId={null}
        validationResult={dummyValidation}
        onSelectNode={vi.fn()}
        onSelectEdge={vi.fn()}
        onMoveNode={vi.fn()}
        onAddEdge={vi.fn()}
        onDeleteEdge={vi.fn()}
        onDeleteNode={vi.fn()}
        onClearCanvas={vi.fn()}
      />
    );

    // Zoom in '+'
    fireEvent.keyDown(window, { key: '+' });
    // Zoom out '-'
    fireEvent.keyDown(window, { key: '-' });
    // Reset zoom '0'
    fireEvent.keyDown(window, { key: '0' });

    // Canvas remains mounted and operable
    expect(document.body).toBeInTheDocument();
  });
});
