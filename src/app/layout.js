import { Geist, Geist_Mono } from 'next/font/google';

import Navbar from '../components/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'just-do',
  description: 'A simple productivity app',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            
             try {
              const savedTheme = localStorage.getItem('theme');
              const dark = savedTheme
                ? savedTheme === 'dark'
                : window.matchMedia('(prefers-color-scheme: dark)').matches;
              document.documentElement.classList.toggle('dark', dark);
            } catch (e) {}
            
            
            `,
          }}
        ></script>
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
