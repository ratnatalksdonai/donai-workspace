import { HomeIcon, PaletteIcon, MessageSquare, Image, Video, Music } from "lucide-react"
import Index from "./pages/Index"
import CanvasEditor from "./pages/CanvasEditor"
import ChatPage from "./pages/ChatPage"
import ImageEditor from "./pages/ImageEditor"
import VideoEditor from "./pages/VideoEditor"
import AudioEditor from "./pages/AudioEditor"

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "DON.ai Chat",
    to: "/chat",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <ChatPage />,
  },
  {
    title: "Canvas Editor",
    to: "/editor",
    icon: <PaletteIcon className="h-4 w-4" />,
    page: <CanvasEditor />,
  },
  {
    title: "Image Editor",
    to: "/image-editor",
    icon: <Image className="h-4 w-4" />,
    page: <ImageEditor />,
  },
  {
    title: "Video Editor",
    to: "/video-editor",
    icon: <Video className="h-4 w-4" />,
    page: <VideoEditor />,
  },
  {
    title: "Audio Editor",
    to: "/audio-editor",
    icon: <Music className="h-4 w-4" />,
    page: <AudioEditor />,
  },
]
