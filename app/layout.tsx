import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MeetingBurn - Quanto essa reunião está custando?',
  description: 'Timer que mostra o custo real das suas reuniões em tempo real. Pare de desperdiçar dinheiro com calls desnecessárias.',
  keywords: ['reunião', 'meeting', 'custo', 'timer', 'produtividade', 'teams', 'zoom', 'meet'],
  authors: [{ name: 'Clara' }],
  openGraph: {
    title: 'MeetingBurn - Quanto essa reunião está custando?',
    description: 'Timer que mostra o custo real das suas reuniões em tempo real.',
    url: 'https://meetingburn.vercel.app',
    siteName: 'MeetingBurn',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeetingBurn',
    description: 'Quanto essa reunião está custando?',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
