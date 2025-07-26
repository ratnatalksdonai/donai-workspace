import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const predefinedColors = [
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#F59E0B", // Orange
    "#EF4444", // Red
    "#10B981", // Green
    "#8B5A2B", // Brown
    "#6B7280", // Gray
    "#1F2937", // Dark Gray
    "#FFFFFF", // White
    "#000000", // Black
  ];

  return (
    <Card className="p-2">
      <div className="flex gap-2 items-center">
        <Button
          variant="tool"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <Palette className="h-4 w-4" />
          <div 
            className="absolute bottom-1 right-1 w-2 h-2 rounded-full border border-white"
            style={{ backgroundColor: color }}
          />
        </Button>
        
        {isOpen && (
          <div className="flex gap-1 p-2 bg-card border border-border rounded-lg shadow-elegant">
            {predefinedColors.map((presetColor) => (
              <button
                key={presetColor}
                className={`w-6 h-6 rounded border-2 hover:scale-110 transition-all duration-200 ${
                  color === presetColor ? 'border-primary ring-2 ring-primary/30' : 'border-gray-300'
                }`}
                style={{ backgroundColor: presetColor }}
                onClick={() => onChange(presetColor)}
                title={presetColor}
              />
            ))}
            
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-6 h-6 rounded border-2 border-gray-300 cursor-pointer hover:scale-110 transition-all duration-200"
              title="Custom color"
            />
          </div>
        )}
      </div>
    </Card>
  );
};