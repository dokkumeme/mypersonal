import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, Heart } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { ScoreDisplay } from "./ScoreDisplay";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";

export default function LevelHub() {
  const navigate = useNavigate();

  const levels = [
    { id: 1, name: "Level 1", color: "#B0E0E6", unlocked: true, route: "/level-1", x: 70, y: 10 },
    { id: 2, name: "Level 2", color: "#FFE4B5", unlocked: false, route: "/level-2", x: 30, y: 25 },
    { id: 3, name: "Level 3", color: "#FFD4B5", unlocked: false, route: "/level-3", x: 70, y: 45 },
    { id: 4, name: "Level 4", color: "#B0D4E6", unlocked: false, route: "/level-4", x: 35, y: 65 },
    { id: 5, name: "Final", color: "#FFB6C1", unlocked: false, route: "/final", x: 70, y: 85 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-primary/10 relative overflow-hidden">
      {/* Audio Visualizer */}
      <div className="fixed top-4 right-4 z-50">
        <AudioVisualizer />
      </div>

      {/* Score Display - Top Left */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 z-40"
      >
        <ScoreDisplay />
      </motion.div>

      {/* Large Panda on the Left */}
      <motion.div
        initial={{ x: -200, opacity: 0, rotate: -20 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="fixed left-8 top-24 z-30 hidden lg:block"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-accent/40 rounded-full blur-3xl scale-125" />
          <div className="relative w-48 h-48">
            <img
              src={pandaImg}
              alt="Panda Guide"
              className="w-full h-full object-contain drop-shadow-2xl scale-125"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 lg:pl-64">
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Title Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="bg-white rounded-[32px] p-8 mb-12 shadow-[0_12px_40px_rgba(255,182,193,0.4)] relative overflow-hidden border-4 border-primary/10"
          >
            <div className="text-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-2"
              >
                <Heart className="w-10 h-10 text-destructive fill-destructive mx-auto" />
              </motion.div>
              <h2 
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-destructive to-secondary bg-clip-text text-transparent mb-1"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Treasure Hunting of My Love
              </h2>
              <p className="text-sm text-muted-foreground">Complete each level to unlock your romantic journey</p>
            </div>
            
            {/* Decorative hearts */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 opacity-20"
            >
              <Heart className="w-16 h-16 text-primary fill-primary" />
            </motion.div>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-2 -left-2 opacity-20"
            >
              <Heart className="w-12 h-12 text-secondary fill-secondary" />
            </motion.div>
          </motion.div>

          {/* Level Map with Travel Path */}
          <div className="relative h-[600px] w-full">
            {/* Travel Path - Snake/Winding Curved Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
              <defs>
                <filter id="path-glow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {levels.map((level, index) => {
                if (index === levels.length - 1) return null;
                const nextLevel = levels[index + 1];
                
                // Use actual coordinate values (not percentages in path)
                const x1 = level.x;
                const y1 = level.y;
                const x2 = nextLevel.x;
                const y2 = nextLevel.y;
                
                // Calculate control points for smooth S-curves
                const isGoingLeft = nextLevel.x < level.x;
                
                let pathData;
                if (isGoingLeft) {
                  // Curve from right to left with smooth arc
                  const controlX1 = level.x - 10;
                  const controlY1 = level.y + 8;
                  const controlX2 = nextLevel.x + 10;
                  const controlY2 = nextLevel.y - 2;
                  pathData = `M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`;
                } else {
                  // Curve from left to right with smooth arc
                  const controlX1 = level.x + 10;
                  const controlY1 = level.y + 8;
                  const controlX2 = nextLevel.x - 10;
                  const controlY2 = nextLevel.y - 2;
                  pathData = `M ${x1} ${y1} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`;
                }
                
                return (
                  <g key={`path-${index}`}>
                    {/* Outer glow */}
                    <path
                      d={pathData}
                      stroke="#FF8C42"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity="0.4"
                      filter="url(#path-glow)"
                    />
                    {/* Main path - solid orange line */}
                    <path
                      d={pathData}
                      stroke="#FF6B35"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity="1"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Level Nodes Positioned Absolutely */}
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring", bounce: 0.4 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${level.x}%`,
                  top: `${level.y}%`,
                  zIndex: 10
                }}
              >
                {/* Penguin near Level 1 */}
                {level.id === 1 && (
                  <motion.div
                    initial={{ x: -80, opacity: 0, scale: 0.5 }}
                    animate={{ x: -120, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                    className="absolute top-1/2 -translate-y-1/2 z-20"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-primary/30 rounded-full blur-2xl scale-150" />
                      <div className="relative w-20 h-20 bg-white rounded-full shadow-2xl p-2 border-4 border-primary/20">
                        <img
                          src={penguinImg}
                          alt="Penguin Player"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {/* Arrow pointing to level */}
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-1/2 -translate-y-1/2 right-0 text-2xl"
                      >
                        →
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                <button
                  onClick={() => level.unlocked && navigate(level.route)}
                  disabled={!level.unlocked}
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    level.unlocked
                      ? "shadow-[0_8px_24px_rgba(255,182,193,0.4)] hover:scale-110 cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  style={{ backgroundColor: level.color }}
                >
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                    <span className="font-bold text-foreground text-base">{level.id}</span>
                  </div>

                  {/* Level Content */}
                  <div className="text-center">
                    <div className="font-bold text-lg">{level.name}</div>
                    {!level.unlocked && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Lock className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Special Heart for Final Level */}
                  {level.id === 5 && (
                    <div className="absolute -top-3 -right-3">
                      <Heart className="w-10 h-10 text-destructive fill-destructive animate-pulse" />
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
            className="mt-6 mx-auto block text-sm text-muted-foreground hover:text-foreground bg-white rounded-full px-6 py-2 shadow-md"
          >
            ← Back to Welcome
          </motion.button>
        </div>
      </div>
    </div>
  );
}