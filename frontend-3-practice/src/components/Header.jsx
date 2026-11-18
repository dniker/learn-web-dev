export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#" className="logo">КОНТУР</a>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#" className="nav-link">Услуги</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Галерея</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Команда</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Отзывы</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
