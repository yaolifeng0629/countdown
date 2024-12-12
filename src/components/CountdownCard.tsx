import { motion } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { Holiday } from '@/data/holidays';
import * as HoverCard from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';

interface CountdownCardProps {
  holiday: Holiday;
}

const getTypeStyles = (type: Holiday['type']) => {
  switch (type) {
    case 'holiday':
      return 'border-2 border-red-500/20';
    case 'today':
      return 'border-2 border-purple-500/20';
    case 'custom':
      return 'border-2 border-blue-500/20';
    default:
      return 'border-2 border-gray-500/20';
  }
};

export function CountdownCard({ holiday }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const days = differenceInDays(holiday.date, now);
      const hours = differenceInHours(holiday.date, now) % 24;
      const minutes = differenceInMinutes(holiday.date, now) % 60;
      const seconds = differenceInSeconds(holiday.date, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [holiday.date]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <div
            className={cn(
              'rounded-xl p-6 shadow-lg transition-all hover:scale-105 countdown-card',
              holiday.color,
              'bg-opacity-10 hover:bg-opacity-20',
              getTypeStyles(holiday.type),
              'bg-white/5 dark:bg-black/5'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.span 
                  className="text-4xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {holiday.icon}
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold">
                    {holiday.name}
                  </h3>
                  <p className="text-sm opacity-80">
                    {holiday.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              {holiday.repeat && (
                <span className="text-xs opacity-60">
                  {holiday.repeat === 'yearly' ? '每年' : '每周'}
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              <TimeUnit value={timeLeft.days} unit="天" />
              <TimeUnit value={timeLeft.hours} unit="时" />
              <TimeUnit value={timeLeft.minutes} unit="分" />
              <TimeUnit value={timeLeft.seconds} unit="秒" />
            </div>
          </div>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            className="w-64 rounded-lg bg-background p-4 shadow-lg"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{holiday.icon}</span>
                <h4 className="font-semibold">{holiday.name}</h4>
              </div>
              <p className="text-sm opacity-80">
                {holiday.description}
              </p>
            </div>
            <HoverCard.Arrow className="fill-background" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </motion.div>
  );
}

function TimeUnit({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col">
      <motion.span
        key={value}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-bold"
      >
        {value}
      </motion.span>
      <span className="text-sm opacity-80">{unit}</span>
    </div>
  );
}
