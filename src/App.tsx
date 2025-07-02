import { useState } from "react";
import "./App.css";
import UserRegistration from "./components/UserRegistration";
import type { UserData } from "./types/user";
import Quiz from "./components/Quiz";
import type { QuizAnswers } from "./types/quiz";
import NoMatch from "./components/NoMatch";
import MatchResults from "./components/MatchResults";

function App() {
  const [step, setStep] = useState<'registration' | 'quiz' | 'results' | 'no-match'>('registration');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});

    const handleRegistration = (data: UserData) => {
    setUserData(data);
    setStep('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    // console.log('Quiz Answers:', answers);
    // console.log('User Data:', userData);

    const hasMatch = Math.random() > 0.1; // 90% chance of match
    setStep(hasMatch ? 'results' : 'no-match');
  };

  const resetApp = () => {
    setStep('registration');
    setUserData(null);
    setQuizAnswers({});
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-rose-100">
      {step === 'registration' && (
        <UserRegistration onComplete={handleRegistration} />
      )}
      {step === 'quiz' && userData && (
        <Quiz userData={userData} onComplete={handleQuizComplete} />
      )}
      {step === 'results' && userData && (
        <MatchResults 
          userData={userData} 
          quizAnswers={quizAnswers} 
          onReset={resetApp}
        />
      )}
      {step === 'no-match' && (
        <NoMatch onReset={resetApp} />
      )}
    </div>
  );
}

export default App;
