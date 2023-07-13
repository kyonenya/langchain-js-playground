import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'langchain-next-playground',
  description: 'PDFを読み込んで質問に答える',
};

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white dark:bg-gray-800">
        <div className="container mx-auto">{props.children}</div>
      </body>
    </html>
  );
}
