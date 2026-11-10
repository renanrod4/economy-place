'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { money } from '@/lib/data/products';
import { X, Truck, Zap } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    precoMin: number;
    precoMax: number;
    descontoMin: number;
    freeShipping: boolean;
    full: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    precoMin: number;
    precoMax: number;
    descontoMin: number;
    freeShipping: boolean;
    full: boolean;
  }>>;
  clearFilters: () => void;
}

const descontoOptions = [10, 20, 30, 40, 50, 60, 70];

export function FilterPanel({ filters, setFilters, clearFilters }: FilterPanelProps) {
  const hasActiveFilters = filters.precoMin > 0 || filters.precoMax < 1500 || filters.descontoMin > 0 || filters.freeShipping || filters.full;

  return (
    <div className="sticky top-28 space-y-6 rounded-card bg-white p-5 shadow-3d ring-1 ring-lilas-200">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-roxo-700">Filtros</h2>
        {hasActiveFilters && (
          <button type="button" onClick={clearFilters} className="text-[13px] font-bold text-roxo-500 hover:underline">
            Limpar tudo
          </button>
        )}
      </div>

      <div className="border-t border-lilas-200 pt-4" />

      {/* Preço */}
      <fieldset className="space-y-3">
        <legend className="text-[14px] font-bold text-tinta">Preço</legend>
        <div className="flex items-center gap-2 text-[13px] text-cinza-600">
          <span className="w-16 text-right font-bold text-tinta">{money(filters.precoMin)}</span>
          <input
            type="range"
            min={0}
            max={1500}
            step={10}
            value={filters.precoMin}
            onChange={(e) => setFilters((f) => ({ ...f, precoMin: Math.min(Number(e.target.value), f.precoMax) }))}
            className="flex-1 h-2 appearance-none rounded-full bg-lilas-200 accent-roxo-500"
          />
          <span className="w-16 font-bold text-tinta">{money(filters.precoMax)}</span>
          <input
            type="range"
            min={0}
            max={1500}
            step={10}
            value={filters.precoMax}
            onChange={(e) => setFilters((f) => ({ ...f, precoMax: Math.max(Number(e.target.value), f.precoMin) }))}
            className="flex-1 h-2 appearance-none rounded-full bg-lilas-200 accent-roxo-500"
          />
        </div>
      </fieldset>

      <div className="border-t border-lilas-200" />

      {/* Desconto mínimo */}
      <fieldset className="space-y-3">
        <legend className="text-[14px] font-bold text-tinta">Desconto mínimo</legend>
        <div className="no-scrollbar flex flex-wrap gap-2" role="radiogroup" aria-label="Desconto mínimo">
          <button
            type="button"
            role="radio"
            aria-checked={filters.descontoMin === 0}
            onClick={() => setFilters((f) => ({ ...f, descontoMin: 0 }))}
            className={cn(
              'h-9 rounded-pill px-4 text-[14px] font-bold transition-colors',
              filters.descontoMin === 0 ? 'bg-roxo-700 text-white shadow-btn-roxo' : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200 hover:ring-roxo-500'
            )}
          >
            Qualquer
          </button>
          {descontoOptions.map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={filters.descontoMin === d}
              onClick={() => setFilters((f) => ({ ...f, descontoMin: d }))}
              className={cn(
                'h-9 rounded-pill px-4 text-[14px] font-bold transition-colors',
                filters.descontoMin === d ? 'bg-roxo-700 text-white shadow-btn-roxo' : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200 hover:ring-roxo-500'
              )}
            >
              {d}%+
            </button>
          ))}
        </div>
      </fieldset>

      <div className="border-t border-lilas-200" />

      {/* Benefícios */}
      <fieldset className="space-y-3">
        <legend className="text-[14px] font-bold text-tinta">Benefícios</legend>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.freeShipping}
            onChange={(e) => setFilters((f) => ({ ...f, freeShipping: e.target.checked }))}
            className="h-5 w-5 rounded-campo border-lilas-200 text-roxo-700 focus:ring-roxo-500 accent-roxo-500"
          />
          <span className="flex items-center gap-1.5 text-[14px] font-bold text-tinta">
            <Truck className="size-5 text-verde-500" strokeWidth={2.5} />
            Frete grátis
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.full}
            onChange={(e) => setFilters((f) => ({ ...f, full: e.target.checked }))}
            className="h-5 w-5 rounded-campo border-lilas-200 text-roxo-700 focus:ring-roxo-500 accent-roxo-500"
          />
          <span className="flex items-center gap-1.5 text-[14px] font-bold text-tinta">
            <Zap className="size-5 text-amarelo-500" strokeWidth={2.5} fill="currentColor" />
            Mercado Livre Full
          </span>
        </label>
      </fieldset>
    </div>
  );
}