import { fabric } from 'fabric';

/**
 * Canvas tool types for Don.ai Creative Suite
 */
export type ToolType = "select" | "draw" | "rectangle" | "circle" | "text";

/**
 * Canvas state interface for undo/redo functionality
 */
export interface CanvasState {
  objects: any[];
  background?: string;
  timestamp: number;
}

/**
 * Shape creation options
 */
export interface ShapeOptions {
  color: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  radius?: number;
}

/**
 * AI processing input interface
 */
export interface ProcessInput {
  imageElement: HTMLImageElement;
  options?: {
    preserveEdges?: boolean;
    smoothing?: number;
    confidenceThreshold?: number;
  };
}

/**
 * Canvas event types
 */
export interface CanvasEventHandlers {
  onObjectAdded?: (e: fabric.IEvent) => void;
  onObjectModified?: (e: fabric.IEvent) => void;
  onSelectionCreated?: (e: fabric.IEvent) => void;
  onSelectionUpdated?: (e: fabric.IEvent) => void;
  onSelectionCleared?: (e: fabric.IEvent) => void;
}

/**
 * Background removal options
 */
export interface BackgroundRemovalOptions {
  preserveEdges?: boolean;
  smoothing?: number;
  confidenceThreshold?: number;
}
