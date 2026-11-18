export const TODAY = { year: 2026, month: 9, day: 6 };

export const SERVICE_INFO = {
  master: 'Анна Кирова',
  title: 'Тонирование и блеск',
  durationMinutes: 90,
  price: '4500 ₽'
};

export const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const MONTH_NAMES_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const WEEKDAY_NAMES = [
  'воскресенье', 'понедельник', 'вторник', 'среда',
  'четверг', 'пятница', 'суббота'
];

export const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const SLOTS_BY_DAY = {
  default: [
    { time: '10:00', available: true },
    { time: '11:30', available: true },
    { time: '13:00', available: false },
    { time: '14:00', available: true },
    { time: '15:30', available: true },
    { time: '17:00', available: true },
    { time: '18:30', available: true, fullWidth: true }
  ],
  even: [
    { time: '10:00', available: false },
    { time: '11:30', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: false },
    { time: '15:30', available: true },
    { time: '17:00', available: true },
    { time: '18:30', available: false, fullWidth: true }
  ]
};

export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, otherMonth: true });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

export function compareDates(a, b) {
  const d1 = new Date(a.year, a.month, a.day);
  const d2 = new Date(b.year, b.month, b.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

export function isSameDate(a, b) {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function getSlotsForDate(dateObj) {
  if (!dateObj) return [];
  return dateObj.day % 2 === 0 ? SLOTS_BY_DAY.even : SLOTS_BY_DAY.default;
}

export function calculateEndTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}
