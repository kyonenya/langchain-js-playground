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
      <body className="min-h-screen bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl py-4 md:py-8 px-4">
          {props.children}
        </div>
      </body>
    </html>
  );
}
