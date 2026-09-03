type LaplaceFeatureProps = {
  context?: "home" | "about";
};

function ExternalArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 12.5 12 4" />
      <path d="M6.5 3.5h6v6" />
    </svg>
  );
}

export function LaplaceFeature({ context = "home" }: LaplaceFeatureProps) {
  return (
    <section
      className={`laplace-feature laplace-feature--${context}`}
      aria-labelledby={`laplace-feature-heading-${context}`}
    >
      <div className="laplace-feature__copy">
        <p className="laplace-feature__eyebrow">
          <span /> HUMAN PLAY / REINFORCEMENT LEARNING
        </p>
        <h2 id={`laplace-feature-heading-${context}`}>LAPLACE</h2>
        <p className="laplace-feature__description">
          互いの選択を読み合う2v2戦略ボードゲーム。対戦AIは強化学習によって開発され、未知のゲームに対するAIの能力を測るベンチマークとしての活用も見据えています。
        </p>

        <div className="laplace-feature__actions">
          <a
            className="laplace-feature__primary"
            href="https://www.laplace.zone/cpu?lang=ja"
            target="_blank"
            rel="noreferrer"
          >
            AIに挑む <ExternalArrow />
          </a>
          <a
            className="laplace-feature__secondary"
            href="https://www.laplace.zone/"
            target="_blank"
            rel="noreferrer"
          >
            LAPLACEを開く <ExternalArrow />
          </a>
        </div>

        <a
          className="laplace-feature__bench"
          href="https://www.laplace.zone/bench?lang=ja"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <small>AI BENCHMARK</small>
            <strong>LaplaceBench</strong>
          </span>
          <span>未知のゲームに対するAIの能力を測る</span>
          <ExternalArrow />
        </a>
      </div>

      <figure className="laplace-feature__board">
        <a
          href="https://www.laplace.zone/cpu?lang=ja"
          target="_blank"
          rel="noreferrer"
          aria-label="Laplaceで強化学習AIと対戦する"
        >
          <span className="laplace-feature__board-frame">
            <img
              src="/assets/laplace-board-cutout.png"
              alt="LAPLACEの8×8ゲーム盤面"
              loading="lazy"
              decoding="async"
            />
          </span>
        </a>
        <figcaption>
          <span /> RL AI / PLAYABLE NOW
        </figcaption>
      </figure>
    </section>
  );
}
