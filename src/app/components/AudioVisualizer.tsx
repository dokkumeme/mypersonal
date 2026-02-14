import { motion } from "motion/react";

export function AudioVisualizer() {
  const bars = Array.from({ length: 20 });

  return (
    <div className="flex items-center gap-[2px] h-8">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-primary/40 rounded-full"
          animate={{
            height: [
              Math.random() * 20 + 10,
              Math.random() * 25 + 8,
              Math.random() * 20 + 10,
            ],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
