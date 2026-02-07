export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel,
  label,
  className = '',
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    danger: 'bg-danger-500',
    warning: 'bg-warning-500',
    accent: 'bg-accent-500',
    auto: pct >= 75 ? 'bg-success-500' : pct >= 50 ? 'bg-warning-500' : 'bg-danger-500',
  };

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-slate-600">{label || ''}</span>
          {showLabel && <span className="text-sm font-medium text-slate-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-500 ease-out ${colors[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
