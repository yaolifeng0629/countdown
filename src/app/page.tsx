'use client';

import { motion } from 'framer-motion';
import { CountdownCard } from '@/components/CountdownCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import holidays from '@/data/holidays';

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen p-4 pt-16">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-16">
        {holidays.map((holiday) => (
          <CountdownCard key={holiday.id} holiday={holiday} />
        ))}
      </div>
    </main>
  );
}
