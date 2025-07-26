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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Don.ai - Creative Design Suite
          </h1>
          <p className="text-white/90 text-lg">
            AI-powered design tools for creative professionals
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/20 rounded-lg p-4 text-center border-0">
              <PaletteIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-2">Canvas Editor</h3>
              <p className="text-white/80 text-sm mb-4">
                Create with our advanced canvas tools
              </p>
              <Button
                className="mt-4"
                variant="gradient"
                onClick={handleStartCreating}
              >
                Start Creating
              </Button>
            </Card>

            <Card className="bg-white/20 rounded-lg p-4 text-center border-0">
              <ScissorsIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-2">
                AI Background Removal
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Remove backgrounds instantly with AI
              </p>
              <Button
                className="mt-4"
                variant="creative"
                onClick={handleStartCreating}
              >
                Try Now
              </Button>
            </Card>

            <Card className="bg-white/20 rounded-lg p-4 text-center border-0">
              <DownloadIcon className="h-8 w-8 text-white mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-2">Export & Share</h3>
              <p className="text-white/80 text-sm mb-4">
                Export your creations in high quality
              </p>
              <Button
                className="mt-4"
                variant="secondary"
                onClick={handleStartCreating}
              >
                Learn More
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
