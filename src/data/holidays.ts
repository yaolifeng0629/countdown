import { addDays, addYears, getYear, endOfMonth, endOfQuarter } from 'date-fns';

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
    date: new Date(currentYear, 0, 1),
    icon: '🎉',
    description: '新年快乐！',
    color: 'bg-red-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'valentines-day',
    name: '情人节',
    date: new Date(currentYear, 1, 14),
    icon: '💝',
    description: '浪漫情人节',
    color: 'bg-pink-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'womens-day',
    name: '妇女节',
    date: new Date(currentYear, 2, 8),
    icon: '👩',
    description: '致敬杰出女性',
    color: 'bg-purple-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'arbor-day',
    name: '植树节',
    date: new Date(currentYear, 2, 12),
    icon: '🌳',
    description: '绿化祖国',
    color: 'bg-green-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'april-fools',
    name: '愚人节',
    date: new Date(currentYear, 3, 1),
    icon: '🃏',
    description: '开个玩笑',
    color: 'bg-yellow-400',
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
    id: 'youth-day',
    name: '青年节',
    date: new Date(currentYear, 4, 4),
    icon: '🌟',
    description: '五四青年节',
    color: 'bg-blue-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'children-day',
    name: '儿童节',
    date: new Date(currentYear, 5, 1),
    icon: '🎠',
    description: '六一儿童节',
    color: 'bg-yellow-300',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'party-day',
    name: '建党节',
    date: new Date(currentYear, 6, 1),
    icon: '🎗️',
    description: '中国共产党诞生纪念日',
    color: 'bg-red-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'army-day',
    name: '建军节',
    date: new Date(currentYear, 7, 1),
    icon: '⭐',
    description: '人民军队生日',
    color: 'bg-green-700',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'victory-day',
    name: '抗战胜利日',
    date: new Date(currentYear, 8, 3),
    icon: '✌️',
    description: '铭记历史',
    color: 'bg-blue-700',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'teachers-day',
    name: '教师节',
    date: new Date(currentYear, 8, 10),
    icon: '📚',
    description: '尊师重教',
    color: 'bg-blue-500',
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
    id: 'halloween',
    name: '万圣节',
    date: new Date(currentYear, 9, 31),
    icon: '🎃',
    description: 'Happy Halloween!',
    color: 'bg-orange-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'thanksgiving',
    name: '感恩节',
    date: new Date(currentYear, 10, 27),
    icon: '🦃',
    description: '感恩有你',
    color: 'bg-orange-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'winter-solstice',
    name: '冬至',
    date: new Date(currentYear, 11, 22),
    icon: '❄️',
    description: '冬至快乐',
    color: 'bg-blue-200',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'christmas-eve',
    name: '平安夜',
    date: new Date(currentYear, 11, 24),
    icon: '🎄',
    description: '圣诞平安夜',
    color: 'bg-green-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'christmas',
    name: '圣诞节',
    date: new Date(currentYear, 11, 25),
    icon: '🎅',
    description: 'Merry Christmas!',
    color: 'bg-green-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'lantern-festival',
    name: '元宵节',
    date: new Date(2025, 1, 12),
    icon: '🏮',
    description: '正月十五闹元宵',
    color: 'bg-red-400',
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
    id: 'mothers-day',
    name: '母亲节',
    date: new Date(2025, 4, 11),
    icon: '👩‍👦',
    description: '感恩母亲',
    color: 'bg-pink-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'fathers-day',
    name: '父亲节',
    date: new Date(2025, 5, 15),
    icon: '👨‍👦',
    description: '感恩父亲',
    color: 'bg-blue-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'summer-solstice',
    name: '夏至',
    date: new Date(2025, 5, 21),
    icon: '☀️',
    description: '一年中最长的白天',
    color: 'bg-yellow-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'qixi-festival',
    name: '七夕节',
    date: new Date(2025, 7, 3),
    icon: '🌌',
    description: '中国情人节',
    color: 'bg-purple-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'ghost-festival',
    name: '中元节',
    date: new Date(2025, 8, 15),
    icon: '🏮',
    description: '慎终追远',
    color: 'bg-gray-600',
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
    id: 'double-ninth',
    name: '重阳节',
    date: new Date(2025, 9, 6),
    icon: '🍂',
    description: '敬老节',
    color: 'bg-yellow-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'hanyi-festival',
    name: '寒衣节',
    date: new Date(2025, 9, 15),
    icon: '👘',
    description: '寒衣节',
    color: 'bg-blue-300',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'lower-yuan',
    name: '下元节',
    date: new Date(2025, 10, 26),
    icon: '🏮',
    description: '下元节',
    color: 'bg-red-400',
    type: 'holiday',
    repeat: 'yearly'
  }
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
    id: 'month-end',
    name: '本月结束',
    date: endOfMonth(today),
    icon: '📅',
    description: '本月即将结束',
    color: 'bg-indigo-500',
    type: 'today'
  },
  {
    id: 'quarter-end',
    name: '本季度结束',
    date: endOfQuarter(today),
    icon: '🗓️',
    description: '季度即将结束',
    color: 'bg-blue-500',
    type: 'today'
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
