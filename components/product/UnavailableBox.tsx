'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { buttonCls } from '@/components/ui';
import { Bell, RotateCcw, ExternalLink } from 'lucide-react';
import type { Product } from '@/lib/types/product';

interface UnavailableBoxProps {
  product: Product;
}

export function UnavailableBox({ product }: UnavailableBoxProps) {
  return (
    <section className="rounded-card bg-white shadow-3d ring-2 ring-laranja-500 p-5 md:p-8" role="status" aria-live="polite">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-laranja-100">
          <svg className="size-8 text-laranja-500" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <div>
          <h2 className="text-[22px] font-bold text-laranja-700">Produto indisponível no momento</h2>
          <p className="mt-2 max-w-md text-[15px] text-cinza-600">
            Este produto não está disponível para compra no Mercado Livre no momento. Podemos te avisar quando voltar ao estoque.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            type="button"
            className={buttonCls('secundario', 'md', 'w-full')}
          >
            <Bell className="size-5" strokeWidth={2.5} /> Me avise quando voltar
          </button>
          <a
            href={`/busca?q=${encodeURIComponent(product.title)}`}
            className={buttonCls('fantasma', 'md', 'w-full')}
          >
            Ver produtos similares
          </a>
        </div>
      </div>
    </section>
  );
}