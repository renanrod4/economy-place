'use client';

import React from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { money } from '@/lib/data/products';
import { X, Truck, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSheetProps {
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
  onClose: () => void;
}

const descontoOptions = [10, 20, 30, 40, 50, 60, 70];

export function FilterSheet({ filters, setFilters, clearFilters, onClose }: FilterSheetProps) {
  const hasActiveFilters = filters.precoMin > 0 || filters.precoMax < 1500 || filters.descontoMin > 0 || filters.freeShipping || filters.full;
  const [openSection, setOpenSection] = React.useState<string | null>('preco');

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative bg-white rounded-t-[24px] shadow-[0_-10px_30px_rgba(0,0,0,.15)] max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-lilas-200">
          <h2 className="text-[17px] font-bold text-roxo-700">Filtros</h2>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button type="button" onClick={clearFilters} className="text-[13px] font-bold text-roxo-500">
                Limpar tudo
              </button>
            )}
            <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-pill bg-lilas-100 text-roxo-700 hover:bg-lilas-200">
              <X className="size-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-[calc(4rem+env(safe-area-inset-bottom))]">
          {/* Preço */}
          <div className="rounded-card bg-white ring-1 ring-lilas-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('preco')}
              className="w-full flex items-center justify-between p-4 text-left"
              aria-expanded={openSection === 'preco'}
            >
              <span className="flex items-center gap-2 text-[15px] font-bold text-tinta">
                <span className="grid h-8 w-8 place-items-center rounded-pill bg-lilas-100 text-roxo-700">
                  <span className="text-[18px]">R$</span>
                </span>
                Preço
              </span>
              {openSection === 'preco' ? <ChevronUp className="size-5 text-cinza-600" strokeWidth={2.5} /> : <ChevronDown className="size-5 text-cinza-600" strokeWidth={2.5} />}
            </button>
            {openSection === 'preco' && (
              <div className="border-t border-lilas-200 p-4 space-y-4">
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
              </div>
            )}
          </div>

          {/* Desconto mínimo */}
          <div className="rounded-card bg-white ring-1 ring-lilas-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('desconto')}
              className="w-full flex items-center justify-between p-4 text-left"
              aria-expanded={openSection === 'desconto'}
            >
              <span className="flex items-center gap-2 text-[15px] font-bold text-tinta">
                <span className="grid h-8 w-8 place-items-center rounded-pill bg-lilas-100 text-roxo-700">
                  <span className="text-[18px] font-display">%</span>
                </span>
                Desconto mínimo
              </span>
              {openSection === 'desconto' ? <ChevronUp className="size-5 text-cinza-600" strokeWidth={2.5} /> : <ChevronDown className="size-5 text-cinza-600" strokeWidth={2.5} />}
            </button>
            {openSection === 'desconto' && (
              <div className="border-t border-lilas-200 p-4">
                <div className="no-scrollbar flex flex-wrap gap-2" role="radiogroup" aria-label="Desconto mínimo">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={filters.descontoMin === 0}
                    onClick={() => setFilters((f) => ({ ...f, descontoMin: 0 }))}
                    className={cn(
                      'h-9 rounded-pill px-4 text-[14px] font-bold transition-colors',
                      filters.descontoMin === 0 ? 'bg-roxo-700 text-white shadow-btn-roxo' : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200'
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
                        filters.descontoMin === d ? 'bg-roxo-700 text-white shadow-btn-roxo' : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200'
                      )}
                    >
                      {d}%+
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Benefícios */}
          <div className="rounded-card bg-white ring-1 ring-lilas-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('beneficios')}
              className="w-full flex items-center justify-between p-4 text-left"
              aria-expanded={openSection === 'beneficios'}
            >
              <span className="flex items-center gap-2 text-[15px] font-bold text-tinta">
                <span className="grid h-8 w-8 place-items-center rounded-pill bg-lilas-100 text-roxo-700">
                  <Zap className="size-5" strokeWidth={2.5} fill="currentColor" />
                </span>
                Benefícios
              </span>
              {openSection === 'beneficios' ? <ChevronUp className="size-5 text-cinza-600" strokeWidth={2.5} /> : <ChevronDown className="size-5 text-cinza-600" strokeWidth={2.5} />}
            </button>
            {openSection === 'beneficios' && (
              <div className="border-t border-lilas-200 p-4 space-y-3">
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
              </div>
            )}
          </div>

          {/* Aplicar */}
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-pill bg-roxo-700 text-white font-display text-[17px] font-extrabold shadow-btn-roxo hover:bg-roxo-500"
          >
            Ver resultados
          </button>
        </div>
      </div>
    </div>
  );
}