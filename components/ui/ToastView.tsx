'use client';

import { XIcon, CheckCircleIcon, AlertTriangleIcon, InfoIcon } from './ToastIcons';
import { cn } from '@/lib/utils/cn';
import type { ToastKind } from '@/lib/store';

const toastStyle: Record<ToastKind, { cls: string; icon: React.ReactNode; label: string }> = {
  sucesso: { cls: 'bg-roxo-900 text-white', icon: <CheckCircleIcon className="size-5 text-verde-500" />, label: 'Sucesso' },
  info: { cls: 'bg-white text-tinta ring-2 ring-lilas-200', icon: <InfoIcon className="size-5 text-roxo-500" />, label: 'Informação' },
  erro: { cls: 'bg-white text-tinta ring-2 ring-vermelho-500', icon: <AlertTriangleIcon className="size-5 text-vermelho-500" />, label: 'Atenção' },
};

interface ToastViewProps {
  kind: ToastKind;
  text: string;
  onClose?: () => void;
}

export function ToastView({ kind, text, onClose }: ToastViewProps) {
  const s = toastStyle[kind];
  return (
    <div role="status" className={cn('flex w-full max-w-sm items-center gap-3 rounded-card px-4 py-3 shadow-3d', s.cls)}>
      {s.icon}
      <p className="flex-1 text-[14px] font-bold">
        <span className="sr-only">{s.label}: </span>
        {text}
      </p>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Fechar aviso" className="grid size-9 place-items-center rounded-pill opacity-70 hover:opacity-100">
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}