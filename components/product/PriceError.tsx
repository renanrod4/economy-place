'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { buttonCls } from '@/components/ui';
import { AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import type { Product } from '@/lib/types/product';
import { to } from '@/lib/store';

interface PriceErrorProps {
  product: Product;
}

export function PriceError({ product }: PriceErrorProps) {
  return (
    <section className="rounded-card bg-white shadow-3d ring-2 ring-vermelho-500 p-5 md:p-8" role="alert" aria-live="assertive">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-vermelho-100">
          <AlertCircle className="size-8 text-vermelho-500" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-[22px] font-bold text-vermelho-700">Não foi possível carregar o preço</h2>
          <p className="mt-2 max-w-md text-[15px] text-cinza-600">
            O Mercado Livre retornou um erro ao buscar o preço atual deste produto. Isso pode acontecer temporariamente.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            type="button"
            className={buttonCls('primario', 'md', 'w-full')}
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="size-5" strokeWidth={2.5} /> Tentar novamente
          </button>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className={cn(buttonCls('fantasma', 'md', 'w-full'), 'text-vermelho-700 ring-vermelho-500/30 hover:bg-vermelho-50')}
          >
            Ver no Mercado Livre
            <ExternalLink className="size-4" strokeWidth={2.75} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}