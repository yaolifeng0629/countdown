/**
 * lunar-javascript 的最小类型声明（仅覆盖本项目用到的 API）。
 * 官方库未附带 d.ts，@types 亦不存在。
 */
declare module 'lunar-javascript' {
    export class Solar {
        static fromYmd(year: number, month: number, day: number): Solar;
        getYear(): number;
        getMonth(): number;
        getDay(): number;
        toYmd(): string;
    }

    export class JieQi {
        getName(): string;
        getSolar(): Solar;
    }

    export class Lunar {
        static fromYmd(lunarYear: number, lunarMonth: number, lunarDay: number): Lunar;
        static fromDate(date: Date): Lunar;
        getSolar(): Solar;
        /** 下一个节气 */
        getNextJieQi(): JieQi;
        /** 节气表：节气名（如 '清明'、'冬至'）→ 公历日期 */
        getJieQiTable(): Record<string, Solar>;
        /** 农历年干支，如 '丁未' */
        getYearInGanZhi(): string;
        /** 农历年生肖，如 '羊' */
        getYearShengXiao(): string;
    }
}
