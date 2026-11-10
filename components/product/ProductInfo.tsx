'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useStore, to } from '@/lib/store';
import { money, installment, discountOf, AFFILIATE_NOTE } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { MLButton, Seal, DiscountBadge, UpdatedLine, AffiliateNote, buttonCls, Price } from '@/components/ui';
import { FavButton } from '@/components/ui/FavButton';
import { Bell, Scale, Shield, Truck, Zap, Sparkles, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Countdown } from '@/components/ui/Countdown';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { isFavorite, toggleFavorite, toggleCompare, toast } = useStore();
  const fav = isFavorite(product.id);
  const inCompare = false; // TODO: get from store compare array

  const handleFav = () => {
    toggleFavorite(product.id);
  };

  const handleCompare = () => {
    const had = inCompare;
    toggleCompare(product.id);
    // toast already called by toggleCompare
  };

  const handleAlert = () => {
    toast('Redirecionando para criar alerta...', 'info');
    // Navigation handled by router
  };

  const benefits = [
    { condition: product.freeShipping, icon: <Truck className="size-5 text-verde-500" strokeWidth={2.5} />, text: 'Frete grátis', desc: 'Entrega sem custo adicional' },
    { condition: product.full, icon: <Zap className="size-5 text-amarelo-500" strokeWidth={2.5} fill="currentColor" />, text: 'Mercado Livre Full', desc: 'Entrega rápida e confiável' },
    { condition: true, icon: <Shield className="size-5 text-roxo-500" strokeWidth={2.5} />, text: 'Compra segura', desc: 'Proteção do Mercado Livre' },
    { condition: true, icon: <Sparkles className="size-5 text-amarelo-500" strokeWidth={2.5} />, text: 'Garantia do vendedor', desc: product.sellerTag },
  ].filter((b) => b.condition);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <DiscountBadge value={discountOf(product)} />
        {product.full && <Seal kind="full" />}
        {product.freeShipping && <Seal kind="frete" />}
        {!product.available && <Seal kind="indisponivel" />}
      </div>

      <h1 className="text-[26px] leading-tight text-tinta md:text-[32px]">{product.title}</h1>

      <div className="flex flex-wrap items-center gap-3 text-[14px] text-cinza-600">
        <span className="flex items-center gap-1">{product.rating.toFixed(1)}</span>
        <span className="text-tinta">·</span>
        <span>{product.reviews.toLocaleString('pt-BR')} avaliações</span>
        <span className="text-tinta">·</span>
        <span>{product.sold}</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-5">
        <Price p={product} size="lg" />
        <Countdown endsAt={product.endsAt} />
      </div>

      <div className="mt-2 text-[14px] font-bold text-tinta">{installment(product)}</div>

      <ul className="space-y-2 border-t border-lilas-200 pt-4" role="list" aria-label="Benefícios">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="grid h-9 w-9 place-items-center shrink-0 rounded-[12px] bg-lilas-100">{b.icon}</span>
            <div>
              <p className="font-bold text-tinta">{b.text}</p>
              <p className="text-[13px] text-cinza-600">{b.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 pt-2">
        <MLButton product={product} size="lg" full />
        <button
          type="button"
          onClick={handleFav}
          className={cn(
            buttonCls(fav ? 'fantasma' : 'secundario', 'lg'),
            'w-full md:w-auto'
          )}
          aria-pressed={fav}
        >
          {fav ? '✓ Salvo' : '♡ Favoritar'}
        </button>
        <button
          type="button"
          onClick={handleAlert}
          className={cn(buttonCls('fantasma', 'lg'), 'w-full md:w-auto')}
        >
          <Bell className="size-5" strokeWidth={2.5} /> Alerta
        </button>
        <button
          type="button"
          onClick={handleCompare}
          className={cn(buttonCls('fantasma', 'lg'), 'w-full md:w-auto')}
          disabled={inCompare}
        >
          <Scale className="size-5" strokeWidth={2.5} /> Comparar
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-lilas-200 pt-4">
        <UpdatedLine min={product.updatedMin} />
        <a href={to(`/produto/${product.id}`)} className="text-[14px] font-bold text-roxo-700 underline-offset-2 hover:underline">Ver histórico de preço</a>
      </div>

      <AffiliateNote />
    </div>
  );
}