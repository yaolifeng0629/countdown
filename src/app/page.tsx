'use client';
import { motion } from 'framer-motion';
import { CountdownCard } from '@/components/CountdownCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getHolidays } from '@/data/holidays';
import { useStatutoryInfo } from '@/lib/statutory';
import { useMemo } from 'react';

const HERO_BADGES = ['35+ 节日收录', '农历自动换算', '法定假期同步'];

export default function Home() {
    // 每年日期由农历/节气/规则实时计算，不再手工维护
    const holidays = useMemo(() => getHolidays(), []);
    const statutory = useStatutoryInfo(holidays);
    const nextId = holidays[0]?.id;

    return (
        <div className="flex min-h-screen flex-col">
            {/* 吸顶导航：60px 高，底部 1px 细线 */}
            <header className="sticky top-0 z-10 border-b border-subtle bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-[60px] max-w-section items-center justify-between px-5">
                    <a href="/countdown" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
                        <span className="text-lg">⏳</span>
                        节日倒计时
                    </a>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://yaolifeng.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden text-sm text-secondary transition-colors hover:text-foreground sm:block"
                        >
                            作者：姚利锋
                        </a>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-section flex-1 px-5">
                {/* Hero：居中大标题，后半句以透明黑减弱 */}
                <section className="py-16 text-center md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-[640px]"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface px-3 py-1.5 text-[13px] font-medium text-secondary shadow-[0_2px_6px_rgba(12,10,9,0.08)]">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--status-green)' }} />
                            日期每年自动更新，无需手动维护
                        </span>
                        <h1 className="mt-6 text-[32px] font-medium leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-[64px]">
                            每一个节日，
                            <br />
                            <span className="text-heading-muted">都值得认真倒数。</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-[480px] text-base leading-[1.4] tracking-[-0.2px] text-secondary md:mt-5">
                            春节、端午、中秋按农历精确计算，清明、冬至随节气推演，法定放假安排同步国务院办公厅公告。
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-2"
                    >
                        {HERO_BADGES.map(badge => (
                            <span
                                key={badge}
                                className="rounded-md border border-subtle bg-surface px-2.5 py-1 text-[13px] font-medium tracking-[-0.01em] text-secondary shadow-[0_2px_6px_rgba(12,10,9,0.08)]"
                            >
                                {badge}
                            </span>
                        ))}
                    </motion.div>
                </section>

                {/* 倒计时卡片网格 */}
                <section className="grid grid-cols-1 gap-[10px] pb-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {holidays.map((holiday, i) => (
                        <CountdownCard
                            key={holiday.id}
                            holiday={holiday}
                            index={i}
                            isNext={holiday.id === nextId}
                            statutory={statutory[holiday.id]}
                        />
                    ))}
                </section>
            </main>

            {/* 黑色页脚 */}
            <footer className="bg-footer text-white">
                <div className="mx-auto flex max-w-section flex-col items-center justify-between gap-4 px-5 py-10 text-sm sm:flex-row">
                    <div className="flex items-center gap-2 font-medium">
                        <span className="text-base">⏳</span>
                        节日倒计时
                    </div>
                    <div className="flex items-center gap-5 text-white/60">
                        <a href="https://yaolifeng.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                            作者主页
                        </a>
                        <a
                            href="https://yaolifeng.com/sponsor.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-white"
                        >
                            请作者喝咖啡
                        </a>
                        <a
                            href="https://github.com/yaolifeng0629/countdown"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-white"
                        >
                            GitHub
                        </a>
                    </div>
                    <p className="text-white/40">© {new Date().getFullYear()} Immerse</p>
                </div>
            </footer>
        </div>
    );
}
