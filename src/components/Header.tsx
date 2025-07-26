import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Menu, Settings } from "lucide-react";

export const Header = () => {
  return (
    <Card className="border-0 rounded-none bg-gradient-primary shadow-elegant">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">don.ai</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
            <span>Creative Suite</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};