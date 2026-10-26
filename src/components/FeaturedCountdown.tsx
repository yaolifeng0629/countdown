'use client';
import { motion } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { Lunar } from 'lunar-javascript';
import { Holiday } from '@/data/holidays';
import { StatutoryInfo } from '@/lib/statutory';

interface FeaturedCountdownProps {
    holiday: Holiday;
    /** 下一个春节，用于推算岁次干支与生肖 */
    springFestival?: Holiday;
    statutory?: StatutoryInfo;
}

/** Hero 飘落的花瓣/金屑，纯 CSS 动画，仅作氛围点缀 */
const PETALS = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 71) % 100}%`,
    delay: `${(i * 1.9) % 14}s`,
    duration: `${10 + (i % 5) * 3}s`,
    size: 5 + (i % 3) * 3,
    opacity: 0.12 + (i % 4) * 0.06,
}));

export function FeaturedCountdown({ holiday, springFestival, statutory }: FeaturedCountdownProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // 岁次干支 / 生肖：从下一个春节的农历日期推算（如「丁未 · 羊年」）
    const ganzhi = useMemo(() => {
        if (!springFestival) return null;
        const lunar = Lunar.fromDate(springFestival.date);
        return { year: lunar.getYearInGanZhi(), zodiac: lunar.getYearShengXiao() };
    }, [springFestival]);

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

    const units: { value: number; label: string }[] = [
        { value: timeLeft.days, label: '天' },
        { value: timeLeft.hours, label: '时' },
        { value: timeLeft.minutes, label: '分' },
        { value: timeLeft.seconds, label: '秒' },
    ];

    return (
        <section className="relative overflow-hidden">
            {/* 飘落金屑 */}
            <div className="absolute inset-0" aria-hidden>
                {PETALS.map((p, i) => (
                    <span
                        key={i}
                        className="petal"
                        style={{
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            ['--petal-opacity' as string]: p.opacity,
                        }}
                    />
                ))}
            </div>

            {/* 两侧竖排春联，仅桌面端可见 */}
            <span
                aria-hidden
                className="couplet-text pointer-events-none absolute left-10 top-1/2 hidden -translate-y-1/2 select-none font-kai text-3xl xl:block"
                style={{ writingMode: 'vertical-rl', letterSpacing: '0.45em' }}
            >
                爆竹声中一岁除
            </span>
            <span
                aria-hidden
                className="couplet-text pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 select-none font-kai text-3xl xl:block"
                style={{ writingMode: 'vertical-rl', letterSpacing: '0.45em' }}
            >
                春风送暖入屠苏
            </span>

            <div className="relative mx-auto max-w-[760px] px-5 pb-20 pt-16 text-center md:pb-28 md:pt-24">
                {ganzhi && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3"
                    >
                        <span className="seal h-9 w-9 font-kai text-xl">福</span>
                        <span className="rounded-full border border-strong px-4 py-1.5 font-serif text-sm tracking-[0.2em] text-secondary">
                            岁次{ganzhi.year} · {ganzhi.zodiac}年将至
                        </span>
                    </motion.div>
                )}

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-10 font-serif text-sm tracking-[0.5em] text-secondary"
                >
                    距 下 一 个 节 日
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-4 font-kai text-7xl leading-none text-cinnabar md:text-8xl"
                >
                    {holiday.name}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-5 font-serif text-base text-secondary"
                >
                    {holiday.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                    <span className="mx-2 text-gold">·</span>
                    {holiday.description}
                </motion.p>

                {/* 金箔大数字倒计时 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 flex items-start justify-center"
                >
                    {units.map((u, i) => (
                        <div key={u.label} className="flex items-start">
                            {i > 0 && (
                                <span className="mx-3 mt-3 h-10 w-px bg-strong md:mx-6 md:mt-4 md:h-14" aria-hidden />
                            )}
                            <div className="flex flex-col items-center">
                                <span className="text-gold-foil tabular-nums font-mono text-5xl font-bold leading-none md:text-7xl">
                                    {String(u.value).padStart(2, '0')}
                                </span>
                                <span className="mt-3 font-serif text-sm tracking-[0.3em] text-secondary">{u.label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {statutory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="badge-gold mt-10 inline-flex items-center gap-2 rounded-full px-5 py-2 font-serif text-sm"
                    >
                        法定放假 {statutory.daysOff} 天 · {statutory.range}
                        {statutory.makeupDays > 0 && <span className="opacity-70">（调休 {statutory.makeupDays} 天）</span>}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
