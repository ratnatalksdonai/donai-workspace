import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const ImageEditor = () => {
  const imageEditors = [
    {
      name: "Fabric.js Canvas",
      description: "Professional canvas-based image editor with layers, filters, and advanced drawing tools",
      features: ["Layer Management", "Advanced Filters", "Vector Graphics", "Export Options"],
      github: "https://github.com/fabricjs/fabric.js",
      demo: "/editor",
      status: "Integrated"
    },
    {
      name: "React Image Editor",
      description: "Professional image editing with cropping, filters, and annotations",
      features: ["Crop & Resize", "Filters & Effects", "Text Overlay", "Shape Drawing"],
      github: "https://github.com/scaleflex/react-image-editor",
      demo: "#",
      status: "Available"
    },
    {
      name: "Konva.js Editor",
      description: "High-performance canvas library for professional image manipulation",
      features: ["Layer System", "Animations", "High Performance", "Multi-format Export"],
      github: "https://github.com/konvajs/konva",
      demo: "#",
      status: "Available"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Professional Image Editors
            </h1>
            <p className="text-muted-foreground">
              Open-source image editing tools with professional capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageEditors.map((editor, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{editor.name}</h3>
                  <Badge variant={editor.status === "Integrated" ? "default" : "secondary"}>
                    {editor.status}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {editor.description}
                </p>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {editor.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(editor.github, '_blank')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Source
                  </Button>
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => editor.demo !== "#" && window.open(editor.demo, '_blank')}
                    disabled={editor.demo === "#"}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {editor.status === "Integrated" ? "Open" : "Demo"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-primary/20">
            <h2 className="text-xl font-semibold text-foreground mb-4">Integration Instructions</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Fabric.js Canvas:</strong> Already integrated in the Canvas Editor. 
                Features include drawing tools, shape creation, image upload, and background removal.
              </p>
              <p>
                <strong className="text-foreground">Additional Editors:</strong> To integrate other editors, 
                install the respective npm packages and follow their documentation for React integration.
              </p>
              <p>
                <strong className="text-foreground">File Format Support:</strong> All editors support common formats 
                (PNG, JPG, SVG, PDF) with configurable export options.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageEditor;