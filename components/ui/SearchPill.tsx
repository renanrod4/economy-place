'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SearchPillProps {
  defaultValue?: string;
  size?: 'md' | 'lg';
  onDark?: boolean;
}

export function SearchPill({ defaultValue = '', size = 'md', onDark = true }: SearchPillProps) {
  const [q, setQ] = useState(defaultValue);
  const router = useRouter();
  return (
    <form
      role="search"
      className={cn(
        'flex w-full items-center rounded-pill bg-white pl-4 pr-1.5',
        size === 'lg' ? 'h-14' : 'h-12',
        onDark ? 'shadow-[0_4px_0_rgba(0,0,0,.18)]' : 'ring-2 ring-lilas-200 shadow-3d-sm',
      )}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        router.push(`/busca?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <Search className="size-5 shrink-0 text-roxo-500" strokeWidth={2.5} aria-hidden />
      <label className="sr-only" htmlFor={`busca-${size}`}>Buscar ofertas</label>
      <input
        id={`busca-${size}`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar air fryer, mala de bordo, sérum…"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-[15px] text-tinta placeholder:text-cinza-600 focus:outline-none"
      />
      <button
        type="submit"
        className={cn('shrink-0 rounded-pill bg-roxo-700 font-display font-extrabold text-white hover:bg-roxo-500', size === 'lg' ? 'h-11 px-6' : 'h-9 px-4 text-[15px]')}
      >
        Buscar
      </button>
    </form>
  );
}