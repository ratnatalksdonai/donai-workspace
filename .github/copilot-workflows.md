# GitHub Copilot Development Workflows for Don.ai

## Quick Start Commands

### Development Setup
```bash
# Install dependencies
npm install

# Start development with auto-commit
npm run dev:auto

# Start development only
npm run dev

# Manual commit
npm run commit
```

### Common Development Tasks

#### 1. Adding a New Canvas Tool
When I say "add [tool name] tool":

1. **Create tool component**:
```typescript
// src/components/tools/[ToolName]Tool.tsx
interface ToolNameToolProps {
  isActive: boolean;
  onActivate: () => void;
  canvas: fabric.Canvas | null;
}

export const ToolNameTool: React.FC<ToolNameToolProps> = ({
  isActive,
  onActivate,
  canvas
}) => {
  // Tool implementation
};
```

2. **Add to Toolbar**:
```typescript
// Update src/components/Toolbar.tsx
const tools = [
  // ...existing tools
  { id: "toolname" as const, icon: ToolIcon, label: "Tool Name" },
];
```

3. **Implement tool logic**:
```typescript
// Add to Canvas.tsx
const handleToolNameClick = useCallback(() => {
  if (!fabricCanvas) return;
  
  // Tool-specific logic
  const object = new fabric.ToolObject({
    // Tool properties
  });
  
  fabricCanvas.add(object);
  saveCanvasState();
  toast.success("Tool applied!");
}, [fabricCanvas]);
```

#### 2. Adding AI Features
When I say "add AI [feature]":

1. **Create AI utility**:
```typescript
// src/utils/ai/[feature].ts
export const processWithAI = async (input: InputType): Promise<OutputType> => {
  const { processor, model } = await initializeModel();
  
  try {
    const result = await model(processor(input));
    return result;
  } catch (error) {
    console.error('AI processing failed:', error);
    throw error;
  }
};
```

2. **Create hook**:
```typescript
// src/hooks/useAI[Feature].ts
export const useAIFeature = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const process = useCallback(async (input: InputType) => {
    setIsProcessing(true);
    toast.loading("AI processing...");
    
    try {
      const result = await processWithAI(input);
      toast.success("AI processing complete!");
      return result;
    } catch (error) {
      toast.error("AI processing failed");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  return { process, isProcessing };
};
```

#### 3. Adding UI Components
When I say "create [component name]":

1. **Follow shadcn/ui pattern**:
```typescript
// src/components/ui/[component-name].tsx
const ComponentName = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & ComponentProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("component-styles", className)}
    {...props}
  />
));
ComponentName.displayName = "ComponentName";

export { ComponentName };
```

#### 4. Adding New Pages/Routes
When I say "create [page name] page":

1. **Create page component**:
```typescript
// src/pages/[PageName].tsx
const PageName = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto">
        {/* Page content */}
      </main>
    </div>
  );
};

export default PageName;
```

2. **Add to navigation**:
```typescript
// Update src/nav-items.tsx
export const navItems = [
  // ...existing items
  {
    title: "Page Name",
    to: "/page-route",
    icon: <PageIcon className="h-4 w-4" />,
    page: <PageName />,
  },
];
```

## Feature-Specific Workflows

### Canvas Features
When working on canvas features:
- Always check `if (!fabricCanvas) return;`
- Call `saveCanvasState()` after modifications
- Use `fabricCanvas.renderAll()` if manual render needed
- Handle object selection with `fabricCanvas.getActiveObject()`

### Color System
When adding color features:
- Use HSL color format (design system requirement)
- Support both light and dark themes
- Use the color picker component pattern
- Store colors in canvas object properties

### Export/Import Features
When adding import/export:
- Handle multiple file formats
- Validate file types and sizes
- Show progress indicators for large operations
- Implement error recovery

### Performance Features
When optimizing performance:
- Use `React.memo` for expensive components
- Implement virtualization for large lists
- Debounce user inputs (especially canvas operations)
- Use Web Workers for heavy computations

## Code Patterns Library

### 1. Canvas Event Handler Pattern
```typescript
const handleCanvasEvent = useCallback((e: fabric.IEvent) => {
  if (!fabricCanvas) return;
  
  const target = e.target;
  if (!target) return;
  
  // Event logic here
  saveCanvasState();
}, [fabricCanvas]);

// Setup
useEffect(() => {
  if (!fabricCanvas) return;
  
  fabricCanvas.on('object:modified', handleCanvasEvent);
  return () => fabricCanvas.off('object:modified', handleCanvasEvent);
}, [fabricCanvas, handleCanvasEvent]);
```

### 2. File Upload Pattern
```typescript
const handleFileUpload = useCallback(async (file: File) => {
  if (!file || !fabricCanvas) return;
  
  try {
    const img = await loadImage(file);
    const fabricImg = new fabric.Image(img, {
      left: 50,
      top: 50,
      scaleX: 0.5,
      scaleY: 0.5,
    });
    
    fabricCanvas.add(fabricImg);
    fabricCanvas.setActiveObject(fabricImg);
    saveCanvasState();
    toast.success("Image uploaded!");
  } catch (error) {
    toast.error("Failed to upload image");
    console.error("Upload error:", error);
  }
}, [fabricCanvas]);
```

### 3. Tool Activation Pattern
```typescript
const activateTool = useCallback((toolType: ToolType) => {
  if (!fabricCanvas) return;
  
  // Deactivate current tool
  fabricCanvas.defaultCursor = 'default';
  fabricCanvas.hoverCursor = 'default';
  fabricCanvas.isDrawingMode = false;
  
  // Activate new tool
  switch (toolType) {
    case 'draw':
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.freeDrawingBrush.color = activeColor;
      break;
    case 'select':
      fabricCanvas.defaultCursor = 'default';
      break;
    // Add other tools
  }
  
  setActiveTool(toolType);
}, [fabricCanvas, activeColor]);
```

## Integration Patterns

### State Management
```typescript
// Context pattern for global state
const CanvasContext = createContext<CanvasContextType | null>(null);

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within CanvasProvider');
  }
  return context;
};
```

### Theme Integration
```typescript
// Theme-aware component
const ThemedComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "base-styles",
      theme === "dark" ? "dark-styles" : "light-styles"
    )}>
      {/* Content */}
    </div>
  );
};
```

## Common Requests & Responses

### "Add undo/redo functionality"
```typescript
const useCanvasHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  const saveState = useCallback((canvas: fabric.Canvas) => {
    const state = JSON.stringify(canvas.toObject());
    setHistory(prev => [...prev.slice(0, currentIndex + 1), state]);
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);
  
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      // Load previous state
    }
  }, [currentIndex]);
  
  return { saveState, undo, canUndo: currentIndex > 0 };
};
```

### "Add keyboard shortcuts"
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'z':
          e.preventDefault();
          e.shiftKey ? redo() : undo();
          break;
        case 's':
          e.preventDefault();
          exportCanvas();
          break;
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [undo, redo, exportCanvas]);
```

### "Add responsive design"
```typescript
const useResponsiveCanvas = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('canvas-container');
      if (container) {
        const { width } = container.getBoundingClientRect();
        setDimensions({
          width: Math.min(width - 40, 1200),
          height: Math.min((width - 40) * 0.75, 800)
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  return dimensions;
};
```

## Auto-Commit Integration

The project has auto-commit functionality. When you make changes:

1. **Files are automatically staged and committed**
2. **Commit messages are generated based on changes**
3. **Changes are pushed to remote automatically**

To work with this:
- Make focused, incremental changes
- The system will create meaningful commit messages
- Use `npm run commit` for manual commits with custom messages

## Remember

This is a creative design application. Always prioritize:
- **User experience**: Intuitive, responsive, delightful
- **Performance**: Smooth canvas operations, fast AI processing
- **Creativity**: Enable users to create amazing designs
- **Innovation**: Leverage AI to provide unique capabilities

Think like you're building the next generation of creative tools!
