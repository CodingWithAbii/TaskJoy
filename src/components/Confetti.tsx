'use client';
import React, { useEffect, useState, useMemo } from 'react';

const CONFETTI_COUNT = 150;
const COLORS = ["#46B3AC", "#C0FF33", "#F2C144", "#E67E22", "#E74C3C"];

interface ConfettiPiece {
  id: number;
  color: string;
  left: string;
  top: string;
  transform: string;
  animation: string;
}

export const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: CONFETTI_COUNT }).map((_, index) => ({
      id: index,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: `${Math.random() * 100}%`,
      top: `${-20 + Math.random() * -80}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
      animation: `fall ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards`
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
       <style>
        {`
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute w-2 h-4 rounded-sm"
          style={{
            backgroundColor: p.color,
            left: p.left,
            top: p.top,
            transform: p.transform,
            animation: p.animation,
          }}
        />
      ))}
    </div>
  );
};
