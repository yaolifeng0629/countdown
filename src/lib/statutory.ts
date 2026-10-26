import { useEffect, useState } from 'react';

/**
 * 法定节假日安排数据源：holiday-cn
 * https://github.com/NateScarlet/holiday-cn
 * 数据每日自动解析自国务院办公厅发布的官方放假安排公告（响应中的 papers
 * 字段即 gov.cn 原文链接），免费、无需 key、支持浏览器跨域调用。
 * 拉取失败时静默降级——节日倒计时全部由本地农历/规则计算，不受影响。
 */

export interface StatutoryInfo {
    /** 连续放假天数 */
    daysOff: number;
    /** 放假区间标签，如 "2.15 – 2.23" */
    range: string;
    /** 关联调休补班天数 */
    makeupDays: number;
}

interface HolidayCnDay {
    name: string;
    date: string; // YYYY-MM-DD
    isOffDay: boolean;
}

interface HolidayCnYear {
    days: HolidayCnDay[];
}

/** 本站节日 id → 官方放假安排中的节日名 */
const STATUTORY_NAME_MAP: Record<string, string> = {
    'new-year': '元旦',
    'spring-festival': '春节',
    'chinese-new-year-eve': '春节',
    qingming: '清明节',
    'labor-day': '劳动节',
    'dragon-boat': '端午节',
    'mid-autumn': '中秋节',
    'national-day': '国庆节',
};

const CACHE_KEY = 'statutory-holidays-v3';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 天

/** 同一数据的两个镜像：jsDelivr CDN（国内可达性好）优先，GitHub Raw 兜底 */
const ENDPOINTS = [
    (year: number) => `https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/${year}.json`,
    (year: number) => `https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/${year}.json`,
];

function fmt(dateStr: string): string {
    const [, m, d] = dateStr.split('-');
    return `${Number(m)}.${Number(d)}`;
}

/** 从全年放假数据中，提取某节日的连续放假区间与调休信息 */
function extractInfo(days: HolidayCnDay[], officialName: string, targetDate: Date): StatutoryInfo | null {
    const related = days.filter(d => d.name === officialName);
    if (related.length === 0) return null;

    const offDays = related.filter(d => d.isOffDay).sort((a, b) => a.date.localeCompare(b.date));
    const makeupDays = related.filter(d => !d.isOffDay).length;

    // 找到包含目标日期（或最近的）连续放假段
    const targetStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(
        targetDate.getDate()
    ).padStart(2, '0')}`;

    // 按连续日期分段
    const ranges: HolidayCnDay[][] = [];
    for (const day of offDays) {
        const last = ranges[ranges.length - 1];
        const prev = last?.[last.length - 1];
        if (prev) {
            const prevTime = new Date(`${prev.date}T00:00:00`).getTime();
            const curTime = new Date(`${day.date}T00:00:00`).getTime();
            if (curTime - prevTime === 86400000) {
                last.push(day);
                continue;
            }
        }
        ranges.push([day]);
    }

    // 严格匹配：目标日期必须落在官方公布的放假区间内。
    // 次年放假安排通常尚未公布，此时不展示，避免把上一年的区间误标到明年的日期上。
    const hit = ranges.find(r => r.some(d => d.date === targetStr));

    if (!hit) return null;

    return {
        daysOff: hit.length,
        range: `${fmt(hit[0].date)} – ${fmt(hit[hit.length - 1].date)}`,
        makeupDays,
    };
}

type StatutoryMap = Record<string, StatutoryInfo>;

async function fetchYear(year: number): Promise<HolidayCnDay[]> {
    let lastError: unknown;
    for (const url of ENDPOINTS.map(e => e(year))) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: HolidayCnYear = await res.json();
            return data.days ?? [];
        } catch (e) {
            lastError = e;
        }
    }
    throw lastError;
}

/**
 * 拉取当年与次年的官方放假安排，映射成本站节日 id → 放假信息。
 * 带 localStorage 缓存（7 天），任何失败都返回空表静默降级。
 */
export async function fetchStatutoryInfo(
    holidays: { id: string; date: Date }[]
): Promise<StatutoryMap> {
    try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            const cached = JSON.parse(cachedRaw) as { time: number; map: StatutoryMap };
            if (Date.now() - cached.time < CACHE_TTL) return cached.map;
        }

        const year = new Date().getFullYear();
        const [current, next] = await Promise.all([
            fetchYear(year),
            fetchYear(year + 1).catch(() => [] as HolidayCnDay[]),
        ]);
        const allDays = [...current, ...next];

        const map: StatutoryMap = {};
        for (const h of holidays) {
            const officialName = STATUTORY_NAME_MAP[h.id];
            if (!officialName) continue;
            const info = extractInfo(allDays, officialName, h.date);
            if (info) map[h.id] = info;
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), map }));
        return map;
    } catch {
        return {};
    }
}

/** React hook：组件挂载后异步获取法定放假安排 */
export function useStatutoryInfo(holidays: { id: string; date: Date }[]): StatutoryMap {
    const [map, setMap] = useState<StatutoryMap>({});

    useEffect(() => {
        let cancelled = false;
        fetchStatutoryInfo(holidays).then(m => {
            if (!cancelled) setMap(m);
        });
        return () => {
            cancelled = true;
        };
        // holidays 在首帧确定后不再变化，仅在挂载时拉取一次
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return map;
}
