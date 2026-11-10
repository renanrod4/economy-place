'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, ProductCard, ProductGrid, SectionTitle, EmptyState, Chip, Seal } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { useStore, to } from '@/lib/store';
import { products, categories, discountOf, money, installment } from '@/lib/data/products';
import type { Product, Category } from '@/lib/types/product';
import { FilterPanel } from './FilterPanel';
import { FilterSheet } from './FilterSheet';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';

interface ListingContentProps {
  cat?: string;
  query?: string;
}

const ITEMS_PER_PAGE = 8;

function normalize(str: string) {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function ListingContent({ cat, query = '' }: ListingContentProps) {
  const { favorites, compare, isFavorite, toggleFavorite, toggleCompare } = useStore();
  const [sort, setSort] = useState<'desconto' | 'preco' | 'vendidos'>('desconto');
  const [filters, setFilters] = useState({
    precoMin: 0,
    precoMax: 1500,
    descontoMin: 0,
    freeShipping: false,
    full: false,
  });
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset page when filters/sort/cat/query change
  useEffect(() => {
    // Filter changes must return the paginated list to its first page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [cat, query, filters, sort]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (cat && cat !== 'todas') {
      list = list.filter((p) => p.category === cat);
    }

    if (query) {
      const q = normalize(query);
      list = list.filter(
        (p) =>
          normalize(p.title).includes(q) ||
          normalize(p.category).includes(q) ||
          Object.values(p.specs).some((v) => normalize(v).includes(q))
      );
    }

    list = list.filter(
      (p) =>
        p.price >= filters.precoMin &&
        p.price <= filters.precoMax &&
        discountOf(p) >= filters.descontoMin &&
        (!filters.freeShipping || p.freeShipping) &&
        (!filters.full || p.full)
    );

    list.sort((a, b) => {
      if (sort === 'desconto') return discountOf(b) - discountOf(a);
      if (sort === 'preco') return a.price - b.price;
      return (b.reviews + b.sold.length) - (a.reviews + a.sold.length);
    });

    return list;
  }, [cat, query, filters, sort]);

  const displayedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = displayedProducts.length < filteredProducts.length;
  const activeFiltersCount = Object.values(filters).filter((v) => (typeof v === 'number' ? v > 0 : v)).length;

  const catInfo = cat ? categories.find((c) => c.id === cat) : null;

  const clearFilters = useCallback(() => {
    setFilters({ precoMin: 0, precoMax: 1500, descontoMin: 0, freeShipping: false, full: false });
  }, []);

  const sortOptions = [
    { value: 'desconto', label: 'Maior desconto' },
    { value: 'preco', label: 'Menor preço' },
    { value: 'vendidos', label: 'Mais vendidos' },
  ];

  return (
    <section className="py-8" aria-labelledby="listing-title">
      <Container>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 id="listing-title" className="text-[28px] text-roxo-700 md:text-[36px]">
              {cat ? (catInfo?.label || cat) : query ? `Resultados para "${query}"` : 'Todas as ofertas'}
            </h1>
            <p className="mt-1 text-[14px] text-cinza-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'inline-flex h-11 items-center gap-2 rounded-pill px-4 text-[15px] font-bold',
                showFilters
                  ? 'bg-roxo-700 text-white shadow-btn-roxo'
                  : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200'
              )}
            >
              <SlidersHorizontal className="size-4" strokeWidth={2.5} />
              Filtros {activeFiltersCount > 0 && <span className="h-5 min-w-5 rounded-pill bg-amarelo-500 text-[11px] font-extrabold text-roxo-900">{activeFiltersCount}</span>}
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="appearance-none h-11 rounded-pill bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200 pr-10 pl-4 text-[15px] font-bold focus:ring-roxo-500"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-cinza-600 pointer-events-none" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {showFilters && !isMobile && (
          <div className="mb-5 flex justify-end">
            <button type="button" onClick={clearFilters} className="text-[14px] font-bold text-roxo-700 hover:underline">
              Limpar filtros
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block" aria-label="Filtros">
            <FilterPanel filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
          </aside>

          {/* Main Content */}
          <div>
            {filteredProducts.length === 0 ? (
              <EmptyState
                icon={<X className="size-12 text-cinza-400" strokeWidth={1.5} />}
                title="Nenhuma oferta encontrada"
                description={cat
                  ? `Não temos ofertas na categoria "${catInfo?.label || cat}" no momento.`
                  : query
                  ? `Sua busca por "${query}" não retornou resultados.`
                  : 'Não há ofertas cadastradas.'}
                action={
                  <a href={to('/')} className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500">
                    Ver todas as ofertas
                  </a>
                }
              />
            ) : (
              <>
                <ProductGrid cols={5}>
                  {displayedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      p={p}
                      state={isFavorite(p.id) ? 'favoritado' : undefined}
                    />
                  ))}
                </ProductGrid>

                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setPage((p) => p + 1)}
                      className="inline-flex h-12 items-center gap-2 rounded-pill bg-white px-8 text-[17px] font-bold text-roxo-700 ring-2 ring-inset ring-lilas-200 hover:ring-roxo-500"
                    >
                      Carregar mais ({filteredProducts.length - displayedProducts.length} restantes)
                      <ChevronDown className="size-4" strokeWidth={2.5} />
                    </button>
                  </div>
                )}

                {!hasMore && displayedProducts.length > 0 && (
                  <p className="mt-8 text-center text-[14px] text-cinza-600">Fim da lista — {displayedProducts.length} ofertas exibidas</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        {isMobile && showFilters && (
          <FilterSheet
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </Container>
    </section>
  );
}