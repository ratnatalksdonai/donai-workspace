import { Header } from "@/components/Header";
import VideoEditor from "@/components/VideoEditor";

const VideoEditorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <VideoEditor />
    </div>
  );
};

export default VideoEditorPage;