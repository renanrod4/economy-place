'use client';

import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CountdownProps {
  endsAt?: string;
  onDark?: boolean;
  source?: string;
}

export function Countdown({ endsAt, onDark, source = 'informada pelo vendedor' }: CountdownProps) {
  const [now, setNow] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The timer is browser-only to avoid rendering a changing value on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted || !endsAt) return null;
  const end = new Date(endsAt);
  const left = end.getTime() - now;
  if (left <= 0) return null;
  const d = Math.floor(left / 864e5);
  const hh = Math.floor((left % 864e5) / 36e5);
  const mm = Math.floor((left % 36e5) / 6e4);
  const ss = Math.floor((left % 6e4) / 1e3);
  const pad = (n: number) => String(n).padStart(2, '0');
  const parts = [...(d > 0 ? [[d, 'dias']] : []), [hh, 'h'], [mm, 'min'], [ss, 's']] as [number, string][];
  const dateText = end.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn('flex items-center gap-2 text-[13px] font-extrabold', onDark ? 'text-white' : 'text-vermelho-700')}>
        <Timer className="size-4" strokeWidth={2.5} aria-hidden /> Oferta termina em
      </div>
      <div className="flex gap-1.5" role="timer" aria-label={`Termina em ${d ? d + ' dias, ' : ''}${hh} horas e ${mm} minutos`}>
        {parts.map(([v, l]) => (
          <span key={l} className={cn('flex min-w-12 flex-col items-center rounded-[10px] px-2 py-1', onDark ? 'bg-white/12 text-white' : 'bg-vermelho-500 text-white')}>
            <span className="font-display text-[22px] font-extrabold leading-none">{pad(v)}</span>
            <span className="text-[10.5px] font-bold uppercase opacity-90">{l}</span>
          </span>
        ))}
      </div>
      <p className={cn('text-[12px]', onDark ? 'text-white/75' : 'text-cinza-600')}>
        Até {dateText.replace(',', ' às')} · data {source}
      </p>
    </div>
  );
}