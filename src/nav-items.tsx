import { HomeIcon, PaletteIcon } from "lucide-react"
import Index from "./pages/Index"
import CanvasEditor from "./pages/CanvasEditor"

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Canvas Editor",
    to: "/editor",
    icon: <PaletteIcon className="h-4 w-4" />,
    page: <CanvasEditor />,
  },
]
