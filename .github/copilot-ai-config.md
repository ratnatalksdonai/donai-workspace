# AI-Powered Features Configuration for Don.ai

## Claude Opus-Style Reasoning

When implementing AI features, follow this reasoning pattern:

### 1. Problem Analysis
- **Understand the creative workflow**: How does this feature fit into a designer's process?
- **Identify constraints**: Performance, browser limitations, user privacy
- **Consider edge cases**: Different image formats, large files, error scenarios

### 2. Solution Architecture
- **Break down complex problems**: Divide AI tasks into manageable steps
- **Design for composability**: Make AI features work together seamlessly
- **Plan for scalability**: Consider how features will work with large projects

### 3. Implementation Strategy
- **Prioritize user feedback**: Always show progress and results clearly
- **Handle errors gracefully**: Provide meaningful error messages and recovery options
- **Optimize for perceived performance**: Use loading states, progressive results

## AI Feature Development Patterns

### 1. Model Loading Pattern
```typescript
// Singleton pattern for model management
class AIModelManager {
  private static instance: AIModelManager;
  private models: Map<string, any> = new Map();
  private processors: Map<string, any> = new Map();
  
  static getInstance(): AIModelManager {
    if (!AIModelManager.instance) {
      AIModelManager.instance = new AIModelManager();
    }
    return AIModelManager.instance;
  }
  
  async loadModel(modelName: string) {
    if (this.models.has(modelName)) {
      return this.models.get(modelName);
    }
    
    // Load model with progress tracking
    const model = await this.loadWithProgress(modelName);
    this.models.set(modelName, model);
    return model;
  }
  
  private async loadWithProgress(modelName: string) {
    // Implementation with progress callbacks
  }
}
```

### 2. Progressive AI Processing
```typescript
const useProgressiveAI = (taskName: string) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  
  const process = useCallback(async (input: any) => {
    setProgress(0);
    setStage('Loading model...');
    
    const model = await loadModel(taskName, (progress) => {
      setProgress(progress * 0.3); // Model loading = 30% of total
    });
    
    setStage('Processing...');
    const result = await model.process(input, (progress) => {
      setProgress(30 + progress * 0.7); // Processing = 70% of total
    });
    
    setStage('Complete');
    setProgress(100);
    setResult(result);
    
    return result;
  }, [taskName]);
  
  return { process, progress, stage, result };
};
```

### 3. AI Result Integration
```typescript
const integrateAIResult = useCallback(async (
  result: AIResult,
  targetCanvas: fabric.Canvas
) => {
  try {
    // Convert AI result to canvas object
    const canvasObject = await convertToCanvasObject(result);
    
    // Smart positioning based on canvas context
    const position = calculateOptimalPosition(targetCanvas, canvasObject);
    canvasObject.set(position);
    
    // Add with animation
    targetCanvas.add(canvasObject);
    animateObjectEntry(canvasObject);
    
    // Save state for undo
    saveCanvasState();
    
    // User feedback
    toast.success("AI enhancement applied!");
    
  } catch (error) {
    toast.error("Failed to apply AI result");
    throw error;
  }
}, []);
```

## Specific AI Features Implementation

### 1. Smart Background Removal
```typescript
export const useSmartBackgroundRemoval = () => {
  const { process, progress, stage } = useProgressiveAI('background-removal');
  
  const removeBackground = useCallback(async (
    imageElement: HTMLImageElement,
    options: BackgroundRemovalOptions = {}
  ) => {
    const {
      preserveEdges = true,
      smoothing = 0.5,
      confidenceThreshold = 0.7
    } = options;
    
    return await process({
      image: imageElement,
      settings: {
        preserveEdges,
        smoothing,
        confidenceThreshold
      }
    });
  }, [process]);
  
  return { removeBackground, progress, stage };
};
```

### 2. Smart Object Detection
```typescript
export const useObjectDetection = () => {
  const detectObjects = useCallback(async (canvas: fabric.Canvas) => {
    const imageData = canvas.getContext().getImageData(
      0, 0, canvas.width!, canvas.height!
    );
    
    const objects = await detectObjectsInImage(imageData);
    
    // Create bounding boxes for detected objects
    const boundingBoxes = objects.map(obj => 
      new fabric.Rect({
        left: obj.bbox.x,
        top: obj.bbox.y,
        width: obj.bbox.width,
        height: obj.bbox.height,
        fill: 'transparent',
        stroke: '#00ff00',
        strokeWidth: 2,
        selectable: false,
        evented: false,
        name: `detected-${obj.class}`
      })
    );
    
    return { objects, boundingBoxes };
  }, []);
  
  return { detectObjects };
};
```

### 3. Smart Color Palette Generation
```typescript
export const useSmartColorPalette = () => {
  const generatePalette = useCallback(async (
    sourceImage: HTMLImageElement,
    paletteSize: number = 5
  ) => {
    // Extract dominant colors using AI
    const colors = await extractDominantColors(sourceImage, paletteSize);
    
    // Generate complementary colors
    const complementary = colors.map(color => 
      generateComplementaryColor(color)
    );
    
    // Create palette with color theory
    const palette = {
      primary: colors,
      complementary,
      triadic: colors.map(generateTriadicColors),
      analogous: colors.map(generateAnalogousColors)
    };
    
    return palette;
  }, []);
  
  return { generatePalette };
};
```

## Claude Opus-Style Code Generation

When I ask for code generation, follow these principles:

### 1. Comprehensive Analysis
- Consider the full context of the request
- Think about edge cases and error scenarios
- Plan for future extensibility

### 2. Robust Implementation
- Include proper TypeScript typing
- Add comprehensive error handling
- Implement loading and progress states
- Consider performance implications

### 3. User Experience Focus
- Provide clear feedback during operations
- Handle errors gracefully with helpful messages
- Ensure responsive design across devices
- Consider accessibility requirements

### 4. Code Quality
- Write self-documenting code with clear names
- Add JSDoc comments for complex functions
- Follow established patterns in the codebase
- Include examples in comments when helpful

## Example: Complex Feature Implementation

When I say "Add AI-powered smart crop feature":

```typescript
/**
 * AI-Powered Smart Crop Feature
 * Analyzes image content to suggest optimal crop regions
 */

interface CropSuggestion {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  reason: 'face_detection' | 'rule_of_thirds' | 'object_focus' | 'composition';
}

interface SmartCropOptions {
  aspectRatio?: number;
  minConfidence?: number;
  includeMultipleSuggestions?: boolean;
  focusType?: 'auto' | 'faces' | 'objects' | 'composition';
}

export const useSmartCrop = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([]);
  
  const analyzeImage = useCallback(async (
    image: HTMLImageElement,
    options: SmartCropOptions = {}
  ): Promise<CropSuggestion[]> => {
    setIsAnalyzing(true);
    setSuggestions([]);
    
    try {
      const {
        aspectRatio,
        minConfidence = 0.6,
        includeMultipleSuggestions = true,
        focusType = 'auto'
      } = options;
      
      // Step 1: Detect faces
      toast.loading("Analyzing image composition...");
      const faces = await detectFaces(image);
      
      // Step 2: Detect objects
      const objects = await detectObjects(image);
      
      // Step 3: Analyze composition
      const compositionAnalysis = await analyzeComposition(image);
      
      // Step 4: Generate crop suggestions
      const cropSuggestions: CropSuggestion[] = [];
      
      // Face-based crops
      if (faces.length > 0 && (focusType === 'auto' || focusType === 'faces')) {
        const faceCrops = generateFaceCrops(faces, image, aspectRatio);
        cropSuggestions.push(...faceCrops);
      }
      
      // Object-based crops
      if (objects.length > 0 && (focusType === 'auto' || focusType === 'objects')) {
        const objectCrops = generateObjectCrops(objects, image, aspectRatio);
        cropSuggestions.push(...objectCrops);
      }
      
      // Composition-based crops (rule of thirds, etc.)
      if (focusType === 'auto' || focusType === 'composition') {
        const compositionCrops = generateCompositionCrops(
          compositionAnalysis, 
          image, 
          aspectRatio
        );
        cropSuggestions.push(...compositionCrops);
      }
      
      // Filter by confidence and sort
      const filteredSuggestions = cropSuggestions
        .filter(s => s.confidence >= minConfidence)
        .sort((a, b) => b.confidence - a.confidence);
      
      // Limit suggestions if requested
      const finalSuggestions = includeMultipleSuggestions 
        ? filteredSuggestions.slice(0, 5)
        : filteredSuggestions.slice(0, 1);
      
      setSuggestions(finalSuggestions);
      toast.success(`Found ${finalSuggestions.length} crop suggestions`);
      
      return finalSuggestions;
      
    } catch (error) {
      console.error('Smart crop analysis failed:', error);
      toast.error('Failed to analyze image for cropping');
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);
  
  const applyCrop = useCallback(async (
    canvas: fabric.Canvas,
    suggestion: CropSuggestion
  ) => {
    if (!canvas) return;
    
    try {
      // Create crop overlay
      const cropOverlay = new fabric.Rect({
        left: suggestion.x,
        top: suggestion.y,
        width: suggestion.width,
        height: suggestion.height,
        fill: 'transparent',
        stroke: '#00ff00',
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        selectable: true,
        name: 'crop-suggestion'
      });
      
      canvas.add(cropOverlay);
      canvas.setActiveObject(cropOverlay);
      canvas.renderAll();
      
      // Save state for undo
      saveCanvasState();
      
      toast.success(`Applied ${suggestion.reason} crop suggestion`);
      
    } catch (error) {
      console.error('Failed to apply crop:', error);
      toast.error('Failed to apply crop suggestion');
    }
  }, []);
  
  return {
    analyzeImage,
    applyCrop,
    suggestions,
    isAnalyzing
  };
};

// Helper functions would be implemented separately
const detectFaces = async (image: HTMLImageElement) => {
  // Face detection implementation
};

const detectObjects = async (image: HTMLImageElement) => {
  // Object detection implementation
};

const analyzeComposition = async (image: HTMLImageElement) => {
  // Composition analysis implementation
};
```

This approach ensures that every AI feature is:
- **Comprehensive**: Handles multiple scenarios and edge cases
- **User-friendly**: Provides clear feedback and intuitive controls
- **Performant**: Uses progressive loading and efficient algorithms
- **Extensible**: Can be easily enhanced with new capabilities
- **Reliable**: Includes proper error handling and fallbacks

Remember: Think like Claude Opus - thorough, thoughtful, and always considering the bigger picture!
