export function formatTime(seconds) {
  if (seconds == null || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

export function formatPercentage(value, decimals = 0) {
  if (value == null) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
}

export function formatScore(correct, total) {
  if (!total) return '0/0';
  return `${correct}/${total}`;
}

export function getScoreColor(percentage) {
  if (percentage >= 90) return 'text-success-600';
  if (percentage >= 75) return 'text-success-500';
  if (percentage >= 60) return 'text-warning-600';
  return 'text-danger-600';
}

export function getScoreBg(percentage) {
  if (percentage >= 90) return 'bg-success-50';
  if (percentage >= 75) return 'bg-success-50';
  if (percentage >= 60) return 'bg-warning-50';
  return 'bg-danger-50';
}

export function getPassStatus(percentage) {
  return percentage >= 75 ? { passed: true, label: 'PASSED', color: 'success' } : { passed: false, label: 'FAILED', color: 'danger' };
}

export function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}
