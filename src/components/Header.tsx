import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PaletteIcon, HomeIcon, Settings, Menu, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Industrial navigation header for DON.ai Professional Suite
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 rounded-none bg-gradient-primary shadow-elegant">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">DON.ai</h1>
              <span className="text-xs text-white/70 font-medium">PROFESSIONAL SUITE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 border border-white/20">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 border border-white/20 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="border-t border-white/20 bg-black/20">
        <div className="container flex h-12 items-center">
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 font-medium"
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              COMMAND CENTER
            </Button>
            <div className="w-px h-6 bg-white/20 mx-2" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/image-editor')}
              className="text-white hover:bg-white/10 font-medium"
            >
              IMAGE FORGE
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/video-editor')}
              className="text-white hover:bg-white/10 font-medium"
            >
              VIDEO STATION
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/audio-editor')}
              className="text-white hover:bg-white/10 font-medium"
            >
              AUDIO LAB
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/chat')}
              className="text-white hover:bg-white/10 font-medium"
            >
              AI COMMAND
            </Button>
          </nav>
        </div>
      </div>
    </Card>
  );
};