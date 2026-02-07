import { Clock, AlertTriangle } from 'lucide-react';
import { formatTime } from '../../utils/formatters';

export default function Timer({ seconds, isWarning, isDanger }) {
  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold
        transition-all duration-300
        ${isDanger
          ? 'bg-danger-50 text-danger-600 border border-danger-200 pulse-gentle'
          : isWarning
            ? 'bg-warning-50 text-warning-600 border border-warning-200'
            : 'bg-slate-100 text-slate-700 border border-slate-200'
        }
      `}
    >
      {isDanger ? <AlertTriangle size={18} /> : <Clock size={18} />}
      {formatTime(seconds)}
    </div>
  );
}
