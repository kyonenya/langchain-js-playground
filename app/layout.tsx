import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'langchain-next-playground',
  description: 'PDFを読み込んだAIが質問に答えます',
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-700  dark:bg-gray-800 dark:text-gray-300">
        {props.children}
      </body>
    </html>
  );
}
