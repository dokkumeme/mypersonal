import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ArrowLeft, ArrowRight, Timer } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { ScoreDisplay } from "./ScoreDisplay";
import { useScore } from "../context/ScoreContext";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface FallingHeart {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export default function Level2() {
  const navigate = useNavigate();
  const { addScore } = useScore();
  const [gameStarted, setGameStarted] = useState(false);
  const [heartsCollected, setHeartsCollected] = useState(0);
  const [penguinPosition, setPenguinPosition] = useState(50); // Percentage from left
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [retryOtp, setRetryOtp] = useState("");
  const [retryError, setRetryError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute timer
  const [gameFailed, setGameFailed] = useState(false);
  const [showBypassModal, setShowBypassModal] = useState(false);
  const [bypassOtp, setBypassOtp] = useState("");
  const [bypassError, setBypassError] = useState(false);
  const heartIdCounter = useRef(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const correctRetryOTP = "6800";
  const correctBypassOTP = "9696";
  const penguinWidth = 120; // Penguin bucket width in pixels
  const targetHearts = 50; // Changed from 100 to 50

  // Calculate speed based on hearts collected
  const getGameSpeed = () => {
    const tier = Math.floor(heartsCollected / 10);
    return 2 + tier * 0.5; // Base speed 2, increases by 0.5 every 10 hearts
  };

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver || gameFailed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameFailed(true);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, gameFailed]);

  // Spawn hearts periodically
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      const newHeart: FallingHeart = {
        id: heartIdCounter.current++,
        x: Math.random() * 80 + 10, // Random position 10% to 90%
        y: 0,
        collected: false,
      };
      setFallingHearts((prev) => [...prev, newHeart]);
    }, 1500); // New heart every 1.5 seconds

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Move hearts down and check collision
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setFallingHearts((prev) => {
        const gameWidth = gameAreaRef.current?.offsetWidth || 800;
        const penguinLeft = (penguinPosition / 100) * gameWidth;
        const penguinRight = penguinLeft + penguinWidth;

        return prev
          .map((heart) => {
            if (heart.collected) return heart;

            const newY = heart.y + getGameSpeed();
            const heartX = (heart.x / 100) * gameWidth;

            // Check collision with penguin bucket
            if (
              newY >= 70 &&
              newY <= 85 &&
              heartX >= penguinLeft - 20 &&
              heartX <= penguinRight + 20
            ) {
              // Collected!
              setHeartsCollected((c) => {
                const newCount = c + 1;
                addScore(1);
                if (newCount >= targetHearts) {
                  setGameOver(true);
                  setTimeout(() => navigate("/level-3"), 2000);
                }
                return newCount;
              });
              return { ...heart, collected: true };
            }

            return { ...heart, y: newY };
          })
          .filter((heart) => heart.y < 100); // Remove hearts that fell off screen
      });
    }, 50);

    return () => clearInterval(interval);
  }, [penguinPosition, gameStarted, gameOver, addScore, navigate]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") {
        setPenguinPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === "ArrowRight") {
        setPenguinPosition((prev) => Math.min(80, prev + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  const handleRetry = () => {
    if (retryOtp === correctRetryOTP) {
      // Reset game
      setHeartsCollected(0);
      setFallingHearts([]);
      setPenguinPosition(50);
      setGameOver(false);
      setShowRetryModal(false);
      setRetryOtp("");
      setRetryError(false);
      setTimeLeft(60);
      setGameFailed(false);
    } else {
      setRetryError(true);
      setTimeout(() => setRetryError(false), 2000);
    }
  };

  const handleBypass = () => {
    if (bypassOtp === correctBypassOTP) {
      // Bypass to next level
      setShowBypassModal(false);
      setBypassOtp("");
      setBypassError(false);
      navigate("/level-3");
    } else {
      setBypassError(true);
      setTimeout(() => setBypassError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 overflow-hidden">
      {/* Audio Visualizer */}
      <div className="fixed top-4 right-4 z-50">
        <AudioVisualizer />
      </div>

      {/* Score Display */}
      <ScoreDisplay />

      {/* Main Game Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[32px] p-4 mb-4 shadow-[0_8px_32px_rgba(255,182,193,0.3)] text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Level 2: Heart Rain Catcher</h2>
          <div className="flex justify-center items-center gap-2">
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <span className="text-lg font-bold text-primary">
              {heartsCollected} / {targetHearts} Hearts
            </span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Timer className="w-5 h-5 text-destructive fill-destructive" />
            <span className="text-lg font-bold text-primary">
              {timeLeft} seconds
            </span>
          </div>
        </motion.div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          className="relative bg-white rounded-[32px] shadow-[0_8px_32px_rgba(255,182,193,0.3)] overflow-hidden"
          style={{ height: "500px" }}
        >
          {/* Timer Display Above Panda */}
          <div className="absolute left-4 top-4 z-10">
            <motion.div
              className="bg-gradient-to-r from-destructive to-primary rounded-[20px] px-6 py-3 shadow-lg border-4 border-white"
              animate={{
                scale: timeLeft <= 10 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: timeLeft <= 10 ? Infinity : 0,
              }}
            >
              <div className="flex items-center gap-2">
                <Timer className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">
                  {String(Math.floor(timeLeft / 60)).padStart(1, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Panda on Left */}
          <div className="absolute left-4 bottom-4 w-24 h-24 z-10">
            <img src={pandaImg} alt="Panda" className="w-full h-full object-contain" />
          </div>

          {/* Falling Hearts */}
          {fallingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: heart.collected ? 0 : 1,
                rotate: heart.collected ? 360 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-8 h-8 text-destructive fill-destructive" />
            </motion.div>
          ))}

          {/* Penguin with Bucket */}
          <motion.div
            className="absolute bottom-8 z-20 flex flex-col items-center"
            style={{
              left: `${penguinPosition}%`,
              width: `${penguinWidth}px`,
            }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-20 h-20 mb-2">
              <img
                src={penguinImg}
                alt="Penguin"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Bucket */}
            <div className="w-28 h-16 bg-gradient-to-b from-primary/80 to-primary rounded-b-[24px] border-4 border-primary/40 shadow-lg"></div>
          </motion.div>

          {/* Game Over Success */}
          <AnimatePresence>
            {gameOver && heartsCollected >= targetHearts && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-background/90 flex items-center justify-center z-30"
              >
                <div className="bg-white rounded-[32px] p-8 text-center shadow-2xl">
                  <h3 className="text-3xl font-bold text-primary mb-4">
                    Amazing! 🎉
                  </h3>
                  <p className="text-lg mb-2">You collected all {targetHearts} hearts!</p>
                  <p className="text-sm text-muted-foreground">
                    Moving to next level...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Over Failure */}
          <AnimatePresence>
            {gameOver && gameFailed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-background/90 flex items-center justify-center z-30"
              >
                <div className="bg-white rounded-[32px] p-8 text-center shadow-2xl">
                  <h3 className="text-3xl font-bold text-destructive mb-4">
                    Time's Up! 😢
                  </h3>
                  <p className="text-lg mb-2">You didn't collect enough hearts in time.</p>
                  <p className="text-sm text-muted-foreground">
                    Try again!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start Game Overlay */}
          <AnimatePresence>
            {!gameStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center z-30"
              >
                <div className="bg-white rounded-[32px] p-8 text-center shadow-2xl max-w-md">
                  {/* Characters */}
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-24 h-24"
                    >
                      <img src={pandaImg} alt="Panda" className="w-full h-full object-contain" />
                    </motion.div>
                    <Heart className="w-12 h-12 text-destructive fill-destructive animate-pulse" />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="w-24 h-24"
                    >
                      <img src={penguinImg} alt="Penguin" className="w-full h-full object-contain" />
                    </motion.div>
                  </div>

                  <h3 className="text-3xl font-bold text-primary mb-4">
                    Ready to Catch Hearts? 💕
                  </h3>
                  <div className="bg-primary/10 rounded-[24px] p-6 mb-6">
                    <p
                      className="text-base mb-3"
                      style={{ fontFamily: "'Patrick Hand', cursive" }}
                    >
                      Help the penguin catch {targetHearts} falling hearts in {timeLeft} seconds!
                    </p>
                    <div className="space-y-2 text-sm text-left">
                      <p>• Use ← → arrow keys to move</p>
                      <p>• Speed increases every 10 hearts!</p>
                      <p>• Don't let hearts fall! 💔</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGameStarted(true)}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-full py-4 px-8 font-bold text-lg shadow-lg hover:scale-105 transition-transform border-4 border-white"
                  >
                    Start Game! 🎮
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPenguinPosition((prev) => Math.max(0, prev - 10))}
              className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowRetryModal(true)}
              className="bg-accent text-accent-foreground rounded-full px-8 py-4 font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Retry (Kiss Required 💋)
            </button>
            <button
              onClick={() => setPenguinPosition((prev) => Math.min(80, prev + 10))}
              className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Bypass Button */}
          <button
            onClick={() => setShowBypassModal(true)}
            className="bg-gradient-to-r from-primary to-secondary text-white rounded-full px-10 py-3 font-bold shadow-lg hover:scale-105 transition-transform border-4 border-white"
          >
            Skip Level (Task Required 🎯)
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Use ← → arrow keys or buttons to move the penguin!
        </p>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/levels")}
          className="mt-6 mx-auto block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Level Hub
        </motion.button>
      </div>

      {/* Retry Modal */}
      <AnimatePresence>
        {showRetryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                Retry Request 💋
              </h3>
              <div className="bg-accent/30 rounded-[24px] p-6 mb-6">
                <p
                  className="text-center mb-4"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  To retry, you need to kiss me first! 😘
                  <br />
                  Then I'll give you the OTP code!
                </p>
                <div className="text-center mb-4">
                  <label className="text-sm font-medium block mb-2">
                    Enter OTP Code:
                  </label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      value={retryOtp}
                      onChange={(value) => setRetryOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                        <InputOTPSlot
                          index={1}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                        <InputOTPSlot
                          index={2}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                        <InputOTPSlot
                          index={3}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                {retryError && (
                  <p className="text-destructive text-sm text-center mb-2">
                    Wrong code! Did you really kiss me? 😏
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRetryModal(false);
                    setRetryOtp("");
                    setRetryError(false);
                  }}
                  className="flex-1 bg-muted text-foreground rounded-full py-3 font-bold hover:scale-105 transition-transform"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRetry}
                  className="flex-1 bg-primary text-primary-foreground rounded-full py-3 font-bold hover:scale-105 transition-transform"
                >
                  Retry Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bypass Modal */}
      <AnimatePresence>
        {showBypassModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                Skip Level Challenge 🎯
              </h3>
              <div className="bg-accent/30 rounded-[24px] p-6 mb-6">
                <p
                  className="text-center mb-4 text-lg font-bold"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  Complete this task to get the bypass code! 💝
                </p>
                
                {/* Task Instructions */}
                <div className="bg-white rounded-[20px] p-4 mb-4 shadow-md">
                  <p className="text-sm mb-2 font-bold text-primary">Your Task:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Send me a cute text message 💬</li>
                    <li>Tell me 3 things you love about me 💕</li>
                    <li>Give me a virtual hug 🤗</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Once you've done this, I'll give you the OTP code!
                  </p>
                </div>

                <div className="text-center mb-4">
                  <label className="text-sm font-medium block mb-2">
                    Enter OTP Code:
                  </label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      value={bypassOtp}
                      onChange={(value) => setBypassOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                        <InputOTPSlot
                          index={1}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                        <InputOTPSlot
                          index={2}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                        <InputOTPSlot
                          index={3}
                          className="rounded-2xl w-12 h-12 text-lg border-2 border-primary bg-white"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                {bypassError && (
                  <p className="text-destructive text-sm text-center mb-2">
                    Wrong code! Did you complete the task? 😏
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowBypassModal(false);
                    setBypassOtp("");
                    setBypassError(false);
                  }}
                  className="flex-1 bg-muted text-foreground rounded-full py-3 font-bold hover:scale-105 transition-transform"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBypass}
                  className="flex-1 bg-primary text-primary-foreground rounded-full py-3 font-bold hover:scale-105 transition-transform"
                >
                  Skip to Next Level
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
