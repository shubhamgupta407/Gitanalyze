import './BorderGlow.css';

const BorderGlow = ({
  children,
  borderRadius = 20,
  backgroundColor = '#0a0e1a',
  colors = ['#6366f1', '#818cf8', '#38bdf8'],
  className = '',
}) => {
  return (
    <div
      className={`border-glow-wrap ${className}`}
      style={{
        '--glow-radius': `${borderRadius}px`,
        '--glow-bg': backgroundColor,
        '--glow-c1': colors[0] || '#6366f1',
        '--glow-c2': colors[1] || '#818cf8',
        '--glow-c3': colors[2] || '#38bdf8',
      }}
    >
      <div className="border-glow-inner-bg">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
