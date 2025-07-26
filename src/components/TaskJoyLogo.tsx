import React from 'react';

export const TaskJoyLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient id="logoCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'hsl(160, 70%, 25%)', opacity: 1}} />
                <stop offset="100%" style={{stopColor: 'hsl(160, 60%, 45%)', opacity: 0.8}} />
            </linearGradient>
        </defs>
        
        <circle cx="50" cy="50" r="45" fill="url(#logoCircleGradient)" />

        <path 
            d="M30 52 L45 67 L75 37" 
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="10" 
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="rotate(-5 50 50)"
        />
    </svg>
);
