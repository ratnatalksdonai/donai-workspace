import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Music } from "lucide-react";

const AudioEditor = () => {
  const audioEditors = [
    {
      name: "Web Audio API",
      description: "Native browser audio processing with professional capabilities",
      features: ["Real-time Processing", "Effects Chain", "Audio Analysis", "Recording"],
      github: "https://github.com/WebAudio/web-audio-api",
      demo: "#",
      status: "Native"
    },
    {
      name: "Tone.js",
      description: "Professional audio framework for music applications",
      features: ["Synthesizers", "Effects", "Sequencing", "Music Theory"],
      github: "https://github.com/Tonejs/Tone.js",
      demo: "#",
      status: "Available"
    },
    {
      name: "Wavesurfer.js",
      description: "Interactive waveform visualization and editing",
      features: ["Waveform Display", "Region Selection", "Zoom & Navigation", "Plugin System"],
      github: "https://github.com/wavesurfer-js/wavesurfer.js",
      demo: "#",
      status: "Available"
    },
    {
      name: "AudioWorklet",
      description: "Low-latency audio processing in dedicated threads",
      features: ["Real-time Audio", "Custom Processors", "Low Latency", "Multi-threading"],
      github: "https://github.com/GoogleChromeLabs/web-audio-samples",
      demo: "#",
      status: "Native"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              Professional Audio Editors
            </h1>
            <p className="text-muted-foreground">
              Web-based audio editing with professional-grade capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audioEditors.map((editor, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{editor.name}</h3>
                  <Badge variant={editor.status === "Native" ? "default" : "secondary"}>
                    {editor.status}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {editor.description}
                </p>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-foreground">Audio Features:</h4>
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
                    Documentation
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
              <h2 className="text-xl font-semibold text-foreground mb-4">Audio Processing Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">File Formats</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>WAV, MP3, FLAC</p>
                    <p>OGG, AAC, M4A</p>
                    <p>WebM Audio</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Effects & Processing</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Reverb, Delay, Distortion</p>
                    <p>EQ, Compression, Limiter</p>
                    <p>Noise Reduction</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Professional Tools</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Multi-track Editing</p>
                    <p>Automation</p>
                    <p>Real-time Monitoring</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-sm border border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-4">Digital Audio Workstation Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Recording & Editing</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Multi-track recording</li>
                    <li>• Non-destructive editing</li>
                    <li>• Cut, copy, paste operations</li>
                    <li>• Fade in/out controls</li>
                    <li>• Time stretching</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Professional Mixing</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Mixing console interface</li>
                    <li>• Send/return buses</li>
                    <li>• Automation lanes</li>
                    <li>• Real-time meters</li>
                    <li>• Export to multiple formats</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AudioEditor;