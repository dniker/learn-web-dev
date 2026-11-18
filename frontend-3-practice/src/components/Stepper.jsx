export default function Stepper() {
  return (
    <section className="stepper-section">
      <div className="container">
        <ol className="stepper-list">
          <li className="step-item completed">
            <span className="step-circle">✓</span>
            <span className="step-label">Мастер</span>
          </li>
          <li className="step-line completed"></li>
          <li className="step-item completed">
            <span className="step-circle">✓</span>
            <span className="step-label">Услуга</span>
          </li>
          <li className="step-line completed"></li>
          <li className="step-item active">
            <span className="step-circle">3</span>
            <span className="step-label">Дата и время</span>
          </li>
          <li className="step-line"></li>
          <li className="step-item">
            <span className="step-circle">4</span>
            <span className="step-label">Контакты</span>
          </li>
          <li className="step-line"></li>
          <li className="step-item">
            <span className="step-circle">5</span>
            <span className="step-label">Подтверждение</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
