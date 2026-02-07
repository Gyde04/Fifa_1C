import { Loader2 } from 'lucide-react';

export default function Loading({ fullPage, size = 'md', message }) {
  const sizes = { sm: 20, md: 32, lg: 48 };

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <Loader2 size={sizes[size]} className="animate-spin text-primary-500" />
        {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 size={sizes[size]} className="animate-spin text-primary-500" />
      {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
    </div>
  );
}
