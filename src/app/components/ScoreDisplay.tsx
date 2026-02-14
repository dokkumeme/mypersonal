import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useScore } from "../context/ScoreContext";

export function ScoreDisplay() {
  const { score } = useScore();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-4 z-50"
    >
      <div className="bg-white rounded-[24px] px-6 py-3 shadow-[0_8px_24px_rgba(255,182,193,0.4)] flex items-center gap-3 border-4 border-primary/20">
        <Heart className="w-6 h-6 text-destructive fill-destructive" />
        <div>
          <div className="text-xs text-muted-foreground font-medium">Score</div>
          <div className="text-xl font-bold text-foreground">{score} / 100</div>
        </div>
      </div>
    </motion.div>
  );
}
