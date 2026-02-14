import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Heart, Check } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { ScoreDisplay } from "./ScoreDisplay";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import pandaImg from "../../assets/fa7d18de626fc1a836c71d58e7baf8fe173f504b.png";
import penguinImg from "../../assets/eb43db30baf40ba1d1ee413a90ac8503189b0177.png";

export default function Level4() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const questions = [
    {
      id: "q1",
      question: "Where was our first “official” date?",
      options: [
        "Fancy restaurant where bill paathu shock aayom 😭",
        "Beach la walk pannom, kadal than witness 🌊",
        "Coffee shop la 3 hours pesi world maranthom ☕",
        "Actually date nu sollala… but adhu dhaan first 😌",
      ],
    },
    {
      id: "q2",
      question: "What’s my favorite thing about you?",
      options: [
        "Un smile – instant happiness button 😍",
        "Un kovam – romba cute ah irukum 🙈",
        "Un care – konjam strict amma vibe 😂",
        "Ellame da, cheat code answer 💖",
      ],
    },
    {
      id: "q3",
      question: "If we fight, who says sorry first?",
      options: [
        "Nee dhaan, because I’m always right 😎",
        "Naan dhaan, peace vendum nu 🕊️",
        "10 mins silent treatment aprm both 😅",
        "Fight ah? Namma la? Impossible da 😌",
      ],
    },
    {
      id: "q4",
      question: "Our future dream plan?",
      options: [
        "Travel pannitu reels podalam 🌍",
        "Cute home + 1 dog + 1 fight daily 😂",
        "Business start panni power couple aagalam 💼",
        "Just together irundha pothum 💕",
      ],
    },
    {
      id: "q5",
      question: "What’s our inside joke word?",
      options: [
        "“Serious ah?” 🤨",
        "“Loose ah nee?” 😂",
        "“Baby panda” 🐼",
        "“Namma secret” 🤫",
      ],
    },
  ];

  const answeredCount = Object.values(answers).filter(a => a.trim() !== "").length;
  const score = (answeredCount / questions.length) * 10;

  const handleSubmit = () => {
    if (answeredCount >= 3) {
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    navigate("/final");
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 pb-24">
      {/* Audio Visualizer */}
      <div className="fixed top-4 right-4 z-50">
        <AudioVisualizer />
      </div>

      {/* Score Display */}
      <ScoreDisplay />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[32px] p-6 mb-6 shadow-[0_8px_32px_rgba(255,182,193,0.3)]"
        >
          <h2 className="text-2xl font-bold text-center mb-2">Level 4: Relationship Quiz</h2>
          <p className="text-sm text-center text-muted-foreground">One-Mark Task: Fill in the blanks!</p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Questions Form (Wider) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(255,182,193,0.3)] max-h-[70vh] overflow-y-auto scrollbar-hide"
            >
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label className="block mb-2 font-medium text-sm">
                      {index + 1}. {q.question}
                    </label>
                    <RadioGroup
                      value={answers[q.id as keyof typeof answers]}
                      onValueChange={(val) =>
                        setAnswers({ ...answers, [q.id]: val })
                      }
                      className="grid grid-cols-2 gap-3"
                      disabled={isSubmitted}
                    >
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className="flex items-center gap-3 rounded-xl border-2 border-border px-4 py-3 bg-input-background"
                        >
                          <RadioGroupItem value={opt} id={`${q.id}-${oi}`} />
                          <label
                            htmlFor={`${q.id}-${oi}`}
                            className="text-sm cursor-pointer"
                          >
                            {opt}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {!isSubmitted ? (
                  // Submit Button
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: answeredCount >= 3 ? 1.05 : 1 }}
                    whileTap={{ scale: answeredCount >= 3 ? 0.95 : 1 }}
                    onClick={handleSubmit}
                    disabled={answeredCount < 3}
                    className={`w-full rounded-full py-4 font-bold shadow-lg transition-all ${
                      answeredCount >= 3
                        ? "bg-primary text-primary-foreground hover:shadow-xl cursor-pointer"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
                  >
                    {answeredCount >= 3 ? "Submit Answers ✓" : `Answer at least 3 questions (${answeredCount}/3)`}
                  </motion.button>
                ) : (
                  // Submitted View with Answers
                  <>
                    {/* Success Message */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-primary/10 rounded-[24px] p-6 border-2 border-primary/20"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-primary">Submitted Successfully!</h3>
                      </div>
                      <p
                        className="text-center text-base"
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                      >
                        Your heartfelt answers have been recorded! 💕
                      </p>
                    </motion.div>

                    {/* Display Answers */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-[24px] p-6 space-y-4"
                    >
                      <h4 className="font-bold text-lg mb-4 text-center">Your Answers:</h4>
                      {questions.map((q, index) => {
                        const answer = answers[q.id as keyof typeof answers];
                        return (
                          <div key={q.id} className="bg-white rounded-[16px] p-4">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Question {index + 1}
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">{q.question}</p>
                            <div className="flex items-center gap-2">
                              {answer.trim() !== "" ? (
                                <>
                                  <Heart className="w-4 h-4 text-destructive fill-destructive flex-shrink-0" />
                                  <p className="font-bold text-base">{answer}</p>
                                </>
                              ) : (
                                <p className="text-muted-foreground italic text-sm">No answer provided</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>

                    {/* Next Button */}
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="w-full bg-primary text-primary-foreground rounded-full py-4 font-bold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Continue to Final Level 💕 →
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Couple Photo & Score */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
            {/* Couple Photo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-[32px] overflow-hidden shadow-[0_8px_32px_rgba(255,182,193,0.3)] bg-gradient-to-br from-primary/20 to-secondary/20 p-8"
            >
              <div className="flex flex-row items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24"
                >
                  <img
                    src={pandaImg}
                    alt="Panda"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </motion.div>
                <Heart className="w-10 h-10 text-destructive fill-destructive animate-pulse" />
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-24 h-24"
                >
                  <img
                    src={penguinImg}
                    alt="Penguin"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Quiz Score Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary to-accent rounded-[32px] p-8 shadow-[0_8px_32px_rgba(255,182,193,0.4)] relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>

              <div className="relative text-center">
                <p className="text-white/80 mb-3 font-medium text-sm">Quiz Score</p>
                <div className="relative inline-block">
                  {/* Circular Progress */}
                  <svg className="w-32 h-32" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      opacity="0.3"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeDasharray={`${(score / 10) * 339.29} 339.29`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{score.toFixed(0)}/10</span>
                  </div>
                </div>
                <p className="text-white/70 text-xs mt-3">
                  {answeredCount} of {questions.length} answered
                </p>
              </div>
            </motion.div>
          </div>
        </div>

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
