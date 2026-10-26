'use client';
import { motion } from 'framer-motion';
import { CountdownCard } from '@/components/CountdownCard';
import { FeaturedCountdown } from '@/components/FeaturedCountdown';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getHolidays } from '@/data/holidays';
import { useStatutoryInfo } from '@/lib/statutory';
import { useMemo } from 'react';

export default function Home() {
    // 每年日期由农历/节气/规则实时计算，不再手工维护
    const holidays = useMemo(() => getHolidays(), []);
    const statutory = useStatutoryInfo(holidays);
    // 首屏海报聚焦最近的「真实节日」（今天结束/本月结束这类伪倒计时不上海报）
    const next = holidays.find(h => h.type === 'holiday') ?? holidays[0];
    const springFestival = holidays.find(h => h.id === 'spring-festival');

    return (
        <div className="relative z-0 flex min-h-screen flex-col">
            {/* 吸顶导航 */}
            <header className="sticky top-0 z-10 border-b border-warm bg-paper/85 backdrop-blur-md">
                <div className="mx-auto flex h-[60px] max-w-section items-center justify-between px-5">
                    <a href="/countdown" className="flex items-center gap-2.5">
                        <span className="seal h-7 w-7 font-kai text-base">福</span>
                        <span className="font-serif text-[17px] font-semibold tracking-[0.1em]">节日倒计时</span>
                    </a>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://yaolifeng.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden font-sans text-sm text-secondary transition-colors hover:text-cinnabar sm:block"
                        >
                            作者：姚利锋
                        </a>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* 年画海报式首屏：岁次印章 + 书法节日名 + 金箔倒计时 */}
                <FeaturedCountdown holiday={next} springFestival={springFestival} statutory={statutory[next.id]} />

                {/* 节日一览 */}
                <section className="mx-auto w-full max-w-section px-5 pb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 flex items-center gap-5"
                    >
                        <span className="h-px flex-1 bg-strong" aria-hidden />
                        <h2 className="flex items-center gap-3 font-serif text-xl font-semibold tracking-[0.3em]">
                            <span className="h-1.5 w-1.5 rotate-45 bg-cinnabar" aria-hidden />
                            节日一览
                            <span className="h-1.5 w-1.5 rotate-45 bg-cinnabar" aria-hidden />
                        </h2>
                        <span className="h-px flex-1 bg-strong" aria-hidden />
                    </motion.div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {holidays.map((holiday, i) => (
                            <CountdownCard
                                key={holiday.id}
                                holiday={holiday}
                                index={i}
                                isNext={holiday.id === next.id}
                                statutory={statutory[holiday.id]}
                            />
                        ))}
                    </div>
                </section>
            </main>

            {/* 深漆页脚 */}
            <footer className="bg-footer text-[#f2e6d5]">
                <div className="mx-auto flex max-w-section flex-col items-center justify-between gap-4 px-5 py-10 font-serif text-sm sm:flex-row">
                    <div className="flex items-center gap-2.5 font-semibold tracking-[0.1em]">
                        <span className="seal h-6 w-6 font-kai text-sm">福</span>
                        节日倒计时
                    </div>
                    <div className="flex items-center gap-5 text-[#b89b6e]">
                        <a href="https://yaolifeng.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-bright">
                            作者主页
                        </a>
                        <a
                            href="https://yaolifeng.com/sponsor.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-gold-bright"
                        >
                            请作者喝咖啡
                        </a>
                        <a
                            href="https://github.com/yaolifeng0629/countdown"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-gold-bright"
                        >
                            GitHub
                        </a>
                    </div>
                    <p className="text-[#8a6f52]">© {new Date().getFullYear()} Immerse · 农历精确计算 · 假期同步官方公告</p>
                </div>
            </footer>
        </div>
    );
}
