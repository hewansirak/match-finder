import { useState } from "react";
import "./App.css";
import UserRegistration from "./components/UserRegistration";
import type { UserData } from "./types/user";
import Quiz from "./components/Quiz";
import type { QuizAnswers } from "./types/quiz";

function App() {
  const [step, setStep] = useState<'registration' | 'quiz' | 'results' | 'no-match'>('registration');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [, setQuizAnswers] = useState<QuizAnswers>({});

    const handleRegistration = (data: UserData) => {
    setUserData(data);
    setStep('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    // console.log('Quiz Answers:', answers);
    // console.log('User Data:', userData);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-rose-100">
      {step === 'registration' && (
        <UserRegistration onComplete={handleRegistration} />
      )}
      {step === 'quiz' && userData && (
        <Quiz userData={userData} onComplete={handleQuizComplete} />
      )}
    </div>
  );
}

export default App;
