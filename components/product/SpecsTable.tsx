'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/lib/types/product';

interface SpecsTableProps {
  product: Product;
}

export function SpecsTable({ product }: SpecsTableProps) {
  const specs = product.specs;
  const entries = Object.entries(specs);

  if (entries.length === 0) return null;

  return (
    <section aria-labelledby="specs-title" className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5 md:p-8">
      <h2 id="specs-title" className="mb-4 text-[22px] font-bold text-roxo-700">
        Ficha técnica
      </h2>
      <dl className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {entries.map(([key, value], i) => (
          <div key={key} className={cn('flex flex-col gap-0.5 py-2', i >= 2 && 'md:col-span-2')}>
            <dt className="text-[13px] font-bold text-cinza-600 uppercase tracking-[0.08em]">{key}</dt>
            <dd className="text-[15px] font-bold text-tinta">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}