import { createContext, useContext, useState, ReactNode } from 'react';

interface ScoreContextType {
  score: number;
  addScore: (points: number) => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);

  const addScore = (points: number) => {
    setScore((prev) => Math.min(prev + points, 100)); // Max 100 points
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <ScoreContext.Provider value={{ score, addScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
