import React, { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Text, Image as FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { Toolbar } from "./Toolbar";
import { removeBackground, loadImage } from "@/utils/backgroundRemover";
import { toast } from "sonner";

/**
 * Main Canvas component for Don.ai Creative Suite
 * Provides interactive design canvas with Fabric.js
 */
export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [activeColor, setActiveColor] = useState("#8B5CF6");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "text">("select");
  const [isProcessing, setIsProcessing] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush safely
    canvas.isDrawingMode = false;
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = 3;
    }

    setFabricCanvas(canvas);
    toast("Canvas ready! Start creating amazing designs!");

    // Save initial state
    saveCanvasState(canvas);

    return () => {
      canvas.dispose();
    };
  }, [activeColor]);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    // Safely set brush properties when in drawing mode
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 3;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === "rectangle") {
      const rect = new fabric.Rect({
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
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas?.add(circle);
      fabricCanvas?.setActiveObject(circle);
    } else if (tool === "text") {
      const text = new fabric.Text("Your text here", {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 24,
        fontFamily: "Inter, sans-serif",
      });
      fabricCanvas?.add(text);
      fabricCanvas?.setActiveObject(text);
    }

    // Save state after adding object
    saveCanvasState(fabricCanvas);
  };

  const saveCanvasState = (canvas: fabric.Canvas | null) => {
    if (!canvas) return;
    const state = JSON.stringify(canvas.toObject());
    setCanvasHistory(prev => [...prev.slice(-9), state]);
  };

  const handleUndo = () => {
    if (!fabricCanvas || canvasHistory.length <= 1) return;
    
    const newHistory = canvasHistory.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    
    if (previousState) {
      fabricCanvas.loadFromJSON(previousState, () => {
        fabricCanvas.renderAll();
        setCanvasHistory(newHistory);
        toast("Undone last action!");
      });
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    try {
      const img = await loadImage(file);
      const fabricImg = await fabric.Image.fromURL(img.src);
      
      // Scale image to fit canvas if too large
      const canvasWidth = fabricCanvas.width || 800;
      const canvasHeight = fabricCanvas.height || 600;
      const scale = Math.min(canvasWidth / fabricImg.width!, canvasHeight / fabricImg.height!, 1);
      
      fabricImg.scale(scale);
      fabricImg.set({
        left: 100,
        top: 100,
      });
      
      fabricCanvas.add(fabricImg);
      fabricCanvas.setActiveObject(fabricImg);
      saveCanvasState(fabricCanvas);
      toast("Image uploaded successfully!");
    } catch (error) {
      toast("Failed to upload image. Please try again.");
    }
  };

  const handleBackgroundRemove = async () => {
    const activeObject = fabricCanvas?.getActiveObject();
    
    if (!activeObject || activeObject.type !== 'image') {
      toast("Please select an image first!");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Get the image element from the fabric object
      const fabricImg = activeObject as fabric.Image;
      const imgElement = fabricImg.getElement() as HTMLImageElement;
      
      if (!imgElement) {
        throw new Error("No image element found");
      }

      toast("Processing image... This may take a moment.");
      
      // Remove background
      const processedBlob = await removeBackground(imgElement);
      const processedImg = await loadImage(processedBlob);
      const newFabricImg = await fabric.Image.fromURL(processedImg.src);
      
      // Copy properties from original image
      newFabricImg.set({
        left: fabricImg.left,
        top: fabricImg.top,
        scaleX: fabricImg.scaleX,
        scaleY: fabricImg.scaleY,
        angle: fabricImg.angle,
      });
      
      // Replace the original image
      fabricCanvas?.remove(fabricImg);
      fabricCanvas?.add(newFabricImg);
      fabricCanvas?.setActiveObject(newFabricImg);
      saveCanvasState(fabricCanvas!);
      
      toast("Background removed successfully!");
    } catch (error) {
      console.error("Background removal failed:", error);
      toast("Failed to remove background. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    setCanvasHistory([]);
    saveCanvasState(fabricCanvas);
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

  const addRectangle = () => {
    if (!fabricCanvas) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "#ff6b6b",
      width: 100,
      height: 100,
    });

    fabricCanvas.add(rect);
    fabricCanvas.setActiveObject(rect);
  };

  const addCircle = () => {
    if (!fabricCanvas) return;

    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      fill: "#4ecdc4",
      radius: 50,
    });

    fabricCanvas.add(circle);
    fabricCanvas.setActiveObject(circle);
  };

  const addText = () => {
    if (!fabricCanvas) return;

    const text = new fabric.Text("Hello Don.ai!", {
      left: 150,
      top: 300,
      fontFamily: "Arial",
      fontSize: 24,
      fill: "#333333",
    });

    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
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
            onImageUpload={handleImageUpload}
            onBackgroundRemove={handleBackgroundRemove}
            onUndo={handleUndo}
            isProcessing={isProcessing}
          />
          <ColorPicker color={activeColor} onChange={setActiveColor} />
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-elegant">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <div>
                <h3 className="font-semibold">Processing Image</h3>
                <p className="text-sm text-muted-foreground">Removing background...</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
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