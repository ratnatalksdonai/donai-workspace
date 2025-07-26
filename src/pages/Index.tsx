import { Header } from "@/components/Header";
import { Canvas } from "@/components/Canvas";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="container mx-auto">
        <Canvas />
      </main>
    </div>
  );
};

export default Index;
