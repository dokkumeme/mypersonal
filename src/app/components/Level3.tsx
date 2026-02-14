import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart, Play, Clock, X } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { ScoreDisplay } from "./ScoreDisplay";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";
import img1 from "@/assets/gallery/1.jpeg";
import img2 from "@/assets/gallery/2.jpeg";
import img3 from "@/assets/gallery/3.jpeg";
import img4 from "@/assets/gallery/4.jpeg";
import img5 from "@/assets/gallery/5.jpeg";
import img6 from "@/assets/gallery/6.jpeg";
import img7 from "@/assets/gallery/7.jpeg";
import img8 from "@/assets/gallery/8.jpeg";
import img9 from "@/assets/gallery/9.jpeg";
import img10 from "@/assets/gallery/10.jpeg";

export default function Level3() {
  const navigate = useNavigate();
  const sliderRef = useRef<any>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showScoldingModal, setShowScoldingModal] = useState(false);
  const REQUIRED_TIME = 300; // 5 minutes in seconds

  // Timer to track elapsed time
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    if (elapsedTime < REQUIRED_TIME) {
      // Show scolding modal
      setShowScoldingModal(true);
    } else {
      // Allow navigation
      navigate("/level-4");
    }
  };

  const remainingMinutes = Math.ceil((REQUIRED_TIME - elapsedTime) / 60);

  const captions: string[] = [
    "Starting new chapters and celebrating traditions with my favorite person by my side. ✨❤️",
    "Mirror selfies and shopping sprees. Life is just better when we’re doing the ‘everyday’ things together. 🛍️🤳",
    "Just me and my human shield. Thanks for always having my back (and being my personal photographer)! 📸🤭",
    "Twinned in smiles and glowing in blue. Every moment with you feels like a celebration. 💙😊",
    "Quiet dinner dates and messy hair—nothing beats these low-key moments with you. 🍜✨",
    "Finding our style and making memories. Every aisle is an adventure when I’m with you. 👟🌟",
    "Leaning on you is my favorite place to be. Sweet moments and pink skies. 🌸💕",
    "Finding shade under the trees and peace in your company. Just us and the great outdoors. 🌳🍃",
    "Casual days, bright smiles, and a whole lot of love. No filters needed for this kind of happiness. ☀️🙌",
    "A promise held in a hand, a heart held in a gaze. It’s always been you. 💍❤️",
  ];

  const memories = [
    { type: "image", url: img1, caption: captions[0] || "" },
    { type: "image", url: img2, caption: captions[1] || "" },
    { type: "image", url: img3, caption: captions[2] || "" },
    { type: "image", url: img4, caption: captions[3] || "" },
    { type: "image", url: img5, caption: captions[4] || "" },
    { type: "image", url: img6, caption: captions[5] || "" },
    { type: "image", url: img7, caption: captions[6] || "" },
    { type: "image", url: img8, caption: captions[7] || "" },
    { type: "image", url: img9, caption: captions[8] || "" },
    { type: "image", url: img10, caption: captions[9] || "" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: true,
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      {/* Audio Visualizer */}
      <div className="fixed top-4 right-4 z-50">
        <AudioVisualizer />
      </div>

      {/* Score Display */}
      <ScoreDisplay />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header with Quote */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[32px] p-6 sm:p-8 mb-6 shadow-[0_8px_32px_rgba(255,182,193,0.3)] text-center relative"
        >
          {/* Panda Character */}
          <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full overflow-hidden bg-accent shadow-lg">
            <img src={pandaImg} alt="Panda" className="w-full h-full object-cover" />
          </div>

          {/* Penguin Character */}
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full overflow-hidden bg-secondary/40 shadow-lg">
            <img src={penguinImg} alt="Penguin" className="w-full h-full object-cover" />
          </div>

          <div className="pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-destructive fill-destructive" />
              Moments of Love
              <Heart className="w-6 h-6 text-destructive fill-destructive" />
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              Great, You played really well!{" "}
              <span className="text-primary font-bold">
                (epdiyum naan dhan skip panirupen 😏)
              </span>
              <br />
              Now it's time to relax and enjoy our sweet memories together... 💕
            </p>
          </div>
        </motion.div>

        {/* Carousel Gallery */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[32px] p-4 sm:p-8 shadow-[0_8px_32px_rgba(255,182,193,0.3)] overflow-hidden"
        >
          <div className="carousel-container pb-10">
            <Slider ref={sliderRef} {...sliderSettings}>
              {memories.map((memory, index) => (
                <div key={index} className="outline-none">
                  <div className="relative rounded-[24px] overflow-hidden">
                    {memory.type === "image" ? (
                      <div className="relative">
                        <img
                          src={memory.url}
                          alt={memory.caption}
                          className="w-full h-[400px] sm:h-[500px] object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        {/* Caption */}
                        <div className="absolute bottom-12 left-0 right-0 p-6">
                          <p
                            className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                          >
                            {memory.caption}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Play className="w-20 h-20 text-primary" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p
                            className="text-foreground text-xl sm:text-2xl font-bold"
                            style={{ fontFamily: "'Patrick Hand', cursive" }}
                          >
                            {memory.caption}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Memory Counter */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {memories.length} precious memories 💝
            </p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-col items-center gap-3"
        >
          <button
            onClick={handleContinue}
            className={`rounded-full px-8 py-4 font-bold shadow-lg transition-all ${
              elapsedTime >= REQUIRED_TIME
                ? "bg-primary text-primary-foreground hover:scale-105"
                : "bg-primary/50 text-primary-foreground cursor-pointer hover:scale-105"
            }`}
          >
            Continue to Next Level 💕
          </button>
          
          {elapsedTime < REQUIRED_TIME && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {remainingMinutes} minute{remainingMinutes !== 1 ? "s" : ""} remaining
              </span>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/levels")}
          className="mt-6 mx-auto block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Level Hub
        </motion.button>
      </div>

      {/* Scolding Modal */}
      <AnimatePresence>
        {showScoldingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowScoldingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-[0_16px_48px_rgba(255,182,193,0.4)] relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowScoldingModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-destructive" />
              </button>

              {/* Angry Penguin */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="w-32 h-32"
                >
                  <img
                    src={penguinImg}
                    alt="Angry Penguin"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </motion.div>
              </div>

              {/* Scolding Message */}
              <div className="text-center">
                <h3
                  className="text-2xl font-bold mb-4 text-destructive"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  Urgent? Modha konjam rasichu parudi idhellam! 😤
                </h3>
                <p className="text-base mb-4 text-foreground/80">
                  Take your time and enjoy our precious memories properly!
                </p>
                <div className="bg-primary/10 rounded-[24px] p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Clock className="w-5 h-5" />
                    <span className="font-bold text-lg">
                      {remainingMinutes} more minute{remainingMinutes !== 1 ? "s" : ""} to go!
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowScoldingModal(false)}
                  className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold hover:scale-105 transition-transform"
                >
                  Okay, I'll wait 🥺
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Carousel Styles */}
      <style>{`
        .carousel-container .slick-dots {
          bottom: -40px;
        }
        
        .carousel-container .slick-dots li button:before {
          font-size: 12px;
          color: #FFB6C1;
          opacity: 0.5;
        }
        
        .carousel-container .slick-dots li.slick-active button:before {
          color: #FFB6C1;
          opacity: 1;
        }
        
        .carousel-container .slick-prev,
        .carousel-container .slick-next {
          z-index: 10;
          width: 40px;
          height: 40px;
        }
        
        .carousel-container .slick-prev {
          left: 10px;
        }
        
        .carousel-container .slick-next {
          right: 10px;
        }
        
        .carousel-container .slick-prev:before,
        .carousel-container .slick-next:before {
          font-size: 40px;
          color: #FFB6C1;
          opacity: 0.8;
        }
        
        .carousel-container .slick-prev:hover:before,
        .carousel-container .slick-next:hover:before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
