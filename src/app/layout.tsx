import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import PortfolioLink from '@/components/portfolio-link';

export const metadata: Metadata = {
  title: 'TaskJoy',
  description: 'A Simple Task Manager with Gamification',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          {children}
          <Toaster />
          <PortfolioLink />
      </body>
    </html>
  );
}
