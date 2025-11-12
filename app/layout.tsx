import type { Metadata } from 'next';
import { Toaster } from './components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Angler - AI 피싱 문자 탐지',
  description: 'AI 기반 피싱 문자 탐지 서비스. Don\'t get hooked.',
  keywords: ['피싱', '스미싱', 'AI', '보안', '문자 탐지'],
  authors: [{ name: 'Angler Team' }],
  openGraph: {
    title: 'Angler - AI 피싱 문자 탐지',
    description: 'AI 기반 피싱 문자 탐지 서비스',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
