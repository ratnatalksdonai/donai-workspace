import { Header } from "@/components/Header";
import { Canvas } from "@/components/Canvas";
import { Button } from "@/components/ui/button";

const Index = () => {
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

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold mb-2">Canvas Editor</h3>
              <p className="text-white/80 text-sm">
                Create with our advanced canvas tools
              </p>
              <Button className="mt-4">Start Creating</Button>
            </div>

            <div className="bg-white/20 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold mb-2">
                AI Background Removal
              </h3>
              <p className="text-white/80 text-sm">Remove backgrounds instantly</p>
              <Button className="mt-4">Try Now</Button>
            </div>

            <div className="bg-white/20 rounded-lg p-4 text-center">
              <h3 className="text-white font-semibold mb-2">Export & Share</h3>
              <p className="text-white/80 text-sm">
                Export your creations in high quality
              </p>
              <Button className="mt-4">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
