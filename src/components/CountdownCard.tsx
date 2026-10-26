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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min((index % 4) * 0.06, 0.3) }}
            className="w-full"
        >
            <HoverCard.Root openDelay={200}>
                <HoverCard.Trigger asChild>
                    <div
                        className={cn(
                            'countdown-card relative w-full cursor-default rounded-xl border border-warm bg-surface p-5',
                            isNext && 'border-cinnabar'
                        )}
                    >
                        {isNext && (
                            <span className="seal absolute -right-2 -top-3 px-2 py-1 font-kai text-sm leading-none">
                                最近
                            </span>
                        )}
                        <div className="flex items-center gap-3">
                            <span
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[22px]"
                                style={{ backgroundColor: `${holiday.accent}1f` }}
                            >
                                {holiday.icon}
                            </span>
                            <div className="min-w-0">
                                <h3 className="truncate font-serif text-[17px] font-semibold leading-5">{holiday.name}</h3>
                                <p className="mt-1 font-sans text-[13px] leading-4 text-secondary">
                                    {holiday.date.toLocaleDateString('zh-CN', {
                                        month: 'long',
                                        day: 'numeric',
                                        weekday: 'short',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-4 gap-1.5 text-center">
                            <TimeUnit value={timeLeft.days} unit="天" highlight={isNext} />
                            <TimeUnit value={timeLeft.hours} unit="时" />
                            <TimeUnit value={timeLeft.minutes} unit="分" />
                            <TimeUnit value={timeLeft.seconds} unit="秒" />
                        </div>

                        {statutory && (
                            <div className="badge-gold mt-4 flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 font-serif text-xs">
                                <span>
                                    法定放假 {statutory.daysOff} 天 · {statutory.range}
                                </span>
                                {statutory.makeupDays > 0 && <span className="opacity-70">调休 {statutory.makeupDays} 天</span>}
                            </div>
                        )}
                    </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content
                        className="z-50 w-64 rounded-xl border border-warm bg-surface p-4 shadow-lg"
                        sideOffset={6}
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{holiday.icon}</span>
                                <h4 className="font-serif font-semibold">{holiday.name}</h4>
                            </div>
                            <p className="font-sans text-sm text-secondary">{holiday.description}</p>
                            {holiday.repeat === 'yearly' && (
                                <p className="font-sans text-xs text-secondary/70">每年自动更新日期</p>
                            )}
                        </div>
                        <HoverCard.Arrow className="fill-surface" />
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </motion.div>
    );
}

function TimeUnit({ value, unit, highlight }: { value: number; unit: string; highlight?: boolean }) {
    return (
        <div className={cn('flex flex-col items-center rounded-lg py-2', highlight ? 'accent-wash' : 'bg-surface-warm')}>
            <span className="tabular-nums font-mono text-xl font-bold leading-6">{String(value).padStart(2, '0')}</span>
            <span className="mt-0.5 font-sans text-[11px] leading-3 text-secondary">{unit}</span>
        </div>
    );
}
