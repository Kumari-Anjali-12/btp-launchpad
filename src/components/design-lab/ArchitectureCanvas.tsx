import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ArchitectureNode,
  ArchitectureEdge,
  ValidationResult,
  ConnectionType,
} from '../../types/designLab';
import { COMPONENT_CATALOGUE } from '../../data/designLab/catalogue';
import { isValidConnection, isForbiddenConnection } from '../../data/designLab/connectionRules';
import { ICON_MAP, CATEGORY_COLORS } from './paletteConfig';
import { CanvasControls } from './CanvasControls';
import {
  Boxes,
  X,
  AlertOctagon,
  AlertTriangle,
} from 'lucide-react';

export interface ArchitectureCanvasProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  validationResult: ValidationResult;
  onSelectNode: (nodeId: string | null) => void;
  onSelectEdge: (edgeId: string | null) => void;
  onMoveNode: (nodeId: string, position: { x: number; y: number }) => void;
  onAddEdge: (sourceNodeId: string, targetNodeId: string, connectionType: ConnectionType) => void;
  onDeleteEdge: (edgeId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onClearCanvas: () => void;
}

const EDGE_COLORS: Record<ConnectionType, string> = {
  'http-route': '#0070f2', // SAP Blue
  'service-binding': '#107e3e', // SAP Forest Green
  persistence: '#8944ab', // Purple
  'auth-check': '#f59e0b', // Amber
  'destination-lookup': '#008db8', // Cyan
  'connectivity-tunnel': '#06b6d4', // Bright Cyan
  'data-sync': '#e11d48', // Rose
};

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

export const ArchitectureCanvas: React.FC<ArchitectureCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  validationResult,
  onSelectNode,
  onSelectEdge,
  onMoveNode,
  onAddEdge,
  onDeleteEdge,
  onDeleteNode,
  onClearCanvas,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging Node state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Connecting Ports state
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [connectionNotice, setConnectionNotice] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Nodes with validation issues
  const errorNodeIds = new Set<string>();
  const warningNodeIds = new Set<string>();
  for (const issue of validationResult.issues) {
    if (issue.severity === 'error') {
      issue.affectedNodeIds.forEach((id) => errorNodeIds.add(id));
    } else if (issue.severity === 'warning') {
      issue.affectedNodeIds.forEach((id) => warningNodeIds.add(id));
    }
  }

  // Keyboard navigation / deletion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'SELECT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId) {
          onDeleteNode(selectedNodeId);
          onSelectNode(null);
        } else if (selectedEdgeId) {
          onDeleteEdge(selectedEdgeId);
          onSelectEdge(null);
        }
      } else if (e.key === 'Escape') {
        onSelectNode(null);
        onSelectEdge(null);
        setConnectingSourceId(null);
        setConnectionNotice(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, selectedEdgeId, onDeleteNode, onDeleteEdge, onSelectNode, onSelectEdge]);

  // Convert client coordinates to canvas coordinates (accounting for pan and zoom)
  const clientToCanvasCoords = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left - panOffset.x) / zoomLevel;
      const y = (clientY - rect.top - panOffset.y) / zoomLevel;
      return { x, y };
    },
    [panOffset, zoomLevel]
  );

  // Handle pointer down on background for panning
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    // Only pan if clicking on empty canvas background
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      onSelectNode(null);
      onSelectEdge(null);
      setConnectingSourceId(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
      return;
    }

    if (draggingNodeId) {
      const { x, y } = clientToCanvasCoords(e.clientX, e.clientY);
      onMoveNode(draggingNodeId, {
        x: Math.max(0, Math.round(x - dragOffset.x)),
        y: Math.max(0, Math.round(y - dragOffset.y)),
      });
      return;
    }

    if (connectingSourceId) {
      const coords = clientToCanvasCoords(e.clientX, e.clientY);
      setCursorPos(coords);
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    if (connectingSourceId) {
      setConnectingSourceId(null);
    }
  };

  // Node Drag Start
  const handleNodePointerDown = (e: React.PointerEvent, node: ArchitectureNode) => {
    e.stopPropagation();
    onSelectNode(node.id);
    onSelectEdge(null);

    const coords = clientToCanvasCoords(e.clientX, e.clientY);
    setDraggingNodeId(node.id);
    setDragOffset({
      x: coords.x - node.position.x,
      y: coords.y - node.position.y,
    });
  };

  // Port Output Connect Start
  const handlePortPointerDown = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingSourceId(nodeId);
    setConnectionNotice(null);
    const coords = clientToCanvasCoords(e.clientX, e.clientY);
    setCursorPos(coords);
  };

  // Port Input Connect End
  const handlePortPointerUp = (e: React.PointerEvent, targetNodeId: string) => {
    e.stopPropagation();
    if (!connectingSourceId || connectingSourceId === targetNodeId) {
      setConnectingSourceId(null);
      return;
    }

    const sourceNode = nodes.find((n) => n.id === connectingSourceId);
    const targetNode = nodes.find((n) => n.id === targetNodeId);

    if (!sourceNode || !targetNode) {
      setConnectingSourceId(null);
      return;
    }

    // Security check
    const forbidden = isForbiddenConnection(sourceNode.componentType, targetNode.componentType);
    if (forbidden.forbidden) {
      setConnectionNotice(forbidden.reason || 'Connection prohibited by enterprise architecture rules.');
      setConnectingSourceId(null);
      return;
    }

    // Rule check
    const rule = isValidConnection(sourceNode.componentType, targetNode.componentType);
    if (!rule) {
      setConnectionNotice(
        `Cannot connect ${sourceNode.label} to ${targetNode.label}. Not a supported relationship in SAP BTP.`
      );
      setConnectingSourceId(null);
      return;
    }

    // Valid: create edge
    onAddEdge(sourceNode.id, targetNode.id, rule.connectionType);
    setConnectingSourceId(null);
    setConnectionNotice(null);
  };

  // Fit View
  const handleFitView = () => {
    if (nodes.length === 0) {
      setZoomLevel(1);
      setPanOffset({ x: 20, y: 20 });
      return;
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of nodes) {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + NODE_WIDTH);
      maxY = Math.max(maxY, node.position.y + NODE_HEIGHT);
    }

    const containerWidth = containerRef.current?.clientWidth || 800;
    const containerHeight = containerRef.current?.clientHeight || 600;

    const graphWidth = maxX - minX + 100;
    const graphHeight = maxY - minY + 100;

    const scaleX = containerWidth / graphWidth;
    const scaleY = containerHeight / graphHeight;
    const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.5), 1.2);

    setZoomLevel(newZoom);
    setPanOffset({
      x: (containerWidth - (maxX + minX) * newZoom) / 2,
      y: (containerHeight - (maxY + minY) * newZoom) / 2,
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 40, y: 40 });
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      tabIndex={0}
      aria-label="SAP BTP Architecture Canvas"
      className="relative flex-1 w-full h-full overflow-hidden bg-slate-50 dark:bg-[#121316] select-none focus:outline-none"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(148, 163, 184, 0.2) 1px, transparent 1px)`,
        backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
        backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
        cursor: isPanning ? 'grabbing' : connectingSourceId ? 'crosshair' : 'default',
      }}
    >
      {/* Toast Notice for Connection Violations */}
      {connectionNotice && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 max-w-lg rounded-xl border border-rose-300 bg-rose-50 p-3 shadow-lg dark:border-rose-800 dark:bg-rose-950/90 text-xs flex items-start gap-2.5">
          <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-rose-900 dark:text-rose-200">
            {connectionNotice}
          </div>
          <button
            type="button"
            onClick={() => setConnectionNotice(null)}
            className="text-rose-400 hover:text-rose-700 p-0.5"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* SVG Canvas for Edges */}
      <svg
        className="absolute inset-0 pointer-events-none w-full h-full overflow-visible"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: '0 0',
        }}
      >
        <defs>
          {/* Arrow markers for each connection type */}
          {(Object.keys(EDGE_COLORS) as ConnectionType[]).map((type) => (
            <marker
              key={type}
              id={`arrow-${type}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={EDGE_COLORS[type]} />
            </marker>
          ))}
          <marker
            id="arrow-connecting"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0070f2" />
          </marker>
        </defs>

        {/* Existing Edges */}
        {edges.map((edge) => {
          const source = nodes.find((n) => n.id === edge.sourceNodeId);
          const target = nodes.find((n) => n.id === edge.targetNodeId);
          if (!source || !target) return null;

          const isSelected = selectedEdgeId === edge.id;
          const strokeColor = EDGE_COLORS[edge.connectionType] || '#64748b';

          // Coordinates from Right Port of Source to Left Port of Target
          const startX = source.position.x + NODE_WIDTH;
          const startY = source.position.y + NODE_HEIGHT / 2;
          const endX = target.position.x;
          const endY = target.position.y + NODE_HEIGHT / 2;

          const dx = Math.max(Math.abs(endX - startX) * 0.5, 40);
          const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;

          return (
            <g key={edge.id} className="pointer-events-auto cursor-pointer">
              {/* Invisible wide stroke for easy clicking */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth="16"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEdge(edge.id);
                  onSelectNode(null);
                }}
              />
              {/* Visible Path */}
              <path
                d={pathD}
                fill="none"
                stroke={isSelected ? '#f59e0b' : strokeColor}
                strokeWidth={isSelected ? '3' : '2'}
                strokeDasharray={
                  edge.connectionType === 'service-binding'
                    ? '5,5'
                    : edge.connectionType === 'connectivity-tunnel'
                    ? '3,3'
                    : 'none'
                }
                markerEnd={`url(#arrow-${edge.connectionType})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEdge(edge.id);
                  onSelectNode(null);
                }}
              />
              {/* Edge Label Badge */}
              <g
                transform={`translate(${midX}, ${midY})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEdge(edge.id);
                  onSelectNode(null);
                }}
              >
                <rect
                  x="-36"
                  y="-10"
                  width="72"
                  height="18"
                  rx="9"
                  fill="#ffffff"
                  stroke={isSelected ? '#f59e0b' : '#cbd5e1'}
                  strokeWidth="1"
                  className="dark:fill-slate-900 dark:stroke-slate-700 shadow-2xs"
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill={isSelected ? '#b45309' : '#475569'}
                  className="dark:fill-slate-300 select-none"
                >
                  {edge.label || edge.connectionType}
                </text>
              </g>
            </g>
          );
        })}

        {/* Live Connecting Line Preview */}
        {connectingSourceId && (() => {
          const source = nodes.find((n) => n.id === connectingSourceId);
          if (!source) return null;
          const startX = source.position.x + NODE_WIDTH;
          const startY = source.position.y + NODE_HEIGHT / 2;
          const endX = cursorPos.x;
          const endY = cursorPos.y;
          const dx = Math.max(Math.abs(endX - startX) * 0.5, 40);
          const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

          return (
            <path
              d={pathD}
              fill="none"
              stroke="#0070f2"
              strokeWidth="2.5"
              strokeDasharray="6,4"
              markerEnd="url(#arrow-connecting)"
            />
          );
        })()}
      </svg>

      {/* Nodes DOM Layer */}
      <div
        className="absolute inset-0 pointer-events-none w-full h-full"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: '0 0',
        }}
      >
        {nodes.map((node) => {
          const def = COMPONENT_CATALOGUE[node.componentType];
          const IconComp = def ? ICON_MAP[def.iconName] || Boxes : Boxes;
          const colors = def ? CATEGORY_COLORS[def.category] : CATEGORY_COLORS.deployment;

          const isSelected = selectedNodeId === node.id;
          const hasError = errorNodeIds.has(node.id);
          const hasWarning = warningNodeIds.has(node.id);

          let ringStyle = 'border-slate-200 dark:border-slate-700';
          if (isSelected) {
            ringStyle = 'ring-2 ring-sap-blue-500 border-sap-blue-500 shadow-md';
          } else if (hasError) {
            ringStyle = 'ring-2 ring-rose-500 border-rose-400';
          } else if (hasWarning) {
            ringStyle = 'ring-2 ring-amber-500 border-amber-400';
          }

          return (
            <div
              key={node.id}
              tabIndex={0}
              onPointerDown={(e) => handleNodePointerDown(e, node)}
              aria-label={`${node.customName || node.label} architecture component`}
              className={`absolute pointer-events-auto rounded-xl bg-white dark:bg-sap-slate-900 border p-3 cursor-grab active:cursor-grabbing transition-shadow select-none ${ringStyle}`}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                width: `${NODE_WIDTH}px`,
                height: `${NODE_HEIGHT}px`,
              }}
            >
              {/* Left Input Port Handle */}
              <div
                onPointerUp={(e) => handlePortPointerUp(e, node.id)}
                title="Input Port (Drop connection here)"
                aria-label={`Input port for ${node.label}`}
                className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-white bg-slate-400 hover:bg-sap-blue-600 hover:scale-125 dark:border-slate-900 transition-all flex items-center justify-center cursor-pointer shadow-xs"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Right Output Port Handle */}
              <div
                onPointerDown={(e) => handlePortPointerDown(e, node.id)}
                title="Output Port (Drag to connect)"
                aria-label={`Output port for ${node.label}`}
                className="absolute -right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-white bg-sap-blue-600 hover:bg-sap-blue-700 hover:scale-125 dark:border-slate-900 transition-all flex items-center justify-center cursor-pointer shadow-xs"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Node Card Content */}
              <div className="flex items-center gap-2.5 h-full">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  <IconComp className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate block">
                      {node.customName || node.label}
                    </span>
                    {hasError ? (
                      <AlertOctagon className="h-3 w-3 text-rose-500 shrink-0" />
                    ) : hasWarning ? (
                      <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
                    ) : null}
                  </div>
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase tracking-wider mt-0.5 ${colors.bg} ${colors.text}`}
                  >
                    {def?.badgeText || node.componentType}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Canvas Controls */}
      <CanvasControls
        zoomLevel={zoomLevel}
        onZoomIn={() => setZoomLevel((z) => Math.min(z + 0.15, 2))}
        onZoomOut={() => setZoomLevel((z) => Math.max(z - 0.15, 0.4))}
        onResetView={handleResetView}
        onFitView={handleFitView}
        onClearCanvas={onClearCanvas}
        nodeCount={nodes.length}
      />
    </div>
  );
};
