import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { questions } from '../data/questions';
import type { Props, QuizAnswers } from '../types/quiz';

const Quiz: React.FC<Props> = ({ userData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
      } else {
        onComplete(newAnswers);
      }
    }, 500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">      
      <div className="w-full max-w-lg p-8 border border-pink-200 shadow-2xl animated-card bg-white/90 backdrop-blur-sm rounded-3xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-600">
              Hi {userData.username}! 👋
            </h2>
            <span className="text-sm font-medium text-pink-600">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          
          <div className="w-full h-3 mb-6 bg-pink-100 rounded-full">
            <div 
              data-testid="progress-bar"
              className="h-3 transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-pink-500 to-red-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="mb-8 text-2xl font-bold text-center gradient-text">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`cursor-pointer w-full p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                  selectedOption === option.value
                    ? 'border-pink-500 bg-pink-50 transform scale-105'
                    : 'border-pink-200 bg-white/70 hover:border-pink-300 hover:bg-pink-25'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  selectedOption === option.value 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-pink-100 text-pink-600'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="flex-1 text-lg font-semibold text-left text-gray-800">
                  {option.label}
                </span>
                <ChevronRight className={`w-5 h-5 transition-colors ${
                  selectedOption === option.value 
                    ? 'text-pink-500' 
                    : 'text-gray-400'
                }`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;