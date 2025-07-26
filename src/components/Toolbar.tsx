import { Button } from "@/components/ui/button";
import { 
  MousePointer2, 
  Pencil, 
  Square, 
  Circle, 
  Type,
  Trash2,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface ToolbarProps {
  activeTool: "select" | "draw" | "rectangle" | "circle" | "text";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle" | "text") => void;
  onClear: () => void;
  onExport: () => void;
}

export const Toolbar = ({ activeTool, onToolClick, onClear, onExport }: ToolbarProps) => {
  const tools = [
    { id: "select" as const, icon: MousePointer2, label: "Select" },
    { id: "draw" as const, icon: Pencil, label: "Draw" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
    { id: "text" as const, icon: Type, label: "Text" },
  ];

  return (
    <Card className="p-2">
      <div className="flex gap-2 items-center">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Button
              key={tool.id}
              variant={activeTool === tool.id ? "default" : "tool"}
              size="icon"
              onClick={() => onToolClick(tool.id)}
              title={tool.label}
              className="transition-all duration-200"
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button
          variant="outline"
          size="icon"
          onClick={onClear}
          title="Clear Canvas"
          className="hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="gradient"
          size="icon"
          onClick={onExport}
          title="Export Design"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};