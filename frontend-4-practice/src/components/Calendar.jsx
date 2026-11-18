import {
  MONTH_NAMES,
  WEEKDAYS_SHORT,
  buildCalendarGrid,
  compareDates,
  isSameDate
} from '../utils/date';

export default function Calendar({
  today,
  viewYear,
  viewMonth,
  selectedDate,
  onSelectDay,
  onPrevMonth,
  onNextMonth
}) {
  const weeks = buildCalendarGrid(viewYear, viewMonth);

  return (
    <div className="card-box calendar-box">
      <div className="calendar-header">
        <h2 className="box-title">{MONTH_NAMES[viewMonth]} {viewYear}</h2>
        <div className="calendar-nav">
          <button
            type="button"
            className="month-btn"
            aria-label="Предыдущий месяц"
            onClick={onPrevMonth}
          >
            ‹
          </button>
          <button
            type="button"
            className="month-btn"
            aria-label="Следующий месяц"
            onClick={onNextMonth}
          >
            ›
          </button>
        </div>
      </div>

      <div className="weekdays-grid">
        {WEEKDAYS_SHORT.map((dayName) => (
          <span key={dayName} className="weekday">{dayName}</span>
        ))}
      </div>

      <div className="days-grid">
        {weeks.flat().map((cell, index) => {
          if (cell.otherMonth) {
            return (
              <button
                key={index}
                type="button"
                className="day-cell other-month"
                disabled
              >
                {cell.day}
              </button>
            );
          }

          const cellDate = { year: viewYear, month: viewMonth, day: cell.day };
          const isSelectable = today ? compareDates(cellDate, today) >= 0 : true;
          const isToday = isSameDate(cellDate, today);
          const isSelected = isSameDate(cellDate, selectedDate);

          const classes = [
            'day-cell',
            !isSelectable && 'disabled',
            isToday && 'today',
            isSelected && 'selected'
          ].filter(Boolean).join(' ');

          return (
            <button
              key={index}
              type="button"
              className={classes}
              disabled={!isSelectable}
              onClick={() => isSelectable && onSelectDay(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
