import "../design/navbar.css";
export default function Navbar() {
  return (
    <nav>
      <a href="#home" className="nav-logo">
        NI-KI
      </a>

      <ul className="nav-links">
        <li>
          <a href="#updates">Updates</a>
        </li>
        <li>
          <a href="#events">Events</a>
        </li>
        <li>
          <a href="#tutorials">Tutorials</a>
        </li>
      </ul>

      <a href="#updates" className="nav-pill">
        Latest
      </a>
    </nav>
  );
}
