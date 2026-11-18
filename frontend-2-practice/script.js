// JavaScript для страницы выбора даты и времени.
//
// ЗАДАНИЕ
// ========
// Оживить свою свёрстанную страницу. Скорее всего на ней будет работать:
//   1. При открытии страницы выбрать день по умолчанию.
//   2. По клику на день — день становится выбранным,
//      слоты обновляются.
//   3. По клику на слот — время становится выбранным,
//      попадает в нижнюю панель.
//   4. Стрелки «‹» и «›» листают месяцы.
//   5. Дни раньше «сегодня» нельзя выбрать.
//   6. Нижняя панель обновляется при выборе дня и времени.
//
// ГДЕ ЖИВУТ ДАННЫЕ
// ----------------
// Слотов пока нет с сервера. Захардкодьте массив в этом файле.
// Формат слота: { time: "10:00", available: true }.
// «Сегодня» можно взять из new Date() или захардкодить —
// как удобнее для проверки.
//
// СТРУКТУРА КОДА
// --------------
// Разделите код на смысловые части комментариями:
//   1. Данные (слоты, «сегодня»).
//   2. Состояние (месяц, день, время, слоты).
//   3. Чистые функции (для работы с датами).
//   4. Отрисовка и обработчики.
//   5. Инициализация.
//
// ЧИСТЫЕ ФУНКЦИИ
// --------------
// Если понадобится строить сетку календаря — вот функция,
// которую можно использовать. Она не зависит от DOM,
// просто принимает год и месяц и возвращает массив недель.
//
// function buildCalendarGrid(year, month) {
//   const firstDay = new Date(year, month, 1);
//   const lastDay = new Date(year, month + 1, 0);
//   const daysInMonth = lastDay.getDate();
//   const startDayOfWeek = firstDay.getDay();
//   const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
//   const prevMonthLastDay = new Date(year, month, 0).getDate();
//
//   const cells = [];
//
//   for (let i = offset - 1; i >= 0; i--) {
//     cells.push({ day: prevMonthLastDay - i, otherMonth: true });
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     cells.push({ day: d, otherMonth: false });
//   }
//   const totalCells = Math.ceil(cells.length / 7) * 7;
//   let nextDay = 1;
//   while (cells.length < totalCells) {
//     cells.push({ day: nextDay, otherMonth: true });
//     nextDay++;
//   }
//
//   const weeks = [];
//   for (let i = 0; i < cells.length; i += 7) {
//     weeks.push(cells.slice(i, i + 7));
//   }
//   return weeks;
// }

// Начните писать код здесь.
// ==========================================
// 1. ДАННЫЕ
// ==========================================

const TODAY = { year: 2026, month: 9, day: 6 }; // 6 октября 2026 (месяцы в JS от 0 до 11)

const SERVICE_INFO = {
  master: 'Анна Кирова',
  title: 'Тонирование и блеск',
  durationMinutes: 90,
  price: '4500 ₽'
};

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const MONTH_NAMES_GENITIVE = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const WEEKDAY_NAMES = [
  'воскресенье', 'понедельник', 'вторник', 'среда',
  'четверг', 'пятница', 'суббота'
];

// Расписание слотов по числам месяца (для примера разные варианты занятости)
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


// ==========================================
// 2. СОСТОЯНИЕ
// ==========================================

const state = {
  viewYear: 2026,
  viewMonth: 9, // Октябрь
  selectedDate: { year: 2026, month: 9, day: 15 },
  selectedTime: '14:00'
};


// ==========================================
// 3. ЧИСТЫЕ ФУНКЦИИ
// ==========================================

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  // Преобразуем день недели (0 - Вс ... 6 - Сб) в формат Пн = 0 ... Вс = 6
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  // Дни предыдущего месяца
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true });
  }

  // Дни текущего месяца
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }

  // Дни следующего месяца до заполнения полной недели (кратной 7)
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, otherMonth: true });
  }

  // Разбиваем плоский массив на недели по 7 дней
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

function compareDates(a, b) {
  const d1 = new Date(a.year, a.month, a.day);
  const d2 = new Date(b.year, b.month, b.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

function isSameDate(a, b) {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

function getSlotsForDate(dateObj) {
  if (!dateObj) return [];
  return dateObj.day % 2 === 0 ? SLOTS_BY_DAY.even : SLOTS_BY_DAY.default;
}

function calculateEndTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}


// ==========================================
// 4. ОТРИСОВКА И ОБРАБОТЧИКИ
// ==========================================

function renderCalendar() {
  const titleEl = document.querySelector('.calendar-box .box-title');
  const daysGridEl = document.querySelector('.days-grid');

  titleEl.textContent = `${MONTH_NAMES[state.viewMonth]} ${state.viewYear}`;

  const weeks = buildCalendarGrid(state.viewYear, state.viewMonth);
  let html = '';

  weeks.forEach((week) => {
    week.forEach((cell) => {
      if (cell.otherMonth) {
        html += `<button type="button" class="day-cell other-month" disabled>${cell.day}</button>`;
        return;
      }

      const cellDate = {
        year: state.viewYear,
        month: state.viewMonth,
        day: cell.day
      };

      const isSelectable = compareDates(cellDate, TODAY) >= 0;
      const isToday = isSameDate(cellDate, TODAY);
      const isSelected = isSameDate(cellDate, state.selectedDate);

      let classes = 'day-cell';
      if (!isSelectable) classes += ' disabled';
      if (isToday) classes += ' today';
      if (isSelected) classes += ' selected';

      const disabledAttr = isSelectable ? '' : 'disabled';
      html += `<button type="button" class="${classes}" data-day="${cell.day}" ${disabledAttr}>${cell.day}</button>`;
    });
  });

  daysGridEl.innerHTML = html;

  // Навешиваем обработчики только на доступные дни
  const activeDayButtons = daysGridEl.querySelectorAll('.day-cell:not(.other-month):not(.disabled)');
  activeDayButtons.forEach((btn) => {
    btn.addEventListener('click', onDayClick);
  });
}

function renderSlots() {
  const subtitleEl = document.querySelector('.slots-subtitle');
  const slotsGridEl = document.querySelector('.slots-grid');

  if (!state.selectedDate) {
    subtitleEl.textContent = `Выберите дату • ${SERVICE_INFO.master}`;
    slotsGridEl.innerHTML = '';
    return;
  }

  const { day, month } = state.selectedDate;
  subtitleEl.textContent = `${day} ${MONTH_NAMES_GENITIVE[month]} • ${SERVICE_INFO.master}`;

  const slots = getSlotsForDate(state.selectedDate);
  let html = '';

  slots.forEach((slot) => {
    let classes = 'time-slot';
    if (slot.fullWidth) classes += ' full-width';
    if (!slot.available) classes += ' booked';
    if (slot.available && slot.time === state.selectedTime) classes += ' selected';

    if (!slot.available) {
      html += `
        <button type="button" class="${classes}" disabled>
          <span>${slot.time}</span>
          <span class="slot-status">Занято</span>
        </button>
      `;
    } else {
      html += `<button type="button" class="${classes}" data-time="${slot.time}">${slot.time}</button>`;
    }
  });

  slotsGridEl.innerHTML = html;

  // Навешиваем обработчики на свободные слоты
  const availableSlots = slotsGridEl.querySelectorAll('.time-slot:not(.booked)');
  availableSlots.forEach((btn) => {
    btn.addEventListener('click', onSlotClick);
  });
}

function renderSummary() {
  const datetimeEl = document.querySelector('.summary-datetime');
  const detailsEl = document.querySelector('.summary-details');

  if (!state.selectedDate) {
    datetimeEl.textContent = 'Дата не выбрана';
    detailsEl.textContent = `${SERVICE_INFO.master} · ${SERVICE_INFO.title} · ${SERVICE_INFO.durationMinutes} минут · ${SERVICE_INFO.price}`;
    return;
  }

  const { year, month, day } = state.selectedDate;
  const dateObj = new Date(year, month, day);
  const weekdayName = WEEKDAY_NAMES[dateObj.getDay()];

  if (state.selectedTime) {
    const endTime = calculateEndTime(state.selectedTime, SERVICE_INFO.durationMinutes);
    datetimeEl.textContent = `${day} ${MONTH_NAMES_GENITIVE[month]}, ${weekdayName} · ${state.selectedTime} - ${endTime}`;
  } else {
    datetimeEl.textContent = `${day} ${MONTH_NAMES_GENITIVE[month]}, ${weekdayName} · время не выбрано`;
  }

  detailsEl.textContent = `${SERVICE_INFO.master} · ${SERVICE_INFO.title} · ${SERVICE_INFO.durationMinutes} минут · ${SERVICE_INFO.price}`;
}

function onDayClick(event) {
  const clickedDay = parseInt(event.currentTarget.dataset.day, 10);

  state.selectedDate = {
    year: state.viewYear,
    month: state.viewMonth,
    day: clickedDay
  };
  state.selectedTime = null;

  renderCalendar();
  renderSlots();
  renderSummary();
}

function onSlotClick(event) {
  state.selectedTime = event.currentTarget.dataset.time;

  renderSlots();
  renderSummary();
}

function onPrevMonthClick() {
  state.viewMonth -= 1;
  if (state.viewMonth < 0) {
    state.viewMonth = 11;
    state.viewYear -= 1;
  }
  renderCalendar();
}

function onNextMonthClick() {
  state.viewMonth += 1;
  if (state.viewMonth > 11) {
    state.viewMonth = 0;
    state.viewYear += 1;
  }
  renderCalendar();
}


// ==========================================
// 5. ИНИЦИАЛИЗАЦИЯ
// ==========================================

function init() {
  const prevBtn = document.querySelector('.calendar-nav .month-btn:first-child');
  const nextBtn = document.querySelector('.calendar-nav .month-btn:last-child');

  prevBtn.addEventListener('click', onPrevMonthClick);
  nextBtn.addEventListener('click', onNextMonthClick);

  renderCalendar();
  renderSlots();
  renderSummary();
}

init();
