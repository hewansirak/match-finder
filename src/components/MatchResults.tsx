import React, { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  RotateCcw,
  Calendar,
  Star,
} from "lucide-react";
import type { QuizAnswers } from "../types/quiz";
import type { UserData } from "../types/user";
import { calculateAge, calculateZodiacSign } from "../utils/dateUtils";
import ProfileCard from "../components/ProfileCard";
import { dummyMatches } from "../data/dummyMatches";

interface Props {
  userData: UserData;
  quizAnswers: QuizAnswers;
  onReset: () => void;
}

const MatchResults: React.FC<Props> = ({ userData, quizAnswers, onReset }) => {
  const [showMatch, setShowMatch] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const [compatibilityScore] = useState(Math.floor(Math.random() * 20) + 80);
  const match = dummyMatches[Math.floor(Math.random() * dummyMatches.length)];

  // Calculate ages using the utility function
  const userAge = calculateAge(userData.dob);
  const matchAge = calculateAge(match.dob);
  const userZodiacSign = calculateZodiacSign(userData.dob)

  // Prepare user interests from quiz answers
  const userInterests = [
    quizAnswers.hobby || "Reading",
    quizAnswers.lifestyle || "Adventure", 
    quizAnswers.beverage || "Coffee"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMatch(true);
      setTimeout(() => setAnimateScore(true), 800);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!showMatch) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500">
        <div className="text-center text-white">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
            <div className="relative z-10 p-8 rounded-full bg-white/10 backdrop-blur-sm">
              <Heart className="w-16 h-16 mx-auto fill-current animate-pulse" />
            </div>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-white to-pink-200 bg-clip-text">
            Finding your perfect match...
          </h2>
          <div className="flex justify-center gap-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-red-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-white/5 animate-float"></div>
        <div className="absolute w-24 h-24 rounded-full top-40 right-20 bg-white/5 animate-float-delayed"></div>
        <div className="absolute w-40 h-40 rounded-full bottom-32 left-1/4 bg-white/5 animate-float"></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full opacity-75 bg-gradient-to-r from-yellow-400 to-pink-400 animate-pulse"></div>
            <div className="relative z-10 p-4 bg-white rounded-full">
              <Heart className="w-12 h-12 text-red-500 fill-current animate-heartbeat" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-black text-transparent bg-gradient-to-r from-white via-pink-200 to-yellow-200 bg-clip-text">
            It's a Match! ✨
          </h1>
          <p className="text-xl font-medium text-white/90">
            You've found someone special
          </p>
        </div>

        {/* Main Match Display */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
            {/* User Profile Card */}
            <ProfileCard
              name={userData.username}
              age={userAge}
              gender={userData.gender}
              image={match.image} // Using match image as placeholder for user
              interests={userInterests}
              zodiac={userZodiacSign} // Using match zodiac as placeholder
              isOnline={true}
            />

            {/* Connection Animation - Centered Heart */}
            <div className="flex items-center justify-center lg:flex-col lg:gap-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-500 animate-pulse blur-md"></div>
                <div className="relative z-10 flex items-center justify-center p-4 bg-white rounded-full shadow-xl">
                  <Heart className="w-10 h-10 text-red-500 fill-current animate-heartbeat" />
                </div>
              </div>
              
              {/* Connection Lines */}
              <div className="hidden w-12 h-1 rounded-full lg:block bg-gradient-to-r from-red-400 to-pink-500 animate-pulse"></div>
              <div className="w-1 h-12 rounded-full lg:hidden bg-gradient-to-b from-red-400 to-pink-500 animate-pulse"></div>
              <div className="hidden w-12 h-1 rounded-full lg:block bg-gradient-to-r from-red-400 to-pink-500 animate-pulse"></div>
              <div className="w-1 h-12 rounded-full lg:hidden bg-gradient-to-b from-red-400 to-pink-500 animate-pulse"></div>
            </div>

            {/* Match Profile Card */}
            <ProfileCard
              name={match.name}
              age={matchAge}
              image={match.image}
              interests={match.interests}
              zodiac={match.zodiac}
              isOnline={true}
            />
          </div>
        </div>

        {/* Compatibility Score Section */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 transition-opacity duration-300 opacity-75 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl group-hover:opacity-100"></div>
            <div className="relative p-8 border bg-white/20 backdrop-blur-md rounded-3xl border-white/30">
              <div className="text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  <span className="text-xl font-bold">Compatibility Score</span>
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                </div>

                <div className="relative mb-6">
                  <div
                    className={`text-6xl font-black transition-all duration-1000 ${
                      animateScore ? "scale-110" : "scale-75 opacity-0"
                    }`}
                  >
                    {compatibilityScore}%
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-32 h-32 border-4 border-yellow-300 rounded-full animate-spin-slow ${
                        animateScore ? "opacity-30" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(compatibilityScore / 20)
                          ? "text-yellow-300 fill-current"
                          : "text-white/30"
                      } transition-all duration-300`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <p className="font-medium text-white/90">
                  {compatibilityScore >= 90
                    ? "Perfect Match! 🔥"
                    : compatibilityScore >= 85
                    ? "Excellent Match! ✨"
                    : "Great Match! 💫"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto space-y-4">

          <button className="relative w-full overflow-hidden transition-all duration-300 transform border group rounded-2xl bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 hover:scale-105">
            <div className="flex items-center justify-center gap-3 px-8 py-5 text-white">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-bold">Plan a Date</span>
              <Heart className="w-5 h-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center w-full gap-3 px-8 py-4 transition-all duration-300 transform border group text-white/90 hover:text-white border-white/30 rounded-2xl hover:bg-white/10 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-semibold">Find Another Match</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
