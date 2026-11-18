import { MONTH_NAMES_GENITIVE, SERVICE_INFO } from '../utils/date';

export default function TimeSlots({
  selectedDate,
  slots,
  loading,
  error,
  selectedTime,
  onSelectTime
}) {
  const subtitle = selectedDate
    ? `${selectedDate.day} ${MONTH_NAMES_GENITIVE[selectedDate.month]} • ${SERVICE_INFO.master}`
    : `Выберите дату • ${SERVICE_INFO.master}`;

  return (
    <div className="card-box slots-box">
      <div className="slots-header">
        <h2 className="box-title">Доступное время</h2>
        <p className="slots-subtitle">{subtitle}</p>
      </div>

      {loading && (
        <div className="status-message">Загрузка слотов…</div>
      )}

      {!loading && error && (
        <div className="status-message error">Ошибка загрузки слотов: {error}</div>
      )}

      {!loading && !error && (
        <div className="slots-grid">
          {slots.map((slot) => {
            const isSelected = slot.available && slot.time === selectedTime;
            const classes = [
              'time-slot',
              slot.fullWidth && 'full-width',
              !slot.available && 'booked',
              isSelected && 'selected'
            ].filter(Boolean).join(' ');

            return (
              <button
                key={slot.time}
                type="button"
                className={classes}
                disabled={!slot.available}
                onClick={() => slot.available && onSelectTime(slot.time)}
              >
                {!slot.available ? (
                  <>
                    <span>{slot.time}</span>
                    <span className="slot-status">Занято</span>
                  </>
                ) : (
                  slot.time
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
