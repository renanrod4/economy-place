'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { money, installment } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { MLButton, buttonCls } from '@/components/ui';
import { ExternalLink, Bell, Scale, Heart } from 'lucide-react';
import { useStore } from '@/lib/store';

interface StickyCTAProps {
  product: Product;
}

export function StickyCTA({ product }: StickyCTAProps) {
  const { isFavorite, toggleFavorite, toggleCompare } = useStore();
  const fav = isFavorite(product.id);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white border-t-2 border-lilas-200 pb-[env(safe-area-inset-bottom)] lg:hidden" role="complementary" aria-label="Ações rápidas">
      <Container className="flex h-16 items-center gap-3">
        <div className="flex-1 flex flex-col items-start justify-center gap-0.5 px-3">
          <span className="text-[11px] text-cinza-600">Preço atual</span>
          <span className="font-display text-[22px] font-extrabold text-vermelho-500">{money(product.price)}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={fav}
            aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className={cn(
              'grid h-12 w-12 place-items-center rounded-pill shadow-3d transition-colors',
              fav ? 'bg-lilas-100 text-roxo-700' : 'bg-white text-cinza-600 ring-1 ring-lilas-200'
            )}
          >
            <Heart className={cn('size-6', fav && 'fill-current')} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            aria-label="Adicionar ao comparador"
            className="grid h-12 w-12 place-items-center rounded-pill bg-white text-cinza-600 ring-1 ring-lilas-200 shadow-3d"
          >
            <Scale className="size-6" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            aria-label="Criar alerta de preço"
            className="grid h-12 w-12 place-items-center rounded-pill bg-white text-cinza-600 ring-1 ring-lilas-200 shadow-3d"
          >
            <Bell className="size-6" strokeWidth={2.5} />
          </button>
        </div>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className={cn(buttonCls('primario', 'md', 'w-full md:w-auto'), 'whitespace-nowrap')}
        >
          Ver oferta
          <ExternalLink className="size-4" strokeWidth={2.75} aria-hidden />
        </a>
      </Container>
    </div>
  );
}