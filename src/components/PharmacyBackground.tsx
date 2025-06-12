import React from 'react';

export const PharmacyBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated gradient orbs with responsive sizes */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] animate-blob rounded-full bg-blue-200/30 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />
      <div className="absolute right-0 top-0 h-[300px] w-[300px] animate-blob animation-delay-2000 rounded-full bg-purple-200/30 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 animate-blob animation-delay-4000 rounded-full bg-pink-200/30 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]" />
      
      {/* Responsive grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] md:bg-[size:24px_24px]" />
      
      {/* Enhanced glass overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[100px]" />
      
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-blue-500" />
        <div className="absolute right-1/4 top-1/3 h-2 w-2 rounded-full bg-purple-500" />
        <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-pink-500" />
        <div className="absolute bottom-1/3 right-1/3 h-2 w-2 rounded-full bg-blue-500" />
      </div>
    </div>
  );
}; 