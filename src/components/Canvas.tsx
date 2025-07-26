import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, FabricText } from "fabric";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { toast } from "sonner";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#8B5CF6");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "text">("select");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush right after canvas creation
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = 3;

    setFabricCanvas(canvas);
    toast("Canvas ready! Start creating amazing designs!");

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 3;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 120,
        height: 80,
        rx: 8,
        ry: 8,
      });
      fabricCanvas?.add(rect);
      fabricCanvas?.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas?.add(circle);
      fabricCanvas?.setActiveObject(circle);
    } else if (tool === "text") {
      const text = new FabricText("Your text here", {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 24,
        fontFamily: "Inter, sans-serif",
      });
      fabricCanvas?.add(text);
      fabricCanvas?.setActiveObject(text);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared! Ready for your next masterpiece!");
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
    
    const link = document.createElement('a');
    link.download = 'don-ai-design.png';
    link.href = dataURL;
    link.click();
    
    toast("Design exported successfully!");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Toolbar 
            activeTool={activeTool} 
            onToolClick={handleToolClick} 
            onClear={handleClear}
            onExport={handleExport}
          />
          <ColorPicker color={activeColor} onChange={setActiveColor} />
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-card border border-border rounded-lg shadow-elegant overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="max-w-full block"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};