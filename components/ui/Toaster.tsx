'use client';

import { useStore } from '@/lib/store';
import { ToastView } from './ToastView';
import { cn } from '@/lib/utils/cn';

export function Toaster() {
  const { toasts, dismiss } = useStore();
  return (
    <div aria-live="polite" className={cn('pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-6')}>
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto w-full max-w-sm">
          <ToastView kind={t.kind} text={t.text} onClose={() => dismiss(t.id)} />
        </div>
      ))}
    </div>
  );
}