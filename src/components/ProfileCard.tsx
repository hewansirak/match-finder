import React from "react";
import { Star, Sparkles, Camera, Heart } from "lucide-react";

interface ProfileCardProps {
  name: string;
  age: number;
  gender?: string;
  image: string;
  interests: string[];
  zodiac: string;
  isOnline?: boolean;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  age,
  gender,
  image,
  interests,
  zodiac,
  isOnline = true,
  className = "",
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
      
      {/* Main Card Container */}
      <div className="relative w-80 h-fit bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-pink-500/25">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

        {/* Floating Elements */}
        <div className="absolute top-6 right-6 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-12 right-12 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-20 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>

        {/* Profile Image Section */}
        <div className="relative pt-8 pb-4">
          <div className="relative mx-auto w-28 h-28 group/avatar">
            {/* Image Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-md opacity-50 group-hover/avatar:opacity-80 transition-opacity duration-300"></div>
            
            {/* Main Image */}
            <img
              src={image}
              alt={name}
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/30 shadow-xl transition-transform duration-500 group-hover/avatar:scale-110"
            />
            
            {/* Online Status with Pulse */}
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-6 h-6 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Camera Icon Overlay */}
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Verified Badge */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Verified
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 space-y-4">
          {/* Name and Age */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {name}
            </h3>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <span className="text-lg font-semibold">{age}</span>
              {gender && (
                <>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                  <span className="text-sm">{gender}</span>
                </>
              )}
            </div>
          </div>

          {/* Zodiac Sign */}
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
              <span className="font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {zodiac}
              </span>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <Heart className="w-4 h-4" />
              <span className="font-medium">Interests</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20 shadow-sm hover:bg-white/25 transition-colors duration-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
