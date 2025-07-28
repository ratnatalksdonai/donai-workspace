import { Header } from "@/components/Header";
import { Canvas } from "@/components/Canvas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PaletteIcon, ScissorsIcon, DownloadIcon } from "lucide-react";

/**
 * Don.ai Creative Suite Homepage
 * Showcases features and provides quick access to the canvas editor
 */
const Index = () => {
  const navigate = useNavigate();

  const handleStartCreating = () => {
    navigate("/editor");
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 drop-shadow-glow">
            DON.ai - Cyberpunk Creative Suite
          </h1>
          <p className="text-foreground/90 text-lg">
            AI-powered professional editing suite with cyberpunk aesthetics
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-card/20 backdrop-blur-lg rounded-lg p-6 mb-8 border border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card/30 rounded-lg p-4 text-center border border-primary/20">
              <PaletteIcon className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-foreground font-semibold mb-2">Canvas Editor</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Advanced drawing and design tools
              </p>
              <Button
                className="mt-4"
                variant="gradient"
                onClick={() => navigate("/editor")}
              >
                Create
              </Button>
            </Card>

            <Card className="bg-card/30 rounded-lg p-4 text-center border border-primary/20">
              <ScissorsIcon className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="text-foreground font-semibold mb-2">Image Editor</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professional image editing suite
              </p>
              <Button
                className="mt-4"
                variant="creative"
                onClick={() => navigate("/image-editor")}
              >
                Edit Images
              </Button>
            </Card>

            <Card className="bg-card/30 rounded-lg p-4 text-center border border-primary/20">
              <DownloadIcon className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-foreground font-semibold mb-2">Video Editor</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professional video editing tools
              </p>
              <Button
                className="mt-4"
                variant="gradient"
                onClick={() => navigate("/video-editor")}
              >
                Edit Videos
              </Button>
            </Card>

            <Card className="bg-card/30 rounded-lg p-4 text-center border border-primary/20">
              <PaletteIcon className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="text-foreground font-semibold mb-2">Audio Editor</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professional audio production
              </p>
              <Button
                className="mt-4"
                variant="creative"
                onClick={() => navigate("/audio-editor")}
              >
                Mix Audio
              </Button>
            </Card>
          </div>
        </div>

        {/* Featured Canvas Preview */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Try the Canvas Editor
          </h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
