import React from 'react';
import { useState } from "react";
import { Heart, Sparkles, User, Calendar, Users, FileText } from "lucide-react";
import type { UserData } from "../types/user";
import { supabase } from '../lib/supabaseClient';

interface Props {
  onComplete: (data: UserData) => void;
}

const UserRegistration: React.FC<Props> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    gender: "",
    avatar: "",
    bio: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Emoji options for avatar selection
  const emojiOptions = [
    "☀️", "🦄", "🎭", "🚀", "🎨",
    "🌈", "⭐", "🎪", "🎯", "💧"
  ];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.username && formData.dob && formData.gender) {
    // Save to Supabase directly + RETURN new row
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username: formData.username,
          dob: new Date(formData.dob).toISOString(),
          gender: formData.gender,
          avatar: formData.avatar || null,
          bio: formData.bio || null,
        },
      ])
      .select()
      .single(); 

    if (error) {
      console.error('Error saving to Supabase:', error);
    } else {
      console.log('Saved!', data);
      onComplete({
        id: data.id, 
        username: formData.username,
        dob: new Date(formData.dob),
        gender: formData.gender,
        avatar: formData.avatar || undefined,
        bio: formData.bio || undefined,
      });
    }
  }
};

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleEmojiSelect = (emoji: string) => {
    setFormData({ ...formData, avatar: emoji });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 opacity-60"></div>

      <div className="relative z-10 animated-card bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-lg transform transition-all duration-500">
        <div className="relative mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative heartbeat">
              <Heart data-testid="lucide-heart" className="w-12 h-12 text-red-500 fill-current drop-shadow-lg" />
              <div className="absolute inset-0 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold tracking-tight gradient-text">
            Find Your Match
          </h1>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
            Let's start your love journey!
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          </p>

          {/* Decorative line */}
          <div className="flex justify-center mt-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Date of Birth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="relative group">
              <label
                htmlFor="username"
                className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-pink-500" />
                Your Name
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  onFocus={() => handleFocus("username")}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-sm ${
                    focusedField === "username"
                      ? "border-pink-400 shadow-lg shadow-pink-200/50 transform scale-[1.01]"
                      : "border-pink-200 hover:border-pink-300"
                  }`}
                  placeholder="Enter your name ✨"
                  required
                />
              </div>
            </div>

            {/* Date of Birth Field */}
            <div className="relative group">
              <label htmlFor="dob" className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                Date of Birth
              </label>
              <div className="relative">
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  onFocus={() => handleFocus("dob")}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 text-sm ${
                    focusedField === "dob"
                      ? "border-pink-400 shadow-lg shadow-pink-200/50 transform scale-[1.01]"
                      : "border-pink-200 hover:border-pink-300"
                  }`}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Gender Field */}
          <div className="relative group">
            <label htmlFor="gender" className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-pink-500" />
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                onFocus={() => handleFocus("gender")}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 appearance-none cursor-pointer text-sm ${
                  focusedField === "gender"
                    ? "border-pink-400 shadow-lg shadow-pink-200/50 transform scale-[1.01]"
                    : "border-pink-200 hover:border-pink-300"
                }`}
                required
              >
                <option value="" className="text-gray-400">
                  Select your gender 💫
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Avatar Emoji Selection */}
          <div className="relative group">
            <label htmlFor="avatar" className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Choose Your Avatar{" "}
              <span className="text-gray-400">(optional)</span>
            </label>
            <div className="grid grid-cols-5 gap-3 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
              {emojiOptions.map((emoji, index) => (
                <button
                  id="avatar"
                  key={index}
                  type="button"
                  data-testid="avatar-emoji"
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`cursor-pointer w-12 h-12 text-2xl rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                    formData.avatar === emoji
                      ? "bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg scale-110 border-2 border-white"
                      : "bg-white/80 hover:bg-white shadow-md hover:shadow-pink-200/50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Bio Field */}
          <div className="relative group">
            <label htmlFor="bio" className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-pink-500" />
              About You <span className="text-gray-400">(optional)</span>
            </label>
            <div className="relative">
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                onFocus={() => handleFocus("bio")}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-sm resize-none ${
                  focusedField === "bio"
                    ? "border-pink-400 shadow-lg shadow-pink-200/50 transform scale-[1.01]"
                    : "border-pink-200 hover:border-pink-300"
                }`}
                placeholder="Tell us about yourself... 💭"
                rows={3}
                maxLength={200}
              />
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {formData.bio.length}/200
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold py-3.5 px-6 rounded-xl hover:from-pink-600 hover:via-rose-600 hover:to-red-600 transform hover:scale-105 hover:shadow-xl hover:shadow-pink-300/40 transition-all duration-300 shadow-lg relative overflow-hidden group mt-6"
          >
            <span className="relative z-10 text-base tracking-wide">
              Find My Match! 💕
            </span>
            {/* Button shine effect */}
            <div className="absolute inset-0 transition-transform duration-1000 transform -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full"></div>
          </button>
        </form>

        {/* Bottom decorative text */}
        <div className="mt-4 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <Heart data-testid="lucide-heart" className="w-2.5 h-2.5 text-pink-400 fill-current" />
            Inspired by Mister Samuel Balcha
            <Heart data-testid="lucide-heart" className="w-2.5 h-2.5 text-pink-400 fill-current" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
