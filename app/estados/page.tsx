'use client';

import React from 'react';
import Link from 'next/link';
import { Container, SectionTitle, EmptyState, ProductCardSkeleton, DiscountBadge, Seal, Price, MLButton, buttonCls, UpdatedLine } from '@/components/ui';
import { products, money, discountOf } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { to } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { X, RotateCcw, AlertCircle, Shield, Truck, Zap, Bell, Search } from 'lucide-react';
import { ProductGallery } from '@/components/product/ProductGallery';

export default function StatesPage() {
  // Unavailable product
  const unavailableProduct = products.find((p) => !p.available) || products[0];

  // Error product (simulated)
  const errorProduct = products[0];

  // Skeleton count
  const skeletonCount = 8;

  return (
    <Container className="py-12 space-y-16">
      {/* 1. Empty Search */}
      <section aria-labelledby="empty-search-title">
        <h2 id="empty-search-title" className="mb-6 text-[28px] font-bold text-roxo-700">Busca sem resultados</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-8">
          <EmptyState
            icon={<Search className="size-12 text-cinza-400" strokeWidth={1.5} />}
            title="Nenhuma oferta encontrada"
            description='Sua busca por "produto inexistente xyz" não retornou resultados. Tente termos mais genéricos ou verifique a ortografia.'
            action={
              <Link href="/" className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500">
                Ver todas as ofertas
              </Link>
            }
          />
        </div>
      </section>

      {/* 2. Unavailable Product */}
      <section aria-labelledby="unavailable-title">
        <h2 id="unavailable-title" className="mb-6 text-[28px] font-bold text-roxo-700">Produto indisponível</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <ProductGallery product={unavailableProduct} />
              <div className="rounded-card bg-white shadow-3d ring-2 ring-laranja-500 p-5" role="status" aria-live="polite">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-laranja-100">
                    <svg className="size-8 text-laranja-500" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold text-laranja-700">Produto indisponível no momento</h3>
                    <p className="mt-2 max-w-md text-[15px] text-cinza-600">
                      Este produto não está disponível para compra no Mercado Livre no momento. Podemos te avisar quando voltar ao estoque.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button type="button" className={buttonCls('secundario', 'md', 'w-full')}>
                      <Bell className="size-5" strokeWidth={2.5} /> Me avise quando voltar
                    </button>
                    <Link href={to(`/busca?q=${encodeURIComponent(unavailableProduct.title)}`)} className={buttonCls('fantasma', 'md', 'w-full')}>
                      Ver produtos similares
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5">
                  <div className="mb-4">
                    <p className="text-[13px] text-cinza-600">Preço anterior</p>
                    <p className="font-display text-[32px] font-extrabold text-cinza-600 line-through">{money(unavailableProduct.oldPrice)}</p>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full h-12 rounded-pill bg-laranja-500 text-white font-display text-[17px] font-extrabold shadow-[0_4px_0_#c97700] hover:bg-laranja-400 active:translate-y-[1px] active:shadow-none transition-all opacity-50 cursor-not-allowed">
                      Indisponível
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Price Load Error */}
      <section aria-labelledby="price-error-title">
        <h2 id="price-error-title" className="mb-6 text-[28px] font-bold text-roxo-700">Erro ao carregar preço</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <ProductGallery product={errorProduct} />
              <div className="rounded-card bg-white shadow-3d ring-2 ring-vermelho-500 p-5" role="alert" aria-live="assertive">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-vermelho-100">
                    <AlertCircle className="size-8 text-vermelho-500" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold text-vermelho-700">Não foi possível carregar o preço</h3>
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
                      href={errorProduct.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className={cn(buttonCls('fantasma', 'md', 'w-full'), 'text-vermelho-700 ring-vermelho-500/30 hover:bg-vermelho-50')}
                    >
                      Ver no Mercado Livre
                      <svg className="inline size-4 ml-2" strokeWidth={2.75} aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5">
                  <div className="mb-4">
                    <p className="text-[13px] text-cinza-600">Preço atual</p>
                    <p className="font-display text-[32px] font-extrabold text-vermelho-500">—</p>
                    <p className="mt-1 text-[14px] font-bold text-tinta">Erro ao carregar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Loading Skeletons */}
      <section aria-labelledby="skeleton-title">
        <h2 id="skeleton-title" className="mb-6 text-[28px] font-bold text-roxo-700">Estados de carregamento (Skeletons)</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-8">
          <h3 className="mb-4 text-[18px] font-bold text-tinta">ProductGrid com skeletons</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>

          <h3 className="mt-10 mb-4 text-[18px] font-bold text-tinta">Hero com skeleton</h3>
          <div className="relative overflow-hidden bg-gradient-to-br from-roxo-900 via-roxo-700 to-roxo-500 text-white rounded-[24px] p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4 max-w-xl">
                <div className="shimmer h-8 w-48 rounded-pill" />
                <div className="shimmer h-10 w-3/4 rounded-[4px]" />
                <div className="shimmer h-6 w-1/2 rounded-[4px]" />
                <div className="shimmer h-8 w-1/3 rounded-[4px]" />
                <div className="flex gap-3">
                  <div className="shimmer h-12 w-40 rounded-pill" />
                  <div className="shimmer h-12 w-40 rounded-pill" />
                </div>
              </div>
              <div className="relative mx-auto hidden h-[400px] w-full max-w-[420px] lg:block">
                <div className="absolute left-1/2 top-1/2 z-10 grid size-[200px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <div className="shimmer size-full rounded-full" />
                </div>
                <div className="absolute -left-4 top-0 -rotate-6 w-[140px] rounded-card bg-white p-2.5">
                  <div className="shimmer aspect-[4/3] rounded-[12px]" />
                  <div className="shimmer mt-2 h-4 w-3/4 rounded-pill" />
                  <div className="shimmer mt-1 h-6 w-1/2 rounded-pill" />
                </div>
              </div>
            </div>
          </div>

          <h3 className="mt-10 mb-4 text-[18px] font-bold text-tinta">ProductCard skeleton (individual)</h3>
          <ProductCardSkeleton />
        </div>
      </section>

      {/* 5. Network Error */}
      <section aria-labelledby="network-error-title">
        <h2 id="network-error-title" className="mb-6 text-[28px] font-bold text-roxo-700">Erro de conexão</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-8 text-center">
          <div className="grid h-20 w-20 place-items-center mx-auto rounded-full bg-vermelho-100">
            <svg className="size-10 text-vermelho-500" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 1l22 22" />
              <path d="M16.72 11.06A10.94 10.94 0 0 1 12 18.96a10.94 10.94 0 0 1-4.72-7.9" />
              <path d="M5 12.96a10.94 10.94 0 0 1 5.28-3.58" />
              <path d="M19 7.04a10.94 10.94 0 0 0-5.28 3.58" />
            </svg>
          </div>
          <h3 className="mt-4 text-[22px] font-bold text-tinta">Sem conexão</h3>
          <p className="mt-2 max-w-md mx-auto text-[15px] text-cinza-600">
            Não foi possível carregar os dados. Verifique sua conexão com a internet e tente novamente.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500"
          >
            <RotateCcw className="size-5" strokeWidth={2.5} /> Tentar novamente
          </button>
        </div>
      </section>
    </Container>
  );
}