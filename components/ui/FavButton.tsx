'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useStore } from '@/lib/store';

interface FavButtonProps {
  id: string;
  forced?: boolean;
  className?: string;
}

export function FavButton({ id, forced, className }: FavButtonProps) {
  const { isFavorite, toggleFavorite } = useStore();
  const on = forced ?? isFavorite(id);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
      title={on ? 'Salvo' : 'Salvar'}
      onClick={() => toggleFavorite(id)}
      className={cn(
        'grid size-11 place-items-center rounded-pill bg-white shadow-3d-sm transition-transform hover:scale-105',
        on ? 'text-roxo-700' : 'text-roxo-700/70',
        className,
      )}
    >
      <Heart className={cn('size-5', on && 'fill-roxo-700')} strokeWidth={2.5} />
    </button>
  );
}