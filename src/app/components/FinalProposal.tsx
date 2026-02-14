import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";

export default function FinalProposal() {
  const navigate = useNavigate();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const noButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const romanticQuotes = [
    "Every love story is beautiful, but ours is my favorite 💕",
    "You are my today and all of my tomorrows ✨",
    "In a sea of people, my eyes will always search for you 🌊",
    "You make my heart smile in ways I never knew possible 😊",
    "Being with you feels like coming home 🏡",
    "You're the reason I believe in love 💖",
  ];

  // Rotate quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % romanticQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleYes = () => {
    setAccepted(true);
    setShowConfetti(true);
  };

  const handleNoHover = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const button = noButtonRef.current.getBoundingClientRect();

    // Get viewport dimensions with padding
    const padding = 20;
    const maxX = window.innerWidth - button.width - padding;
    const maxY = window.innerHeight - button.height - padding;

    // Generate random position within safe bounds
    const randomX = Math.max(padding, Math.min(maxX, Math.random() * (window.innerWidth - button.width - padding * 2) + padding));
    const randomY = Math.max(padding, Math.min(maxY, Math.random() * (window.innerHeight - button.height - padding * 2) + padding));

    // Set absolute position values instead of relative
    setNoButtonPosition({
      x: randomX,
      y: randomY,
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-primary/20 p-4 sm:p-8 relative overflow-hidden"
    >
      {/* Audio Visualizer */}
      <div className="fixed top-4 right-4 z-50">
        <AudioVisualizer />
      </div>

      {/* Floating Hearts Background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        >
          <Heart className="w-6 h-6 text-destructive/20 fill-destructive/20" />
        </motion.div>
      ))}

      {/* Sparkles Background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Sparkles className="w-4 h-4 text-primary/40" />
        </motion.div>
      ))}

      {/* Confetti on Accept */}
      {showConfetti &&
        Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            className="absolute"
            initial={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
              scale: 0,
            }}
            animate={{
              x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
              y: window.innerHeight / 2 + (Math.random() - 0.5) * 600,
              scale: 1,
              opacity: 0,
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          >
            {Math.random() > 0.5 ? (
              <Heart className="w-6 h-6 text-destructive fill-destructive" />
            ) : (
              <Sparkles className="w-6 h-6 text-primary" />
            )}
          </motion.div>
        ))}

      {/* Main Container */}
      <div className="max-w-3xl mx-auto relative z-10">
        {!accepted ? (
          <>
            {/* Animated Quote Display */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-8 text-center"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl text-primary/80 italic"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  "{romanticQuotes[currentQuoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Proposal Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="bg-white rounded-[40px] p-8 sm:p-12 shadow-[0_20px_80px_rgba(255,182,193,0.6)] relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>

              {/* Decorative Hearts in corners */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 left-4"
              >
                <Heart className="w-8 h-8 text-destructive/30 fill-destructive/30" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-4 right-4"
              >
                <Heart className="w-8 h-8 text-destructive/30 fill-destructive/30" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-4 left-4"
              >
                <Heart className="w-8 h-8 text-destructive/30 fill-destructive/30" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-4 right-4"
              >
                <Heart className="w-8 h-8 text-destructive/30 fill-destructive/30" />
              </motion.div>

              {/* Characters Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative mb-8"
              >
                <div className="relative w-72 h-72 mx-auto rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 shadow-2xl flex items-center justify-center p-8">
                  {/* Rotating ring effect */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-dashed border-primary/30"
                  />

                  <div className="flex items-center justify-center gap-6 relative z-10">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-28 h-28"
                    >
                      <img
                        src={pandaImg}
                        alt="Panda"
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                    
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Heart className="w-12 h-12 text-destructive fill-destructive" />
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [5, -5, 5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="w-28 h-28"
                    >
                      <img
                        src={penguinImg}
                        alt="Penguin"
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </div>

                  {/* Orbiting hearts */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Heart className="absolute top-8 left-1/2 w-6 h-6 text-destructive fill-destructive" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Heart className="absolute bottom-8 left-1/2 w-5 h-5 text-destructive fill-destructive" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Speech Bubble */}
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                className="relative bg-gradient-to-br from-accent/60 to-primary/40 rounded-[32px] p-6 mb-6 border-4 border-white shadow-lg"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent/60 border-l-4 border-t-4 border-white rotate-45"></div>
                <p
                  className="text-center text-xl sm:text-2xl text-foreground"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  Will you be my Valentine... for life? 💕✨
                </p>
              </motion.div>

              {/* Main Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center mb-8"
              >
                <motion.h1
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl sm:text-6xl font-bold mb-4"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  Say YES! 
                  <motion.span
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    className="inline-block ml-2"
                  >
                    <Heart className="inline w-12 h-12 text-destructive fill-destructive" />
                  </motion.span>
                </motion.h1>
                <p
                  className="text-lg sm:text-xl text-muted-foreground"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  You know there's only one right answer... 😊
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col items-center justify-center gap-6 relative"
              >
                {/* YES Button */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYes}
                  animate={{
                    boxShadow: [
                      "0 8px 32px rgba(255,182,193,0.6)",
                      "0 12px 48px rgba(255,182,193,0.9)",
                      "0 8px 32px rgba(255,182,193,0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-primary via-destructive to-primary text-white rounded-full px-20 py-6 font-bold text-3xl shadow-2xl border-4 border-white relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                  <span className="relative z-10">YES! 💕</span>
                </motion.button>

                {/* NO Button (runs away on hover) */}
                <div ref={noButtonRef} className="relative">
                  <motion.button
                    animate={
                      noButtonPosition.x !== 0 || noButtonPosition.y !== 0
                        ? { left: noButtonPosition.x, top: noButtonPosition.y }
                        : {}
                    }
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    style={{
                      position: noButtonPosition.x !== 0 || noButtonPosition.y !== 0 ? "fixed" : "relative",
                      zIndex: 40,
                    }}
                    className="bg-muted/50 text-muted-foreground rounded-full px-10 py-3 font-medium text-lg shadow-md cursor-pointer hover:bg-muted/70 transition-colors border-2 border-muted"
                  >
                    No
                  </motion.button>
                </div>
              </motion.div>

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-muted-foreground italic mb-2">
                  Note: The "No" button is very shy... it runs away! 😏
                </p>
                <p className="text-xs text-muted-foreground">
                  You can't ever say No forever! Accept it. 
                  <Heart className="inline w-4 h-4 text-destructive fill-destructive ml-1" />
                </p>
              </motion.div>
            </motion.div>

            {/* Panda and Penguin on sides */}
            <div className="hidden lg:block">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="fixed left-8 bottom-8 w-32 h-32"
              >
                <img src={pandaImg} alt="Panda" className="w-full h-full object-contain drop-shadow-2xl" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="fixed right-8 bottom-8 w-32 h-32"
              >
                <img src={penguinImg} alt="Penguin" className="w-full h-full object-contain drop-shadow-2xl" />
              </motion.div>
            </div>
          </>
        ) : (
          /* Accepted State */
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="bg-white rounded-[40px] p-12 sm:p-16 shadow-[0_20px_80px_rgba(255,182,193,0.6)] text-center relative overflow-hidden"
          >
            {/* Celebration Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />

            <div className="relative z-10">
              {/* Celebrating Characters */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                className="flex justify-center items-center gap-6 mb-8"
              >
                <motion.div
                  animate={{ rotate: [0, -20, 20, -20, 0] }}
                  transition={{ duration: 0.5, repeat: 5 }}
                  className="w-32 h-32"
                >
                  <img src={pandaImg} alt="Happy Panda" className="w-full h-full object-contain" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1, repeat: 3 }}
                >
                  <Heart className="w-20 h-20 text-destructive fill-destructive" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 20, -20, 20, 0] }}
                  transition={{ duration: 0.5, repeat: 5 }}
                  className="w-32 h-32"
                >
                  <img src={penguinImg} alt="Happy Penguin" className="w-full h-full object-contain" />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-5xl sm:text-7xl font-bold mb-6 text-primary"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                YAAAAY! 🎉✨
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                You made us the happiest! 💕
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
              >
                Every moment with you is a treasure. Here's to our forever! 🌟
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-12 py-4 font-bold text-xl shadow-lg"
                >
                  Relive the Journey 🔄
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/levels")}
                  className="bg-white text-primary rounded-full px-12 py-4 font-bold text-xl shadow-lg border-4 border-primary"
                >
                  Back to Levels 🎮
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Exit Options */}
        {!accepted && (
          <div className="mt-8 flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/levels")}
              className="text-sm text-muted-foreground hover:text-foreground bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-md"
            >
              ← Back to Level Hub
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}