import { Header } from "@/components/Header";
import { DONAIChat } from "@/components/DONAIChat";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              DON.ai Assistant
            </h1>
            <p className="text-muted-foreground">
              Your AI-powered creative companion for all editing needs
            </p>
          </div>
          <DONAIChat />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;