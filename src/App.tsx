import { useState } from "react";
import "./App.css";
import UserRegistration from "./components/UserRegistration";
import type { UserData } from "./types/user";
import Quiz from "./components/Quiz";
import type { QuizAnswers } from "./types/quiz";
import MatchResults from "./components/MatchResults";

function App() {
  const [step, setStep] = useState<'registration' | 'quiz' | 'results'>('registration');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});

    const handleRegistration = (data: UserData) => {
    setUserData(data);
    setStep('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setStep('results'); 
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
        <Quiz userId={userData.id} userData={userData} onComplete={handleQuizComplete} />
      )}
      {step === 'results' && userData && (
        <MatchResults 
          userData={userData} 
          quizAnswers={quizAnswers} 
          onReset={resetApp}
        />
      )}
    </div>
  );
}

export default App;
