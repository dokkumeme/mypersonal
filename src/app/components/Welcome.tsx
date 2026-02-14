import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/40 to-primary/20 relative overflow-hidden">
      {/* Audio Visualizer */}
      <div className="fixed top-4 right-4 z-50">
        <AudioVisualizer />
      </div>

      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Organic blob shapes */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-2xl"
        />
      </div>

      {/* Floating Hearts */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${(i * 12.5) % 100}%`,
          }}
          initial={{
            y: '100vh',
          }}
          animate={{
            y: '-10vh',
          }}
          transition={{
            duration: 10 + (i % 3) * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
        >
          <motion.div
            animate={{
              x: [0, 20, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-4 h-4 text-destructive/20 fill-destructive/20" />
          </motion.div>
        </motion.div>
      ))}

      {/* Floating Stars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${(i * 16) % 100}%`,
          }}
          initial={{
            y: '-10vh',
            scale: 0,
          }}
          animate={{
            y: '100vh',
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + (i % 3) * 2,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut"
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 180, 360],
              x: [0, -15, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="w-3 h-3 text-primary/30 fill-primary/30" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Large Panda */}
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -20 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              bounce: 0.4
            }}
            className="flex justify-center lg:justify-end relative"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              {/* Glow effect behind panda */}
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-3xl scale-210" />
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <img
                  src={pandaImg}
                  alt="Panda"
                  className="w-full h-full object-contain drop-shadow-2xl scale-125"
                />
              </div>

              {/* Sparkles around panda */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -right-8"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4"
              >
                <Sparkles className="w-6 h-6 text-secondary" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content and Penguin */}
          <div className="flex flex-col items-center lg:items-start space-y-8 relative">
            
            {/* Top Section - Title and Penguin */}
            <div className="w-full flex flex-col items-center lg:items-start relative">
              
              {/* Penguin Character - Top Right */}
              <motion.div
                initial={{ x: 200, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1, 
                  type: "spring",
                  bounce: 0.5,
                  delay: 0.3
                }}
                className="absolute -top-4 right-0 lg:right-8 z-20"
              >
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [3, -3, 3]
                  }}
                  transition={{ 
                    duration: 3.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  {/* Circular glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-primary/30 rounded-full blur-2xl scale-125" />
                  
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full shadow-2xl p-4 border-4 border-primary/20">
                    <img
                      src={penguinImg}
                      alt="Penguin"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Floating heart near penguin */}
                  <motion.div
                    animate={{ 
                      y: [-5, -15, -5],
                      x: [-2, 2, -2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-2 -left-2"
                  >
                    <Heart className="w-6 h-6 text-destructive fill-destructive drop-shadow-lg" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Title Text */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center lg:text-left mt-8 lg:mt-0 relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg sm:text-xl text-muted-foreground mb-2 flex items-center gap-2 justify-center lg:justify-start"
                >
                  <span>Welcome to</span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                    className="inline-block"
                  >
                    <Heart className="w-5 h-5 text-destructive fill-destructive" />
                  </motion.span>
                </motion.div>
                
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-destructive to-secondary bg-clip-text text-transparent"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  World of My
                  <br />
                  Penguin
                </motion.h1>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <Heart className="w-12 h-12 text-destructive fill-destructive mx-auto lg:mx-0" />
                </motion.div>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center lg:text-left max-w-md"
            >
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Embark on a sweet journey through love,
                <br />
                <span className="inline-flex items-center gap-2">
                  memories, and adorable challenges!
                  <motion.span
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    🎀
                  </motion.span>
                </span>
              </p>
            </motion.div>

            {/* Explore Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 60px rgba(255, 182, 193, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/levels")}
                className="bg-primary text-white rounded-full px-16 py-5 text-xl sm:text-2xl font-bold shadow-[0_12px_40px_rgba(255,182,193,0.5)] hover:shadow-[0_16px_56px_rgba(255,182,193,0.7)] transition-all relative overflow-hidden group"
              >
                {/* Button shine effect */}
                <motion.div
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 right-0 opacity-20"
            >
              <Star className="w-16 h-16 text-primary fill-primary" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
}