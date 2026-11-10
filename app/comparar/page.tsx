'use client';

import React, { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { Container, SectionTitle, EmptyState, Seal, MLButton, Price, AffiliateNote, buttonCls, DiscountBadge } from '@/components/ui';
import { useStore, to } from '@/lib/store';
import { products, money, installment, discountOf } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { cn } from '@/lib/utils/cn';
import { X, ChevronLeft, ChevronRight, Scale, ExternalLink, Truck, Zap, Star, AlertCircle, CheckCircle } from 'lucide-react';

const compareRows = [
  { key: 'price', label: 'Preço', highlight: 'min' as const },
  { key: 'discount', label: 'Desconto', highlight: 'max' as const },
  { key: 'installments', label: 'Parcelamento' },
  { key: 'freeShipping', label: 'Frete grátis', type: 'boolean' as const },
  { key: 'full', label: 'Mercado Livre Full', type: 'boolean' as const },
  { key: 'seller', label: 'Vendedor' },
  { key: 'rating', label: 'Avaliação' },
  { key: 'specs', label: 'Especificações' },
] as const;

function CompareContent() {
  const { compare, toggleCompare } = useStore();

  const compareProducts = useMemo(() => {
    return compare
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
  }, [compare]);

  const getCellValue = (product: Product, rowKey: string) => {
    switch (rowKey) {
      case 'price':
        return money(product.price);
      case 'discount':
        return `-${discountOf(product)}%`;
      case 'installments':
        return installment(product);
      case 'freeShipping':
        return product.freeShipping ? 'Sim' : 'Não';
      case 'full':
        return product.full ? 'Sim' : 'Não';
      case 'seller':
        return product.seller;
      case 'rating':
        return `${product.rating.toFixed(1)} (${product.reviews.toLocaleString('pt-BR')})`;
      case 'specs':
        return Object.entries(product.specs)
          .map(([k, v]) => `${k}: ${v}`)
          .join('; ');
      default:
        return '';
    }
  };

  const getHighlightedIndices = (rowKey: string) => {
    if (compareProducts.length < 2) return new Set<number>();
    if (rowKey !== 'price' && rowKey !== 'discount') return new Set<number>();

    const values = compareProducts.map((p) => {
      if (rowKey === 'price') return p.price;
      return discountOf(p);
    });

    const target = rowKey === 'price' ? Math.min(...values) : Math.max(...values);
    const indices = new Set<number>();
    values.forEach((v, i) => {
      if (v === target) indices.add(i);
    });
    return indices;
  };

  const renderCell = (product: Product, rowKey: string, index: number) => {
    const highlighted = getHighlightedIndices(rowKey).has(index);
    const value = getCellValue(product, rowKey);
    const isBoolean = rowKey === 'freeShipping' || rowKey === 'full';

    if (isBoolean) {
      const boolVal = rowKey === 'freeShipping' ? product.freeShipping : product.full;
      return (
        <div className={cn('p-3 text-center', highlighted && 'bg-amarelo-100')}>
          {boolVal ? (
            <CheckCircle className="mx-auto size-5 text-verde-500" strokeWidth={2.5} />
          ) : (
            <span className="text-cinza-600">Não</span>
          )}
        </div>
      );
    }

    return (
      <div className={cn('p-3 text-center', highlighted && 'bg-amarelo-100 font-bold')}>
        {rowKey === 'price' && <span className="font-display text-[22px] font-extrabold text-vermelho-500">{value}</span>}
        {rowKey === 'discount' && <DiscountBadge value={discountOf(product)} />}
        {rowKey !== 'price' && rowKey !== 'discount' && <span className="text-[14px] text-tinta">{value}</span>}
      </div>
    );
  };

  if (compareProducts.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<Scale className="size-12 text-cinza-400" strokeWidth={1.5} />}
          title="Comparador vazio"
          description='Adicione até 3 produtos para comparar lado a lado. Use o botão "Comparar" nos cards dos produtos.'
          action={<Link href={to('/')} className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500">Ver ofertas</Link>}
        />
      </Container>
    );
  }

  return (
    <Suspense fallback={<div className="h-64" />}>
      <Container className="py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[28px] text-roxo-700 md:text-[36px]">Comparador</h1>
            <p className="mt-1 text-[14px] text-cinza-600">
              {compareProducts.length} de 3 produtos selecionados
            </p>
          </div>
          {compareProducts.length < 3 && (
            <a
              href={to('/')}
              className={cn(buttonCls('fantasma', 'md'), 'whitespace-nowrap')}
            >
              Adicionar mais produtos
            </a>
          )}
        </div>

        <div className="overflow-x-auto rounded-card bg-white shadow-3d ring-1 ring-lilas-200">
          <table className="w-full min-w-[800px]" role="table">
            <thead>
              <tr className="border-b border-lilas-200 bg-lilas-50/50">
                <th className="sticky left-0 z-10 w-40 p-3 text-left font-bold text-roxo-700 bg-white border-r border-lilas-200" scope="col"></th>
                {compareProducts.map((p, i) => (
                  <th key={p.id} className="w-[280px] p-3 text-center" scope="col">
                    <div className="relative flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleCompare(p.id)}
                        className="absolute -top-2 -right-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white text-roxo-500 ring-2 ring-roxo-500 shadow-3d hover:bg-lilas-100"
                        aria-label={`Remover ${p.title} do comparador`}
                      >
                        <X className="size-4" strokeWidth={3} />
                      </button>
                      <img src={p.image} alt="" className="aspect-square w-32 object-cover rounded-[12px]" />
                      <h3 className="text-[15px] font-bold text-tinta line-clamp-2 text-center">{p.title}</h3>
                      <div className="flex items-center justify-center gap-1">
                        {p.full && <Seal kind="full" />}
                        {p.bestSeller && <Seal kind="maisvendido" />}
                      </div>
                      <Price p={p} />
                      <MLButton product={p} size="sm" label="Ver oferta" full />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.key} className="border-b border-lilas-200 last:border-0">
                  <th className="sticky left-0 z-10 w-40 p-3 text-left font-bold text-cinza-600 bg-white border-r border-lilas-200" scope="row">
                    {row.label}
                  </th>
                  {compareProducts.map((p, i) => (
                    <td key={p.id}>{renderCell(p, row.key, i)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {compareProducts.length > 0 && (
          <div className="mt-6 rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5">
            <h2 className="mb-4 text-[18px] font-bold text-roxo-700">Ação rápida</h2>
            <div className="flex flex-wrap gap-3">
              {compareProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-2 w-full sm:w-auto">
                  <img src={p.image} alt="" className="h-12 w-12 rounded-[10px] object-cover" />
                  <span className="font-bold text-tinta line-clamp-1">{p.title}</span>
                  <MLButton product={p} size="sm" label="Ver oferta" />
                </div>
              ))}
            </div>
          </div>
        )}

        <AffiliateNote className="mt-8" />
      </Container>
    </Suspense>
  );
}

export default function ComparePage() {
  return <CompareContent />;
}