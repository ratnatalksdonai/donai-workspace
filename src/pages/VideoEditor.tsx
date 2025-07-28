import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Video } from "lucide-react";

const VideoEditor = () => {
  const videoEditors = [
    {
      name: "FFmpeg.wasm",
      description: "Complete video processing in the browser using WebAssembly",
      features: ["Format Conversion", "Video Compression", "Trimming & Cutting", "Filter Effects"],
      github: "https://github.com/ffmpegwasm/ffmpeg.wasm",
      demo: "#",
      status: "Available"
    },
    {
      name: "Remotion",
      description: "Create videos programmatically using React components",
      features: ["React-based", "Programmatic Videos", "Motion Graphics", "Timeline Editor"],
      github: "https://github.com/remotion-dev/remotion",
      demo: "#",
      status: "Available"
    },
    {
      name: "Video.js",
      description: "Professional video player with editing capabilities",
      features: ["Video Playback", "Plugin System", "Custom Controls", "Streaming Support"],
      github: "https://github.com/videojs/video.js",
      demo: "#",
      status: "Available"
    },
    {
      name: "Lottie Web",
      description: "High-quality animations and motion graphics",
      features: ["After Effects Export", "Vector Animations", "Interactive Elements", "Small File Size"],
      github: "https://github.com/airbnb/lottie-web",
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
            <h1 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Video className="h-8 w-8 text-primary" />
              Professional Video Editors
            </h1>
            <p className="text-muted-foreground">
              Open-source video editing solutions for professional workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoEditors.map((editor, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{editor.name}</h3>
                  <Badge variant="secondary">
                    {editor.status}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {editor.description}
                </p>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-foreground">Capabilities:</h4>
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
                    Repository
                  </Button>
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    className="flex-1"
                    disabled
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Integration
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            <Card className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-4">Professional Video Formats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Input Formats</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p>MP4, MOV, AVI</p>
                    <p>WebM, MKV</p>
                    <p>FLV, 3GP</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Output Formats</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p>MP4 (H.264/H.265)</p>
                    <p>WebM (VP8/VP9)</p>
                    <p>GIF, PNG Sequence</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Resolution</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p>4K (3840×2160)</p>
                    <p>1080p (1920×1080)</p>
                    <p>720p, 480p</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Features</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Timeline Editing</p>
                    <p>Color Grading</p>
                    <p>Audio Mixing</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-4">Integration Guide</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">FFmpeg.wasm:</strong> Provides comprehensive video processing 
                  capabilities directly in the browser without server dependencies.
                </p>
                <p>
                  <strong className="text-foreground">Remotion:</strong> Perfect for creating programmatic videos 
                  with React components, ideal for data visualizations and motion graphics.
                </p>
                <p>
                  <strong className="text-foreground">Timeline Editor:</strong> Can be built using libraries like 
                  React-Timeline-Editor or custom implementations with drag-and-drop functionality.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoEditor;