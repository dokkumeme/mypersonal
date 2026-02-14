import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { AudioVisualizer } from "./AudioVisualizer";
import { ScoreDisplay } from "./ScoreDisplay";
import { useScore } from "../context/ScoreContext";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";
import profileImg from "../../assets/b7b2a2b5600491abcb11b559fc02a8d951cca7de.png";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { AlertCircle } from "lucide-react";

export default function Level1() {
  const navigate = useNavigate();
  const { addScore } = useScore();
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const correctOTP = "0420";

  const handleVerify = () => {
    if (otp === correctOTP) {
      // Success - add points and go to next level
      addScore(20); // 20 points for Level 1
      navigate("/level-2");
    } else {
      // Show error
      setShowError(true);
      setErrorCount(prev => prev + 1);
      setTimeout(() => setShowError(false), 3000);
    }
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
      <div className="w-[60%] mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(255,182,193,0.3)] relative"
        >
          {/* Panda Guide */}
          <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full overflow-hidden bg-accent shadow-lg">
            <img
              src={pandaImg}
              alt="Panda"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Penguin Player */}
          <div className="absolute -right-6 top-20 w-20 h-20 rounded-full overflow-hidden bg-secondary/40 shadow-lg">
            <img
              src={penguinImg}
              alt="Penguin"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Level 1: Verification</h2>

            {/* Profile Form with Picture */}
            <div className="flex gap-4 mb-6">
              {/* Form Fields - Left Side */}
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="name" className="text-sm mb-1 block">Name:</Label>
                  <Input
                    id="name"
                    value="Harsha Priyadharshini"
                    readOnly
                    className="rounded-full bg-muted border-2 border-border px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="text-sm mb-1 block">Age:</Label>
                  <Input
                    id="age"
                    value="22"
                    readOnly
                    className="rounded-full bg-muted border-2 border-border px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="kisses" className="text-sm mb-1 block">Kisses received:</Label>
                  <Input
                    id="kisses"
                    value="∞"
                    readOnly
                    className="rounded-full bg-muted border-2 border-border px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="favoriteColor" className="text-sm mb-1 block">Favorite Color:</Label>
                  <Input
                    id="favoriteColor"
                    value="Black"
                    readOnly
                    className="rounded-full bg-muted border-2 border-border px-4 py-2 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="relationship" className="text-sm mb-1 block">Relationship Status:</Label>
                  <Input
                    id="relationship"
                    value="Taken by You 💕"
                    readOnly
                    className="rounded-full bg-muted border-2 border-border px-4 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Profile Picture - Right Side */}
              <div className="flex-shrink-0">
                <div className="w-62 h-70 rounded-[24px] overflow-hidden shadow-lg border-4 border-primary/20">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* OTP Section */}
            <div className="bg-accent/30 rounded-[24px] p-6 mb-6">
              {/* Panda Dialogue Bubble */}
              <div className="relative bg-white rounded-[20px] p-4 mb-4 shadow-md">
                <div className="absolute -left-2 top-4 w-4 h-4 bg-white rotate-45"></div>
                <p className="text-sm" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                  Ask your heart owner for the code! 💝
                </p>
              </div>

              <Label className="text-sm mb-3 block text-center">Enter OTP Code:</Label>
              <div className="flex justify-center mb-4">
                <InputOTP maxLength={4} value={otp} onChange={(value) => setOtp(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="rounded-2xl w-14 h-14 text-xl border-2 border-primary bg-white" />
                    <InputOTPSlot index={1} className="rounded-2xl w-14 h-14 text-xl border-2 border-primary bg-white" />
                    <InputOTPSlot index={2} className="rounded-2xl w-14 h-14 text-xl border-2 border-primary bg-white" />
                    <InputOTPSlot index={3} className="rounded-2xl w-14 h-14 text-xl border-2 border-primary bg-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Error Card */}
            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-destructive/10 border-2 border-destructive rounded-[24px] p-4 mb-6 flex items-start gap-3"
                >
                  <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-destructive mb-1">Error!</p>
                    <p className="text-sm text-destructive">
                      You will be charged 1000 kisses for each mistake.
                    </p>
                    <p className="text-xs text-destructive/80 mt-1">
                      Mistakes so far: {errorCount}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Explore Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVerify}
              className="w-full bg-primary text-primary-foreground rounded-full py-4 font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Explore
            </motion.button>

            <p className="text-xs text-center text-muted-foreground mt-4 italic">
              Note: This is setup to ensure this sleeping to THIS girl.
            </p>
          </div>
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
    </div>
  );
}
