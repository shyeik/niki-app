import "../design/hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content">
        <p className="hero-eyebrow">NI-KI · Official Fan Page</p>

        <h1 className="hero-name">
          NI<span>-</span>KI
        </h1>

        <p className="hero-subtitle">
          Nishimura Riki — dancer, performer, dreamer
        </p>

        <div className="hero-cta">
          <a href="#updates" className="btn-primary">
            See Latest
          </a>
          <a href="#events" className="btn-outline">
            Upcoming Events
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span>I fell for you, faster than I fell apart</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
