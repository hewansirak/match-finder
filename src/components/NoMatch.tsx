import React, { useEffect } from 'react';
import { RotateCcw, ExternalLink } from 'lucide-react';

interface Props {
  onReset: () => void;
}

const NoMatch: React.FC<Props> = ({ onReset }) => {
  useEffect(() => {
    // Auto-redirect to Akon's Lonely song
    const timer = setTimeout(() => {
      window.open('https://youtu.be/6EEW-9NDM5k?si=ojJV7mCX6hopqXE2&t=35', '_blank'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-800 to-black">
      <div className="text-center text-white max-w-md">
        <div className="text-8xl mb-6">💔</div>
        <h1 className="text-4xl font-bold mb-4">No Match Found</h1>
        <p className="text-gray-300 mb-8">
          Don't worry, love comes when you least expect it...
        </p>

        <div className="space-y-4">
          <a
            href="https://youtu.be/6EEW-9NDM5k?si=ojJV7mCX6hopqXE2&t=35" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Listen to Akon - Lonely
          </a>

          <button
            onClick={onReset}
            className="w-full bg-white text-gray-800 font-bold py-4 px-6 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Redirecting to Akon in 3 seconds...
        </p>
      </div>
    </div>
  );
};

export default NoMatch;