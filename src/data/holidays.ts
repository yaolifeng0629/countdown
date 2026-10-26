import { endOfMonth, endOfQuarter } from 'date-fns';
import { Lunar, Solar } from 'lunar-javascript';

export interface Holiday {
    id: string;
    name: string;
    date: Date;
    icon: string;
    description: string;
    /** 图标底色的点缀色（hex），不再整卡铺色 */
    accent: string;
    type: 'holiday' | 'custom' | 'today';
    repeat?: 'yearly' | 'none';
}

type FestivalRule =
    | { kind: 'solar'; month: number; day: number } // 公历固定日期，month 为 1-12
    | { kind: 'lunar'; month: number; day: number } // 农历固定日期
    | { kind: 'lunar-eve' } // 除夕：次年农历正月初一前一天
    | { kind: 'jieqi'; term: string; month: number } // 节气（清明/夏至/冬至…），month 为所在公历月份
    | { kind: 'nth-weekday'; month: number; weekday: number; nth: number }; // 第 nth 个星期 weekday（weekday: 0=周日）

interface FestivalDef {
    id: string;
    name: string;
    icon: string;
    description: string;
    accent: string;
    rule: FestivalRule;
}

// ---------------------------------------------------------------------------
// 节日定义：只描述规则，不硬编码任何年份日期
// ---------------------------------------------------------------------------

const FESTIVALS: FestivalDef[] = [
    { id: 'new-year', name: '元旦', icon: '🎉', description: '新年快乐！', accent: '#EF4444', rule: { kind: 'solar', month: 1, day: 1 } },
    { id: 'chinese-new-year-eve', name: '除夕', icon: '🧨', description: '阖家团圆夜', accent: '#DC2626', rule: { kind: 'lunar-eve' } },
    { id: 'spring-festival', name: '春节', icon: '🏮', description: '农历新年', accent: '#DC2626', rule: { kind: 'lunar', month: 1, day: 1 } },
    { id: 'lantern-festival', name: '元宵节', icon: '🏮', description: '正月十五闹元宵', accent: '#F87171', rule: { kind: 'lunar', month: 1, day: 15 } },
    { id: 'valentines-day', name: '情人节', icon: '💝', description: '浪漫情人节', accent: '#EC4899', rule: { kind: 'solar', month: 2, day: 14 } },
    { id: 'womens-day', name: '妇女节', icon: '👩', description: '致敬杰出女性', accent: '#A855F7', rule: { kind: 'solar', month: 3, day: 8 } },
    { id: 'arbor-day', name: '植树节', icon: '🌳', description: '绿化祖国', accent: '#16A34A', rule: { kind: 'solar', month: 3, day: 12 } },
    { id: 'april-fools', name: '愚人节', icon: '🃏', description: '开个玩笑', accent: '#FACC15', rule: { kind: 'solar', month: 4, day: 1 } },
    { id: 'qingming', name: '清明节', icon: '🌱', description: '缅怀先人', accent: '#22C55E', rule: { kind: 'jieqi', term: '清明', month: 4 } },
    { id: 'labor-day', name: '劳动节', icon: '👷', description: '劳动最光荣', accent: '#3B82F6', rule: { kind: 'solar', month: 5, day: 1 } },
    { id: 'youth-day', name: '青年节', icon: '🌟', description: '五四青年节', accent: '#60A5FA', rule: { kind: 'solar', month: 5, day: 4 } },
    { id: 'mothers-day', name: '母亲节', icon: '👩‍👦', description: '感恩母亲', accent: '#F472B6', rule: { kind: 'nth-weekday', month: 5, weekday: 0, nth: 2 } },
    { id: 'children-day', name: '儿童节', icon: '🎠', description: '六一儿童节', accent: '#FDE047', rule: { kind: 'solar', month: 6, day: 1 } },
    { id: 'dragon-boat', name: '端午节', icon: '🚣', description: '赛龙舟，吃粽子', accent: '#10B981', rule: { kind: 'lunar', month: 5, day: 5 } },
    { id: 'fathers-day', name: '父亲节', icon: '👨‍👦', description: '感恩父亲', accent: '#2563EB', rule: { kind: 'nth-weekday', month: 6, weekday: 0, nth: 3 } },
    { id: 'summer-solstice', name: '夏至', icon: '☀️', description: '一年中最长的白天', accent: '#EAB308', rule: { kind: 'jieqi', term: '夏至', month: 6 } },
    { id: 'party-day', name: '建党节', icon: '🎗️', description: '中国共产党诞生纪念日', accent: '#DC2626', rule: { kind: 'solar', month: 7, day: 1 } },
    { id: 'army-day', name: '建军节', icon: '⭐', description: '人民军队生日', accent: '#15803D', rule: { kind: 'solar', month: 8, day: 1 } },
    { id: 'qixi-festival', name: '七夕节', icon: '🌌', description: '中国情人节', accent: '#C084FC', rule: { kind: 'lunar', month: 7, day: 7 } },
    { id: 'ghost-festival', name: '中元节', icon: '🏮', description: '慎终追远', accent: '#4B5563', rule: { kind: 'lunar', month: 7, day: 15 } },
    { id: 'victory-day', name: '抗战胜利日', icon: '✌️', description: '铭记历史', accent: '#1D4ED8', rule: { kind: 'solar', month: 9, day: 3 } },
    { id: 'teachers-day', name: '教师节', icon: '📚', description: '尊师重教', accent: '#3B82F6', rule: { kind: 'solar', month: 9, day: 10 } },
    { id: 'mid-autumn', name: '中秋节', icon: '🌕', description: '月圆人团圆', accent: '#EAB308', rule: { kind: 'lunar', month: 8, day: 15 } },
    { id: 'national-day', name: '国庆节', icon: '🇨🇳', description: '祖国生日快乐', accent: '#EF4444', rule: { kind: 'solar', month: 10, day: 1 } },
    { id: 'double-ninth', name: '重阳节', icon: '🍂', description: '敬老节', accent: '#CA8A04', rule: { kind: 'lunar', month: 9, day: 9 } },
    { id: 'hanyi-festival', name: '寒衣节', icon: '👘', description: '十月初一送寒衣', accent: '#93C5FD', rule: { kind: 'lunar', month: 10, day: 1 } },
    { id: 'halloween', name: '万圣节', icon: '🎃', description: 'Happy Halloween!', accent: '#F97316', rule: { kind: 'solar', month: 10, day: 31 } },
    { id: 'lower-yuan', name: '下元节', icon: '🏮', description: '十月十五下元节', accent: '#F87171', rule: { kind: 'lunar', month: 10, day: 15 } },
    { id: 'thanksgiving', name: '感恩节', icon: '🦃', description: '感恩有你', accent: '#EA580C', rule: { kind: 'nth-weekday', month: 11, weekday: 4, nth: 4 } },
    { id: 'winter-solstice', name: '冬至', icon: '❄️', description: '冬至快乐', accent: '#BFDBFE', rule: { kind: 'jieqi', term: '冬至', month: 12 } },
    { id: 'christmas-eve', name: '平安夜', icon: '🎄', description: '圣诞平安夜', accent: '#22C55E', rule: { kind: 'solar', month: 12, day: 24 } },
    { id: 'christmas', name: '圣诞节', icon: '🎅', description: 'Merry Christmas!', accent: '#16A34A', rule: { kind: 'solar', month: 12, day: 25 } },
];

// ---------------------------------------------------------------------------
// 规则求值：给定规则与年份，算出该年对应的公历日期
// ---------------------------------------------------------------------------

function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
    // month 为 1-12；weekday 0=周日
    const first = new Date(year, month - 1, 1);
    const offset = (weekday - first.getDay() + 7) % 7;
    return new Date(year, month - 1, 1 + offset + (nth - 1) * 7);
}

function lunarToSolar(lunarYear: number, month: number, day: number): Date {
    const solar: Solar = Lunar.fromYmd(lunarYear, month, day).getSolar();
    return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
}

function jieqiToSolar(year: number, term: string, month: number): Date | null {
    // 节气表按农历年切分，冬至可能归入上一公历年的表；
    // 改为从节气所在公历月份月初起，逐个向后取下一个节气，直到命中名称与年份
    let cursor = Lunar.fromDate(new Date(year, month - 1, 1));
    for (let i = 0; i < 4; i++) {
        const jq = cursor.getNextJieQi();
        const s = jq.getSolar();
        if (jq.getName() === term && s.getYear() === year) {
            return new Date(s.getYear(), s.getMonth() - 1, s.getDay());
        }
        cursor = Lunar.fromDate(new Date(s.getYear(), s.getMonth() - 1, s.getDay() + 1));
    }
    return null;
}

/** 生成某节日在基准年前后各一年的所有候选日期 */
function candidatesFor(def: FestivalDef, baseYear: number): Date[] {
    const years = [baseYear - 1, baseYear, baseYear + 1];
    const dates: Date[] = [];

    for (const y of years) {
        switch (def.rule.kind) {
            case 'solar':
                dates.push(new Date(y, def.rule.month - 1, def.rule.day));
                break;
            case 'nth-weekday':
                dates.push(nthWeekdayOfMonth(y, def.rule.month, def.rule.weekday, def.rule.nth));
                break;
            case 'lunar':
                // 农历 y 年的节日，公历日期可能落在 y 或 y+1 年初
                dates.push(lunarToSolar(y, def.rule.month, def.rule.day));
                break;
            case 'lunar-eve': {
                // 除夕 = 下一年农历正月初一的前一天
                const springFestival = lunarToSolar(y + 1, 1, 1);
                dates.push(new Date(springFestival.getFullYear(), springFestival.getMonth(), springFestival.getDate() - 1));
                break;
            }
            case 'jieqi': {
                const d = jieqiToSolar(y, def.rule.term, def.rule.month);
                if (d) dates.push(d);
                break;
            }
        }
    }
    return dates;
}

// ---------------------------------------------------------------------------
// 汇总导出
// ---------------------------------------------------------------------------

function getCustomCountdowns(now: Date): Holiday[] {
    return [
        {
            id: 'today-end',
            name: '今天结束',
            date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59),
            icon: '🌙',
            description: '今天就要结束啦',
            accent: '#A855F7',
            type: 'today',
        },
        {
            id: 'month-end',
            name: '本月结束',
            date: endOfMonth(now),
            icon: '📅',
            description: '本月即将结束',
            accent: '#6366F1',
            type: 'today',
        },
        {
            id: 'quarter-end',
            name: '本季度结束',
            date: endOfQuarter(now),
            icon: '🗓️',
            description: '季度即将结束',
            accent: '#3B82F6',
            type: 'today',
        },
        {
            id: 'new-year-eve',
            name: '跨年夜',
            date: new Date(now.getFullYear(), 11, 31, 23, 59, 59),
            icon: '🎆',
            description: '新年倒计时',
            accent: '#EC4899',
            type: 'custom',
            repeat: 'yearly',
        },
    ];
}

/** 计算所有节日的下一次发生日期（自动跨年滚动），按时间升序 */
export function getHolidays(now: Date = new Date()): Holiday[] {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const year = now.getFullYear();

    const festivals: Holiday[] = FESTIVALS.map(def => {
        const next = candidatesFor(def, year)
            .filter(d => d >= today)
            .sort((a, b) => a.getTime() - b.getTime())[0];

        return {
            id: def.id,
            name: def.name,
            date: next,
            icon: def.icon,
            description: def.description,
            accent: def.accent,
            type: 'holiday' as const,
            repeat: 'yearly' as const,
        };
    });

    return [...festivals, ...getCustomCountdowns(now)].sort((a, b) => a.date.getTime() - b.date.getTime());
}

export default getHolidays();
