'use client';

import { motion } from 'framer-motion';
import { CountdownCard } from '@/components/CountdownCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';
import holidays from '@/data/holidays';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="container mx-auto min-h-screen p-4 pt-16">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
      {isLoading && <LoadingSpinner />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-center text-4xl font-bold">
          节日倒计时
          <span className="ml-2">⏰</span>
        </h1>
      </motion.div>

      {/* Author Info and Sponsor Button */}
      <div className="mb-8 flex flex-row items-center justify-center gap-6">
        <a href="https://yaolifeng.com" target="_blank" rel="noopener noreferrer"
          className="cursor-pointer transition-all hover:scale-105 border-b border-dashed border-gray-400 hover:border-gray-900 dark:hover:border-gray-200"
          title="点击访问个人网站">
          作者：姚利锋(Immerse)
        </a>
        <a
          href="https://yaolifeng.com/sponsor.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-md bg-[#dc2626] px-4 py-1.5 text-white hover:opacity-90 transition-all hover:scale-105 cursor-pointer"
        >
          赞赏站长
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
        {holidays.map((holiday) => (
          <CountdownCard key={holiday.id} holiday={holiday} />
        ))}
      </div>

    </main>
  );
}
