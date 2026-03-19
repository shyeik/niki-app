import "../design/about.css";

export default function About({ updateCount, eventCount, tutorialCount }) {
  return (
    <div className="about-strip">
      <div className="about-inner">
        <div className="about-text">
          <h2>
            Born to move,
            <br />
            <em>made to inspire.</em>
          </h2>
          <p className="about-desc">
            Nishimura Riki, known as NI-KI, is a Japanese idol and main dancer
            of ENHYPEN. His fluid style, magnetic stage presence, and undeniable
            charisma have captured fans worldwide.
          </p>
          <p className="about-desc">
            This space is where fans stay close — through behind-the-scenes
            updates, upcoming events, and tutorials that celebrate his artistry.
          </p>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat-num">{updateCount ?? "—"}</span>
            <span className="about-stat-label">Updates posted</span>
          </div>

          <div className="about-stat">
            <span className="about-stat-num">{eventCount ?? "—"}</span>
            <span className="about-stat-label">Events this year</span>
          </div>

          <div className="about-stat">
            <span className="about-stat-num">{tutorialCount ?? "—"}</span>
            <span className="about-stat-label">Tutorials available</span>
          </div>

          <div className="about-stat">
            <span className="about-stat-num">∞</span>
            <span className="about-stat-label">Fan love</span>
          </div>
        </div>
      </div>
    </div>
  );
}
