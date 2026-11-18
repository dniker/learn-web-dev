export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <p className="footer-logo">КОНТУР</p>
            <p className="footer-desc">
              Парикмахерская в Ярославле. Женские и мужские стрижки, окрашивание, укладки и профессиональный уход за волосами.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">КОНТАКТЫ</h3>
            <p className="footer-text">📍 ул. Профсоюзная 20, Ярославль</p>
            <a href="tel:+79881234567" className="footer-phone">📞 +7 (988) 123-45-67</a>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">РЕЖИМ РАБОТЫ</h3>
            <p className="footer-text">Пн–Пт: 9:00 – 21:00</p>
            <p className="footer-text">Сб–Вс: 10:00 – 19:00</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026. Все права защищены.</p>
          <a href="#" className="privacy-link">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
