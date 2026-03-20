export default function ErrorState({ onRetry }) {
  return (
    <div className="page-state error">
      <div className="error-icon">⚠️</div>
      <p className="state-text">Failed to load data</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}
