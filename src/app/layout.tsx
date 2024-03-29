import { GlobalUserNameProvider } from '@/common/contexts/GlobalUserNameContext';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  // weight: 'variable', // default なので不要。バリアブルフォントでなければ必要
  // display: 'swap', // default なので不要
  // preload: true, // default なので不要
  // adjustFontFallback: true, // next/font/google で default なので不要
  // fallback: ['system-ui', 'arial'], // local font fallback なので不要
});

export const metadata: Metadata = {
  title: 'チャットページ - Nextjs, Firebase Authentication, Firebase Realtime Database',
  description:
    'Nextjs chat app using Firebase Authentication, Firebase Realtime Database. GitHub: https://github.com/kan-ichi/nextjs-firebase-chat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <GlobalUserNameProvider>{children}</GlobalUserNameProvider>
      </body>
    </html>
  );
}
