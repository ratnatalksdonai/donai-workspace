import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PaletteIcon, HomeIcon, Settings, Menu } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Main navigation header for Don.ai Creative Suite
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 rounded-none bg-gradient-primary shadow-elegant">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/ef91a049-994d-408f-b928-9a384a9b9da2.png" 
              alt="don.ai logo" 
              className="h-8 w-8"
            />
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
      <div className="border-t border-white/10 py-2">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <PaletteIcon className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Don.ai
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/editor')}
                className="flex items-center space-x-2"
              >
                <PaletteIcon className="h-4 w-4" />
                <span>Editor</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </Card>
  );
};