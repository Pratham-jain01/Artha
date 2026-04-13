import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Artha | AI Translator & Dictionary',
  description: 'A premium translation and dictionary app powered by LLM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#0a0a0a] text-white antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
