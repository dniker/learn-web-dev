// App — корневой компонент приложения.
//
// ЗАДАНИЕ
// --------
// Перенесите свою страницу выбора даты и времени из нативного JS
// на React. У вас уже есть:
//   - готовая вёрстка (HTML);
//   - готовые стили (CSS);
//   - рабочий код на нативном JS (валидация дат, рендер календаря,
//     обработчики кликов, выбор слота).
//
// Теперь нужно то же самое сделать в React.
//
// ЧТО НУЖНО СДЕЛАТЬ
// ------------------
// 1. Разбить страницу на компоненты. Как именно — решайте сами.
//    Обычно выделяют: шапку, подвал, календарь, сетку слотов,
//    нижнюю панель.
//
// 2. Перенести вёрстку из HTML в JSX. Стили оставить как есть,
//    просто положить их в тот же проект (например, в src/styles/
//    или рядом с компонентами).
//
// 3. Заменить нативное состояние (переменные + прямые манипуляции
//    с DOM) на useState. Какие именно данные должны жить в состоянии —
//    подумайте сами. Скорее всего: текущий месяц, выбранный день,
//    выбранное время, массив слотов.
//
// 4. Рендер календаря и слотов делать через JSX и .map(),
//    без innerHTML и querySelector.
//
// 5. Обработчики кликов — через onClick прямо в JSX,
//    без addEventListener.
//
// 6. Функции для работы с датами, которые вы уже написали
//    на нативном JS (построение сетки календаря, сравнение дат,
//    проверка «не раньше сегодня»), можно переиспользовать.
//    Они чистые — не зависят от React. Создайте файл
//    src/utils/date.js и перенесите их туда.
//
//
// ПОДСКАЗКА
// ---------
// Если что-то не работает или непонятно, как перевести нативный
// код на React — вернитесь к лекции. Там разбирались все
// основные приёмы: состояние, пропсы, рендер списков, колбэки.
//
// Ниже — пустой каркас. Здесь можно начать писать.

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Stepper from './components/Stepper';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import SummaryBar from './components/SummaryBar';
import Footer from './components/Footer';
import { fetchToday, fetchSlots } from './api';

export default function App() {
  const [today, setToday] = useState(null);
  const [todayLoading, setTodayLoading] = useState(true);
  const [todayError, setTodayError] = useState(null);

  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(9);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  useEffect(() => {
    async function loadToday() {
      try {
        setTodayLoading(true);
        setTodayError(null);
        const data = await fetchToday();
        setToday(data);
        setViewYear(data.year);
        setViewMonth(data.month);
        setSelectedDate(data);
      } catch (err) {
        setTodayError(err.message || 'Не удалось получить текущую дату с сервера');
      } finally {
        setTodayLoading(false);
      }
    }

    loadToday();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    async function loadSlots() {
      try {
        setSlotsLoading(true);
        setSlotsError(null);
        const data = await fetchSlots(selectedDate);
        setSlots(data.slots || []);
      } catch (err) {
        setSlotsError(err.message || 'Не удалось загрузить слоты');
        setSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    }

    loadSlots();
  }, [selectedDate]);

  function handleSelectDay(day) {
    setSelectedDate({ year: viewYear, month: viewMonth, day });
    setSelectedTime(null);
  }

  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  }

  return (
    <div className="page">
      <Header />
      <Stepper />

      <main className="main-content">
        <div className="container">
          <section className="booking-top">
            <div className="booking-heading">
              <h1 className="page-title">ЗАПИСЬ</h1>
              <p className="page-subtitle">Выберите дату и время</p>
            </div>

            <div className="selected-service-card">
              <div className="service-card-left">
                <span className="service-checkbox">✓</span>
                <div className="service-info">
                  <h2 className="service-name">Тонирование и блеск</h2>
                  <p className="service-duration">Длительность: 90 мин</p>
                </div>
              </div>
              <span className="service-price">4 500 ₽</span>
            </div>
          </section>

          {todayLoading && (
            <div className="status-message">Загрузка календаря…</div>
          )}

          {!todayLoading && todayError && (
            <div className="status-message error">
              Ошибка загрузки календаря: {todayError}
            </div>
          )}

          {!todayLoading && !todayError && (
            <>
              <section className="booking-grid">
                <Calendar
                  today={today}
                  viewYear={viewYear}
                  viewMonth={viewMonth}
                  selectedDate={selectedDate}
                  onSelectDay={handleSelectDay}
                  onPrevMonth={handlePrevMonth}
                  onNextMonth={handleNextMonth}
                />

                <TimeSlots
                  selectedDate={selectedDate}
                  slots={slots}
                  loading={slotsLoading}
                  error={slotsError}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </section>

              <SummaryBar
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

