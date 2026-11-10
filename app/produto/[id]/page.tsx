import React from 'react';
import Link from 'next/link';
import { Container, SectionTitle, ProductCard, ProductGrid, EmptyState } from '@/components/ui';
import { getProduct, products } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { PriceHistory } from '@/components/product/PriceHistory';
import { SpecsTable } from '@/components/product/SpecsTable';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { StickyCTA } from '@/components/product/StickyCTA';
import { PriceError } from '@/components/product/PriceError';
import { UnavailableBox } from '@/components/product/UnavailableBox';

export default async function ProductPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ erro?: string }> }) {
  const { id } = await params;
  const { erro } = await searchParams;
  const product = getProduct(id);

  if (!product) {
    return (
      <Container className="py-12">
        <EmptyState
          icon={<svg className="size-12 text-cinza-400" strokeWidth={1.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg>}
          title="Produto não encontrado"
          description="O produto que você procura não existe ou foi removido."
          action={<Link href="/" className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500">Ver ofertas</Link>}
        />
      </Container>
    );
  }

  return (
    <>
      <StickyCTA product={product} />
      <section className="py-8" aria-labelledby="product-title">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-cinza-600" aria-label="Navegação">
            <Link href="/" className="hover:text-roxo-700 hover:underline">Início</Link>
            <span aria-hidden>/</span>
            <Link href={`/categoria/${product.category}`} className="hover:text-roxo-700 hover:underline">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-tinta truncate max-w-[200px]" aria-current="page">{product.title}</span>
          </nav>

          {/* Error states */}
          {erro === 'preco' && <PriceError product={product} />}
          {!product.available && !erro && <UnavailableBox product={product} />}

          {/* Main content */}
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left column */}
            <div className="space-y-8">
              <ProductGallery product={product} />

              {product.available && (
                <>
                  <ProductInfo product={product} />
                  <PriceHistory product={product} />
                  <SpecsTable product={product} />
                </>
              )}

              <RelatedProducts product={product} />
            </div>

            {/* Right column - Sticky CTA for desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5">
                  <div className="mb-4">
                    <p className="text-[13px] text-cinza-600">Preço atual</p>
                    <p className="font-display text-[32px] font-extrabold text-vermelho-500">
                      {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p className="mt-1 text-[14px] font-bold text-tinta">
                      {product.installments > 1
                        ? `ou ${product.installments}x ${(product.price / product.installments).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros`
                        : 'à vista no Pix'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="block w-full text-center"
                    >
                      <button className="w-full h-12 rounded-pill bg-amarelo-500 text-roxo-900 font-display text-[17px] font-extrabold shadow-btn-amarelo hover:bg-amarelo-400 active:translate-y-[1px] active:shadow-none transition-all">
                        Ver oferta no Mercado Livre
                        <svg className="inline size-5 ml-2" strokeWidth={2.75} aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    </a>
                    <div className="flex flex-wrap gap-2">
                      <button className="flex-1 h-11 rounded-pill bg-roxo-700 text-white font-display text-[15px] font-extrabold shadow-btn-roxo hover:bg-roxo-500 active:translate-y-[1px] active:shadow-none transition-all">
                        Compartilhar
                      </button>
                      <button className="flex-1 h-11 rounded-pill bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200 font-display text-[15px] font-extrabold hover:ring-roxo-500">
                        Avaliar
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 flex items-start gap-1.5 text-[12px] text-cinza-600">
                    <svg className="mt-px size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" /></svg>
                    Participamos do Programa de Afiliados do Mercado Livre e podemos receber comissão pelas compras feitas pelos links.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}