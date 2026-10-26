import type { Metadata } from "next";
import { Noto_Serif_SC, Ma_Shan_Zheng, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

// Google 的 CJK 字体不支持 subset 参数，需关闭 preload（按 unicode-range 分片按需加载）
const serifSC = Noto_Serif_SC({ weight: ["400", "600", "700", "900"], variable: "--font-serif-sc", preload: false });
const kai = Ma_Shan_Zheng({ weight: "400", variable: "--font-kai", preload: false });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: '节日倒计时 | 中国传统节日倒计时工具',
  description:
    '一个简单易用的中国传统节日倒计时工具，帮助您追踪春节、元宵节、清明节等重要节日的倒计时。',
  keywords: [
    '节日倒计时',
    '中国传统节日',
    '春节',
    '元宵节',
    '清明节',
    '端午节',
    '中秋节',
    '倒计时工具',
    '节日提醒',
    '农历节日',
    '传统文化',
  ],
  metadataBase: new URL('https://yaolifeng.com'),
  alternates: {
    canonical: '/countdown',
  },
  openGraph: {
    title: '节日倒计时 | 中国传统节日倒计时工具',
    description:
      '一个简单易用的中国传统节日倒计时工具，帮助您追踪春节、元宵节、清明节等重要节日的倒计时。',
    url: 'https://yaolifeng.com/countdown',
    siteName: '节日倒计时',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Immerse_code',
    title: '节日倒计时 | 中国传统节日倒计时工具',
    description:
      '一个简单易用的中国传统节日倒计时工具，帮助您追踪春节、元宵节、清明节等重要节日的倒计时。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${serifSC.variable} ${kai.variable} ${geistMono.variable} font-serif`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
