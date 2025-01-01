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

// 获取今天的日期
const today = new Date();
const currentYear = today.getFullYear();
const nextYear = currentYear;

// 固定节日
const fixedHolidays: Holiday[] = [
  {
    id: 'new-year',
    name: '元旦',
    date: new Date(nextYear, 0, 1),
    icon: '🎉',
    description: '新年快乐！',
    color: 'bg-red-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'chinese-new-year-eve',
    name: '除夕',
    date: new Date(nextYear, 0, 28),
    icon: '🧨',
    description: '阖家团圆夜',
    color: 'bg-red-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'spring-festival',
    name: '春节',
    date: new Date(nextYear, 0, 29),
    icon: '🏮',
    description: '农历新年',
    color: 'bg-red-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'valentines-day',
    name: '情人节',
    date: new Date(nextYear, 1, 14),
    icon: '💝',
    description: '浪漫情人节',
    color: 'bg-pink-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'womens-day',
    name: '妇女节',
    date: new Date(nextYear, 2, 8),
    icon: '👩',
    description: '致敬杰出女性',
    color: 'bg-purple-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'arbor-day',
    name: '植树节',
    date: new Date(nextYear, 2, 12),
    icon: '🌳',
    description: '绿化祖国',
    color: 'bg-green-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'april-fools',
    name: '愚人节',
    date: new Date(nextYear, 3, 1),
    icon: '🃏',
    description: '开个玩笑',
    color: 'bg-yellow-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'labor-day',
    name: '劳动节',
    date: new Date(nextYear, 4, 1),
    icon: '👷',
    description: '劳动最光荣',
    color: 'bg-blue-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'youth-day',
    name: '青年节',
    date: new Date(nextYear, 4, 4),
    icon: '🌟',
    description: '五四青年节',
    color: 'bg-blue-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'children-day',
    name: '儿童节',
    date: new Date(nextYear, 5, 1),
    icon: '🎠',
    description: '六一儿童节',
    color: 'bg-yellow-300',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'party-day',
    name: '建党节',
    date: new Date(nextYear, 6, 1),
    icon: '🎗️',
    description: '中国共产党诞生纪念日',
    color: 'bg-red-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'army-day',
    name: '建军节',
    date: new Date(nextYear, 7, 1),
    icon: '⭐',
    description: '人民军队生日',
    color: 'bg-green-700',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'victory-day',
    name: '抗战胜利日',
    date: new Date(nextYear, 8, 3),
    icon: '✌️',
    description: '铭记历史',
    color: 'bg-blue-700',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'teachers-day',
    name: '教师节',
    date: new Date(nextYear, 8, 10),
    icon: '📚',
    description: '尊师重教',
    color: 'bg-blue-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'national-day',
    name: '国庆节',
    date: new Date(nextYear, 9, 1),
    icon: '🇨🇳',
    description: '祖国生日快乐',
    color: 'bg-red-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'halloween',
    name: '万圣节',
    date: new Date(nextYear, 9, 31),
    icon: '🎃',
    description: 'Happy Halloween!',
    color: 'bg-orange-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'thanksgiving',
    name: '感恩节',
    date: new Date(nextYear, 10, 27),
    icon: '🦃',
    description: '感恩有你',
    color: 'bg-orange-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'dragon-boat',
    name: '端午节',
    date: new Date(nextYear, 4, 31),
    icon: '🚣',
    description: '赛龙舟，吃粽子',
    color: 'bg-emerald-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'winter-solstice',
    name: '冬至',
    date: new Date(nextYear, 11, 21),
    icon: '❄️',
    description: '冬至快乐',
    color: 'bg-blue-200',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'christmas-eve',
    name: '平安夜',
    date: new Date(nextYear, 11, 24),
    icon: '🎄',
    description: '圣诞平安夜',
    color: 'bg-green-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'christmas',
    name: '圣诞节',
    date: new Date(nextYear, 11, 25),
    icon: '🎅',
    description: 'Merry Christmas!',
    color: 'bg-green-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'lantern-festival',
    name: '元宵节',
    date: new Date(nextYear, 1, 12),
    icon: '🏮',
    description: '正月十五闹元宵',
    color: 'bg-red-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'qingming',
    name: '清明节',
    date: new Date(nextYear, 3, 4),
    icon: '🌱',
    description: '缅怀先人',
    color: 'bg-green-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'mothers-day',
    name: '母亲节',
    date: new Date(nextYear, 4, 11),
    icon: '👩‍👦',
    description: '感恩母亲',
    color: 'bg-pink-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'fathers-day',
    name: '父亲节',
    date: new Date(nextYear, 5, 15),
    icon: '👨‍👦',
    description: '感恩父亲',
    color: 'bg-blue-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'summer-solstice',
    name: '夏至',
    date: new Date(nextYear, 5, 21),
    icon: '☀️',
    description: '一年中最长的白天',
    color: 'bg-yellow-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'qixi-festival',
    name: '七夕节',
    date: new Date(nextYear, 7, 3),
    icon: '🌌',
    description: '中国情人节',
    color: 'bg-purple-400',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'ghost-festival',
    name: '中元节',
    date: new Date(nextYear, 8, 6),
    icon: '🏮',
    description: '慎终追远',
    color: 'bg-gray-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'mid-autumn',
    name: '中秋节',
    date: new Date(nextYear, 9, 6),
    icon: '🌕',
    description: '月圆人团圆',
    color: 'bg-yellow-500',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'double-ninth',
    name: '重阳节',
    date: new Date(nextYear, 9, 29),
    icon: '🍂',
    description: '敬老节',
    color: 'bg-yellow-600',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'hanyi-festival',
    name: '寒衣节',
    date: new Date(nextYear, 10, 20),
    icon: '👘',
    description: '寒衣节',
    color: 'bg-blue-300',
    type: 'holiday',
    repeat: 'yearly'
  },
  {
    id: 'lower-yuan',
    name: '下元节',
    date: new Date(nextYear, 11, 4),
    icon: '🏮',
    description: '下元节',
    color: 'bg-red-400',
    type: 'holiday',
    repeat: 'yearly'
  }
];

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
    // 如果是今年的节日并且已经过去了，更新到明年
    if (holiday.repeat === 'yearly' && holiday.date < today) {
      const updatedDate = addYears(holiday.date, 1);
      // 如果更新后的日期在2025年之前，再加一年
      if (updatedDate.getFullYear() < 2025) {
        return {
          ...holiday,
          date: addYears(updatedDate, 1)
        };
      }
      return {
        ...holiday,
        date: updatedDate
      };
    }
    return holiday;
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}

// 确保所有日期都是未来的日期
export default getUpdatedHolidays();
