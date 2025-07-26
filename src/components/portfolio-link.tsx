
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioLink() {
  return (
    <a
      href="https://codewithabii.site" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 p-2 rounded-lg bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow"
    >
      <Image
        src="/profile.png" 
        alt="Portfolio"
        width={40}
        height={40}
        className="rounded-full"
        data-ai-hint="developer portrait"
      />
      <div className="text-sm font-medium pr-2">
        <p className="text-muted-foreground text-xs">Created by</p>
        <p className="font-semibold">Abdullah Julardzija</p> 
      </div>
    </a>
  );
}
