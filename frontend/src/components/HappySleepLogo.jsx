import React from 'react';

export default function HappySleepLogo({ className = "w-12 h-12" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Pillow Frame */}
      <path 
        d="M 40 50 
           Q 100 62 160 50 
           Q 175 50 170 70
           Q 160 100 170 130
           Q 175 150 160 150
           Q 100 138 40 150
           Q 25 150 30 130
           Q 40 100 30 70
           Q 25 50 40 50 Z" 
        stroke="#6B9AC4" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Eyes */}
      <circle cx="95" cy="88" r="8" fill="#6B9AC4" />
      <circle cx="130" cy="84" r="8" fill="#6B9AC4" />

      {/* Loop & Smiling Tail Line */}
      <path 
        d="M 52 114 
           C 65 110, 75 92, 65 82
           C 55 72, 45 95, 70 105
           C 95 115, 125 115, 155 88" 
        stroke="#6B9AC4" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Subtle Right Pinch Accent */}
      <path 
        d="M 155 110 L 155 125" 
        stroke="#6B9AC4" 
        strokeWidth="11" 
        strokeLinecap="round"
      />
    </svg>
  );
}