import { motion } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { Holiday } from '@/data/holidays';
import { StatutoryInfo } from '@/lib/statutory';
import * as HoverCard from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';

interface CountdownCardProps {
    holiday: Holiday;
    index: number;
    /** 是否为最近的一个节日 */
    isNext?: boolean;
    /** 官方放假安排（拉取失败则为 undefined，不渲染） */
    statutory?: StatutoryInfo;
}

export function CountdownCard({ holiday, index, isNext, statutory }: CountdownCardProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTimeLeft({
                days: Math.max(0, differenceInDays(holiday.date, now)),
                hours: Math.max(0, differenceInHours(holiday.date, now) % 24),
                minutes: Math.max(0, differenceInMinutes(holiday.date, now) % 60),
                seconds: Math.max(0, differenceInSeconds(holiday.date, now) % 60),
            });
        };
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [holiday.date]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.6) }}
            className="w-full"
        >
            <HoverCard.Root openDelay={200}>
                <HoverCard.Trigger asChild>
                    <div
                        className={cn(
                            'countdown-card w-full cursor-default rounded-xl border border-subtle bg-surface p-5',
                            isNext && 'border-foreground/25 ring-1 ring-foreground/10'
                        )}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <span
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl"
                                    style={{ backgroundColor: `${holiday.accent}1f` }}
                                >
                                    {holiday.icon}
                                </span>
                                <div className="min-w-0">
                                    <h3 className="truncate text-[15px] font-semibold leading-5">{holiday.name}</h3>
                                    <p className="mt-0.5 text-[13px] leading-4 text-secondary">
                                        {holiday.date.toLocaleDateString('zh-CN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'short',
                                        })}
                                    </p>
                                </div>
                            </div>
                            {isNext && (
                                <span className="shrink-0 rounded-full bg-foreground px-2 py-0.5 text-[11px] font-medium text-background">
                                    最近
                                </span>
                            )}
                        </div>

                        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                            <TimeUnit value={timeLeft.days} unit="天" />
                            <TimeUnit value={timeLeft.hours} unit="时" />
                            <TimeUnit value={timeLeft.minutes} unit="分" />
                            <TimeUnit value={timeLeft.seconds} unit="秒" />
                        </div>

                        {statutory && (
                            <div className="mt-4 flex items-center gap-1.5 border-t border-subtle pt-3 text-xs text-secondary">
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--status-green)' }} />
                                <span>
                                    法定放假 {statutory.daysOff} 天 · {statutory.range}
                                </span>
                                {statutory.makeupDays > 0 && <span className="opacity-70">（调休 {statutory.makeupDays} 天）</span>}
                            </div>
                        )}
                    </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content
                        className="z-50 w-64 rounded-xl border border-subtle bg-surface p-4 shadow-lg"
                        sideOffset={6}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{holiday.icon}</span>
                                <h4 className="font-semibold">{holiday.name}</h4>
                            </div>
                            <p className="text-sm text-secondary">{holiday.description}</p>
                            {holiday.repeat === 'yearly' && (
                                <p className="text-xs text-secondary/70">每年自动更新日期</p>
                            )}
                        </div>
                        <HoverCard.Arrow className="fill-surface" />
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </motion.div>
    );
}

function TimeUnit({ value, unit }: { value: number; unit: string }) {
    return (
        <div className="flex flex-col items-center rounded-lg bg-surface-muted py-2">
            <span className="tabular-nums font-mono text-xl font-semibold leading-6">{String(value).padStart(2, '0')}</span>
            <span className="mt-0.5 text-[11px] leading-3 text-secondary">{unit}</span>
        </div>
    );
}
