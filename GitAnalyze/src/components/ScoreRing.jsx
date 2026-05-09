import './ScoreRing.css';

export default function ScoreRing({ score, size = 120, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  // Determine color based on score
  let colorClass = 'score-high';
  if (score < 50) colorClass = 'score-low';
  else if (score < 80) colorClass = 'score-medium';

  return (
    <div className="score-ring-container" style={{ width: size, height: size }}>
      <svg className="score-ring" width={size} height={size}>
        <circle
          className="score-ring-bg"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`score-ring-progress ${colorClass}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="score-ring-text">
        <span className="score-value mono">{score}</span>
      </div>
    </div>
  );
}
