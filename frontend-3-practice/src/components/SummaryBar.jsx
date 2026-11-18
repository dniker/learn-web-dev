import {
  MONTH_NAMES_GENITIVE,
  WEEKDAY_NAMES,
  SERVICE_INFO,
  calculateEndTime
} from '../utils/date';

export default function SummaryBar({ selectedDate, selectedTime }) {
  let datetimeText = 'Дата не выбрана';

  if (selectedDate) {
    const { year, month, day } = selectedDate;
    const weekdayName = WEEKDAY_NAMES[new Date(year, month, day).getDay()];

    if (selectedTime) {
      const endTime = calculateEndTime(selectedTime, SERVICE_INFO.durationMinutes);
      datetimeText = `${day} ${MONTH_NAMES_GENITIVE[month]}, ${weekdayName} · ${selectedTime} - ${endTime}`;
    } else {
      datetimeText = `${day} ${MONTH_NAMES_GENITIVE[month]}, ${weekdayName} · время не выбрано`;
    }
  }

  return (
    <section className="booking-summary-bar">
      <div className="summary-info">
        <p className="summary-label">ВЫБОР</p>
        <p className="summary-datetime">{datetimeText}</p>
        <p className="summary-details">
          {SERVICE_INFO.master} · {SERVICE_INFO.title} · {SERVICE_INFO.durationMinutes} минут · {SERVICE_INFO.price}
        </p>
      </div>

      <div className="summary-actions">
        <button type="button" className="btn btn-secondary">← Назад</button>
        <button type="button" className="btn btn-primary">Далее →</button>
      </div>
    </section>
  );
}
