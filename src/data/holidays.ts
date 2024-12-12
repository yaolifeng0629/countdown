import { addDays, addYears, getYear } from 'date-fns';

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  icon: string;
  description: string;
  color: string;
  type: 'holiday' | 'custom' | 'today';
  repeat?: 'yearly' | 'none';
}

const currentYear = getYear(new Date());

// 固定节日
const fixedHolidays: Holiday[] = [
  {
    id: 'new-year',
    name: '元旦',
    date: new Date(currentYear + 1, 0, 1),
    icon: '🎉',
    description: '新年快乐！',
    color: 'bg-red-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'spring-festival',
    name: '春节',
    date: new Date(2025, 0, 29),
    icon: '🏮',
    description: '农历新年',
    color: 'bg-red-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'qingming',
    name: '清明节',
    date: new Date(2025, 3, 4),
    icon: '🌱',
    description: '缅怀先人',
    color: 'bg-green-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'labor-day',
    name: '劳动节',
    date: new Date(currentYear, 4, 1),
    icon: '👷',
    description: '劳动最光荣',
    color: 'bg-blue-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'dragon-boat',
    name: '端午节',
    date: new Date(2025, 5, 31),
    icon: '🚣',
    description: '赛龙舟，吃粽子',
    color: 'bg-emerald-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'mid-autumn',
    name: '中秋节',
    date: new Date(2025, 8, 29),
    icon: '🌕',
    description: '月圆人团圆',
    color: 'bg-yellow-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'national-day',
    name: '国庆节',
    date: new Date(currentYear, 9, 1),
    icon: '🇨🇳',
    description: '祖国生日快乐',
    color: 'bg-red-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'christmas',
    name: '圣诞节',
    date: new Date(currentYear, 11, 25),
    icon: '🎄',
    description: 'Merry Christmas!',
    color: 'bg-green-600',
    type: 'holiday',
    repeat: 'yearly'
  },
];

// 获取今天的日期
const today = new Date();

// 自定义倒计时
const customCountdowns: Holiday[] = [
  {
    id: 'today-end',
    name: '今天结束',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
    icon: '🌙',
    description: '今天就要结束啦',
    color: 'bg-purple-500',
    type: 'today'
  },
  {
    id: 'winter',
    name: '冬至',
    date: new Date(2024, 11, 22),
    icon: '❄️',
    description: '冬至快乐',
    color: 'bg-blue-300',
    type: 'custom',
    repeat: 'yearly'
  },
  {
    id: 'new-year-eve',
    name: '跨年夜',
    date: new Date(currentYear, 11, 31, 23, 59, 59),
    icon: '🎆',
    description: '新年倒计时',
    color: 'bg-pink-500',
    type: 'custom',
    repeat: 'yearly'
  }
];

// 更新日期函数
function getUpdatedHolidays(): Holiday[] {
  const allHolidays = [...fixedHolidays, ...customCountdowns];

  return allHolidays.map(holiday => {
    if (holiday.repeat === 'yearly' && holiday.date < today) {
      return {
        ...holiday,
        date: addYears(holiday.date, 1)
      };
    }
    return holiday;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}

// 确保所有日期都是未来的日期
export default getUpdatedHolidays();
