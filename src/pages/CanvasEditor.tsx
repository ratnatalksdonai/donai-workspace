import { Header } from "@/components/Header";
import { Canvas } from "@/components/Canvas";

/**
 * Main Canvas Editor page for Don.ai Creative Suite
 * Provides a full-featured design canvas with AI-powered tools
 */
const CanvasEditor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto">
        <Canvas />
      </main>
    </div>
  );
};

export default CanvasEditor;
