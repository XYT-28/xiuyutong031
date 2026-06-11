import type { Metadata } from 'next';
import './globals.css';
import { FontPreload } from '@/components/font-preload';

export const metadata: Metadata = {
  title: '修宇峒 | 数据科学 & 全栈开发',
  description: '修宇峒的个人主页 — 数据科学与大数据技术专业，热爱编程与数据可视化',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <FontPreload />
      <body className="antialiased">{children}</body>
    </html>
  );
}
