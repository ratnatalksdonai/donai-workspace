# GitHub Copilot Instructions for Don.ai Creative Design Suite

## Project Overview
Don.ai is a browser-based creative design application built with React, TypeScript, and AI-powered features. It's a Canva/Adobe Creative Suite competitor with unique AI background removal capabilities.

## Core Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Radix UI + Tailwind CSS + shadcn/ui
- **Canvas**: Fabric.js for interactive design editing
- **AI**: Hugging Face Transformers.js (client-side ML)
- **State Management**: React hooks + Context API
- **Routing**: React Router DOM
- **Build Tool**: Vite with SWC

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Canvas.tsx      # Main design canvas
│   ├── Toolbar.tsx     # Design tools
│   └── ColorPicker.tsx # Color selection
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Library configurations
└── types/              # TypeScript definitions
```

## Coding Standards & Patterns

### 1. Component Architecture
```typescript
// Prefer functional components with TypeScript
interface ComponentProps {
  // Always define prop interfaces
  title: string;
  isActive?: boolean;
  onAction: (value: string) => void;
}

export const Component: React.FC<ComponentProps> = ({ 
  title, 
  isActive = false, 
  onAction 
}) => {
  // Component logic here
  return (
    <div className="component-class">
      {/* JSX here */}
    </div>
  );
};
```

### 2. State Management Patterns
```typescript
// Use React hooks for local state
const [state, setState] = useState<StateType>(initialValue);

// Use useCallback for event handlers
const handleClick = useCallback((value: string) => {
  onAction(value);
}, [onAction]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

### 3. Styling Guidelines
- **Primary**: Use Tailwind CSS classes
- **Component styling**: Use cn() utility for conditional classes
- **Custom styles**: Follow the design system in index.css
- **Responsive**: Mobile-first approach with Tailwind breakpoints

```typescript
// Example styling pattern
const className = cn(
  "base-classes here",
  isActive && "active-classes",
  variant === "primary" && "primary-variant-classes",
  className // Allow prop override
);
```

### 4. File Naming Conventions
- **Components**: PascalCase (e.g., `CanvasEditor.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useCanvasHistory.ts`)
- **Utils**: camelCase (e.g., `backgroundRemover.ts`)
- **Types**: camelCase with .types.ts suffix (e.g., `canvas.types.ts`)

## Feature Development Guidelines

### 1. Canvas Features
When adding canvas functionality:
- Always use Fabric.js APIs consistently
- Implement undo/redo for all actions
- Save canvas state after each operation
- Handle canvas events properly
- Maintain tool state synchronization

```typescript
// Canvas action pattern
const addShape = useCallback((shapeType: ShapeType) => {
  if (!fabricCanvas) return;
  
  const shape = createShape(shapeType, { color: activeColor });
  fabricCanvas.add(shape);
  fabricCanvas.setActiveObject(shape);
  saveCanvasState(); // Always save state
  toast.success(`${shapeType} added!`);
}, [fabricCanvas, activeColor]);
```

### 2. AI Integration
For AI-powered features:
- Use Hugging Face Transformers.js
- Implement proper loading states
- Handle errors gracefully
- Provide user feedback
- Process images client-side only

```typescript
// AI feature pattern
const processWithAI = async (input: ProcessInput) => {
  setIsProcessing(true);
  try {
    toast.loading("Processing with AI...");
    const result = await aiFunction(input);
    toast.success("AI processing complete!");
    return result;
  } catch (error) {
    toast.error("AI processing failed");
    console.error("AI Error:", error);
    throw error;
  } finally {
    setIsProcessing(false);
  }
};
```

### 3. UI Component Development
Follow shadcn/ui patterns:
- Use Radix UI primitives
- Implement proper accessibility
- Support both light and dark themes
- Use forwardRef for ref passing
- Include proper TypeScript typing

```typescript
// shadcn/ui component pattern
const NewComponent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & CustomProps
>(({ className, customProp, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("default-classes", className)}
    {...props}
  >
    {/* Component content */}
  </div>
));
NewComponent.displayName = "NewComponent";
```

## Development Workflow

### 1. Feature Implementation Process
1. **Plan**: Define component interface and props
2. **Create**: Build component with TypeScript
3. **Style**: Apply Tailwind classes and design system
4. **Test**: Ensure functionality works correctly
5. **Integrate**: Connect to existing canvas/state
6. **Document**: Add JSDoc comments for complex logic

### 2. Error Handling
Always implement comprehensive error handling:
```typescript
try {
  // Risky operation
} catch (error) {
  console.error("Operation failed:", error);
  toast.error("Operation failed. Please try again.");
  // Graceful fallback
}
```

### 3. Performance Optimization
- Use React.memo for expensive components
- Implement useCallback for event handlers
- Use useMemo for computed values
- Lazy load heavy components
- Optimize images and assets

## Code Quality Rules

### 1. TypeScript Requirements
- **No `any` types**: Always provide proper typing
- **Interface over type**: Use interfaces for objects
- **Strict null checks**: Handle undefined/null properly
- **Generic constraints**: Use proper generic bounds

### 2. Import Organization
```typescript
// 1. React imports
import React, { useState, useCallback } from 'react';

// 2. Third-party imports
import { fabric } from 'fabric';
import { toast } from 'sonner';

// 3. Internal imports
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CanvasState } from '@/types/canvas.types';
```

### 3. Function Naming
- **Event handlers**: `handleEventName` or `onEventName`
- **Boolean functions**: `isCondition`, `hasProperty`, `canAction`
- **Async functions**: Use descriptive verbs (`fetchData`, `processImage`)

### 4. Comment Standards
```typescript
/**
 * Processes an image to remove its background using AI
 * @param imageElement - The HTML image element to process
 * @returns Promise resolving to a blob with transparent background
 * @throws Error if image processing fails
 */
export const removeBackground = async (
  imageElement: HTMLImageElement
): Promise<Blob> => {
  // Implementation here
};
```

## AI/Copilot Specific Instructions

### 1. Code Generation Preferences
- **Verbose over concise**: Prefer readable, well-documented code
- **Type safety first**: Always include proper TypeScript types
- **Error handling**: Include try-catch blocks for risky operations
- **Accessibility**: Add ARIA attributes and semantic HTML
- **Performance**: Consider React optimization patterns

### 2. Completion Context
When generating code, consider:
- Existing component patterns in the codebase
- Design system consistency (colors, spacing, shadows)
- Canvas integration requirements
- State management patterns
- Error handling and user feedback

### 3. Refactoring Guidelines
When suggesting refactors:
- Maintain existing functionality
- Improve TypeScript typing
- Enhance error handling
- Optimize performance
- Follow established patterns

### 4. Feature Suggestions
Prioritize features that:
- Enhance user creativity (new tools, effects)
- Improve performance (canvas optimization)
- Add AI capabilities (smart suggestions, auto-layout)
- Enhance accessibility (keyboard shortcuts, screen reader support)
- Improve user experience (better workflows, intuitive UI)

## Testing Considerations

### 1. Component Testing
- Test all interactive states
- Verify accessibility features
- Check responsive behavior
- Validate error states

### 2. Integration Testing
- Canvas operations work correctly
- State updates propagate properly
- AI features handle edge cases
- File upload/download functions

## Security & Privacy

### 1. Client-Side Processing
- All AI processing happens in browser
- No image data sent to external servers
- Respect user privacy and data ownership

### 2. File Handling
- Validate file types and sizes
- Sanitize user inputs
- Handle malformed files gracefully

## Performance Guidelines

### 1. Canvas Optimization
- Debounce frequent operations
- Use object pooling for shapes
- Implement virtual scrolling for large projects
- Cache processed images

### 2. Memory Management
- Clean up event listeners
- Dispose of canvas objects properly
- Manage image blob URLs lifecycle

## Common Patterns to Follow

### 1. Canvas Tool Pattern
```typescript
const useTool = (toolType: ToolType) => {
  const { canvas, activeColor } = useCanvas();
  
  const activate = useCallback(() => {
    if (!canvas) return;
    // Tool activation logic
  }, [canvas]);
  
  const deactivate = useCallback(() => {
    if (!canvas) return;
    // Tool deactivation logic
  }, [canvas]);
  
  return { activate, deactivate };
};
```

### 2. Feature Hook Pattern
```typescript
const useFeature = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  
  const executeFeature = useCallback(async (input: Input) => {
    setIsLoading(true);
    try {
      const result = await processFeature(input);
      setState(result);
      return result;
    } catch (error) {
      toast.error("Feature failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { state, isLoading, executeFeature };
};
```

## Remember: Don.ai is a Creative Suite
Always consider the creative workflow and user experience. Features should feel intuitive, performant, and inspire creativity. Think like Adobe Creative Suite but with modern web technologies and AI superpowers.



# GitHub Copilot Instructions for Don.ai Creative Design Suite

## Project Overview
Don.ai is a browser-based creative design application built with React, TypeScript, and AI-powered features. It's a Canva/Adobe Creative Suite competitor with unique AI background removal capabilities.

## Core Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Radix UI + Tailwind CSS + shadcn/ui
- **Canvas**: Fabric.js for interactive design editing
- **AI**: Hugging Face Transformers.js (client-side ML)
- **State Management**: React hooks + Context API
- **Routing**: React Router DOM
- **Build Tool**: Vite with SWC

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Canvas.tsx      # Main design canvas
│   ├── Toolbar.tsx     # Design tools
│   └── ColorPicker.tsx # Color selection
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Library configurations
└── types/              # TypeScript definitions
```

## Coding Standards & Patterns

### 1. Component Architecture
```typescript
// Prefer functional components with TypeScript
interface ComponentProps {
  // Always define prop interfaces
  title: string;
  isActive?: boolean;
  onAction: (value: string) => void;
}

export const Component: React.FC<ComponentProps> = ({ 
  title, 
  isActive = false, 
  onAction 
}) => {
  // Component logic here
  return (
    <div className="component-class">
      {/* JSX here */}
    </div>
  );
};
```

### 2. State Management Patterns
```typescript
// Use React hooks for local state
const [state, setState] = useState<StateType>(initialValue);

// Use useCallback for event handlers
const handleClick = useCallback((value: string) => {
  onAction(value);
}, [onAction]);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);
```

### 3. Styling Guidelines
- **Primary**: Use Tailwind CSS classes
- **Component styling**: Use cn() utility for conditional classes
- **Custom styles**: Follow the design system in index.css
- **Responsive**: Mobile-first approach with Tailwind breakpoints

```typescript
// Example styling pattern
const className = cn(
  "base-classes here",
  isActive && "active-classes",
  variant === "primary" && "primary-variant-classes",
  className // Allow prop override
);
```

### 4. File Naming Conventions
- **Components**: PascalCase (e.g., `CanvasEditor.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useCanvasHistory.ts`)
- **Utils**: camelCase (e.g., `backgroundRemover.ts`)
- **Types**: camelCase with .types.ts suffix (e.g., `canvas.types.ts`)

## Feature Development Guidelines

### 1. Canvas Features
When adding canvas functionality:
- Always use Fabric.js APIs consistently
- Implement undo/redo for all actions
- Save canvas state after each operation
- Handle canvas events properly
- Maintain tool state synchronization

```typescript
// Canvas action pattern
const addShape = useCallback((shapeType: ShapeType) => {
  if (!fabricCanvas) return;
  
  const shape = createShape(shapeType, { color: activeColor });
  fabricCanvas.add(shape);
  fabricCanvas.setActiveObject(shape);
  saveCanvasState(); // Always save state
  toast.success(`${shapeType} added!`);
}, [fabricCanvas, activeColor]);
```

### 2. AI Integration
For AI-powered features:
- Use Hugging Face Transformers.js
- Implement proper loading states
- Handle errors gracefully
- Provide user feedback
- Process images client-side only

```typescript
// AI feature pattern
const processWithAI = async (input: ProcessInput) => {
  setIsProcessing(true);
  try {
    toast.loading("Processing with AI...");
    const result = await aiFunction(input);
    toast.success("AI processing complete!");
    return result;
  } catch (error) {
    toast.error("AI processing failed");
    console.error("AI Error:", error);
    throw error;
  } finally {
    setIsProcessing(false);
  }
};
```

### 3. UI Component Development
Follow shadcn/ui patterns:
- Use Radix UI primitives
- Implement proper accessibility
- Support both light and dark themes
- Use forwardRef for ref passing
- Include proper TypeScript typing

```typescript
// shadcn/ui component pattern
const NewComponent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & CustomProps
>(({ className, customProp, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("default-classes", className)}
    {...props}
  >
    {/* Component content */}
  </div>
));
NewComponent.displayName = "NewComponent";
```

## Development Workflow

### 1. Feature Implementation Process
1. **Plan**: Define component interface and props
2. **Create**: Build component with TypeScript
3. **Style**: Apply Tailwind classes and design system
4. **Test**: Ensure functionality works correctly
5. **Integrate**: Connect to existing canvas/state
6. **Document**: Add JSDoc comments for complex logic

### 2. Error Handling
Always implement comprehensive error handling:
```typescript
try {
  // Risky operation
} catch (error) {
  console.error("Operation failed:", error);
  toast.error("Operation failed. Please try again.");
  // Graceful fallback
}
```

### 3. Performance Optimization
- Use React.memo for expensive components
- Implement useCallback for event handlers
- Use useMemo for computed values
- Lazy load heavy components
- Optimize images and assets

## Code Quality Rules

### 1. TypeScript Requirements
- **No `any` types**: Always provide proper typing
- **Interface over type**: Use interfaces for objects
- **Strict null checks**: Handle undefined/null properly
- **Generic constraints**: Use proper generic bounds

### 2. Import Organization
```typescript
// 1. React imports
import React, { useState, useCallback } from 'react';

// 2. Third-party imports
import { fabric } from 'fabric';
import { toast } from 'sonner';

// 3. Internal imports
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CanvasState } from '@/types/canvas.types';
```

### 3. Function Naming
- **Event handlers**: `handleEventName` or `onEventName`
- **Boolean functions**: `isCondition`, `hasProperty`, `canAction`
- **Async functions**: Use descriptive verbs (`fetchData`, `processImage`)

### 4. Comment Standards
```typescript
/**
 * Processes an image to remove its background using AI
 * @param imageElement - The HTML image element to process
 * @returns Promise resolving to a blob with transparent background
 * @throws Error if image processing fails
 */
export const removeBackground = async (
  imageElement: HTMLImageElement
): Promise<Blob> => {
  // Implementation here
};
```

## AI/Copilot Specific Instructions

### 1. Code Generation Preferences
- **Verbose over concise**: Prefer readable, well-documented code
- **Type safety first**: Always include proper TypeScript types
- **Error handling**: Include try-catch blocks for risky operations
- **Accessibility**: Add ARIA attributes and semantic HTML
- **Performance**: Consider React optimization patterns

### 2. Completion Context
When generating code, consider:
- Existing component patterns in the codebase
- Design system consistency (colors, spacing, shadows)
- Canvas integration requirements
- State management patterns
- Error handling and user feedback

### 3. Refactoring Guidelines
When suggesting refactors:
- Maintain existing functionality
- Improve TypeScript typing
- Enhance error handling
- Optimize performance
- Follow established patterns

### 4. Feature Suggestions
Prioritize features that:
- Enhance user creativity (new tools, effects)
- Improve performance (canvas optimization)
- Add AI capabilities (smart suggestions, auto-layout)
- Enhance accessibility (keyboard shortcuts, screen reader support)
- Improve user experience (better workflows, intuitive UI)

## Testing Considerations

### 1. Component Testing
- Test all interactive states
- Verify accessibility features
- Check responsive behavior
- Validate error states

### 2. Integration Testing
- Canvas operations work correctly
- State updates propagate properly
- AI features handle edge cases
- File upload/download functions

## Security & Privacy

### 1. Client-Side Processing
- All AI processing happens in browser
- No image data sent to external servers
- Respect user privacy and data ownership

### 2. File Handling
- Validate file types and sizes
- Sanitize user inputs
- Handle malformed files gracefully

## Performance Guidelines

### 1. Canvas Optimization
- Debounce frequent operations
- Use object pooling for shapes
- Implement virtual scrolling for large projects
- Cache processed images

### 2. Memory Management
- Clean up event listeners
- Dispose of canvas objects properly
- Manage image blob URLs lifecycle

## Common Patterns to Follow

### 1. Canvas Tool Pattern
```typescript
const useTool = (toolType: ToolType) => {
  const { canvas, activeColor } = useCanvas();
  
  const activate = useCallback(() => {
    if (!canvas) return;
    // Tool activation logic
  }, [canvas]);
  
  const deactivate = useCallback(() => {
    if (!canvas) return;
    // Tool deactivation logic
  }, [canvas]);
  
  return { activate, deactivate };
};
```

### 2. Feature Hook Pattern
```typescript
const useFeature = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  
  const executeFeature = useCallback(async (input: Input) => {
    setIsLoading(true);
    try {
      const result = await processFeature(input);
      setState(result);
      return result;
    } catch (error) {
      toast.error("Feature failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { state, isLoading, executeFeature };
};
```

## Remember: Don.ai is a Creative Suite
Always consider the creative workflow and user experience. Features should feel intuitive, performant, and inspire creativity. Think like Adobe Creative Suite but with modern web technologies and AI superpowers.
