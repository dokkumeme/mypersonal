import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ScoreProvider } from "./context/ScoreContext";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import lofiBg from "@/assets/music/lofi-background.mp3";

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(lofiBg);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const tryPlay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
      } catch {}
    };

    tryPlay();
    const handler = () => tryPlay();
    document.addEventListener("pointerdown", handler, { once: true });

    return () => {
      document.removeEventListener("pointerdown", handler);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {}
    }
    setIsMuted((m) => !m);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <ScoreProvider>
      <button
        aria-label={isMuted ? "Unmute" : "Mute"}
        onClick={toggleMute}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-white border-2 border-primary/20 shadow-[0_8px_24px_rgba(255,182,193,0.3)] hover:bg-primary/10"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary" />
        )}
      </button>
      <RouterProvider router={router} />
    </ScoreProvider>
  );
}
