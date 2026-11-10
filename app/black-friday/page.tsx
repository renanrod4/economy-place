'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Container, Chip, Seal, DiscountBadge, MLButton, Price, SectionTitle, ProductGrid, ProductCard, AffiliateNote, buttonCls } from '@/components/ui';
import { products, categories, discountOf, money, blackFridayEnd } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { useStore, to } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { Countdown } from '@/components/ui/Countdown';
import { ArrowLeft, Heart, Percent, Sparkles } from 'lucide-react';

const bfCategories = ['todas', ...categories.map((c) => c.id)] as const;
type BFCategory = (typeof bfCategories)[number];

export function CampaignHeader() {
  return (
    <header className="relative z-40 bg-[#1b0433] text-white shadow-[0_4px_0_rgba(10,0,24,.35)]">
      <div className="h-2 bg-[repeating-linear-gradient(135deg,#ffc20e_0_16px,#ffc20e_16px_25px,#3b0a73_25px_34px,#3b0a73_34px_43px)]" aria-hidden />
      <Container className="flex h-[70px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 rounded-pill" aria-label="Economy Place — voltar ao site">
          <img src="/assets/logo-economy-place.png" alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white/30" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[20px] font-extrabold tracking-tight text-white">Economy Place</span>
            <span className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amarelo-400">Black Friday</span>
          </span>
        </Link>
        <nav aria-label="Atalhos" className="flex items-center gap-5">
          <Link href="/" className="hidden items-center gap-1.5 text-[14px] font-bold text-white/85 hover:text-white sm:flex">
            <ArrowLeft className="size-4" /> Voltar ao site
          </Link>
          <Link href={to('/favoritos')} className="relative flex h-11 min-w-11 items-center justify-center rounded-pill text-white hover:text-amarelo-400" aria-label="Favoritos">
            <Heart className="size-6" strokeWidth={2.25} />
          </Link>
        </nav>
      </Container>
    </header>
  );
}

function CampaignContent() {
  const { favorites, isFavorite, toggleFavorite } = useStore();
  const [activeCat, setActiveCat] = useState<BFCategory>('todas');

  const bfProducts = React.useMemo(() => {
    let list = products.filter((p) => p.available);
    if (activeCat !== 'todas') {
      list = list.filter((p) => p.category === activeCat);
    }
    return list.sort((a, b) => discountOf(b) - discountOf(a));
  }, [activeCat]);

  const bfEnd = blackFridayEnd();

  return (
    <>
      <CampaignHeader />
      <main id="conteudo" className="pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_8%_35%,#55129a_0%,#1b0433_52%,#28004d_100%)] text-white">
          <div className="pointer-events-none absolute -left-24 top-28 size-[420px] rounded-full bg-roxo-500/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-32 top-10 size-[520px] rounded-full bg-roxo-700/25 blur-3xl" aria-hidden />
          <span className="absolute left-[8%] top-12 rotate-[-12deg] rounded-[12px] bg-vermelho-500 px-4 py-2 font-display text-[28px] font-extrabold text-white shadow-[0_6px_0_#9e150d] md:text-[34px]" aria-hidden>-60%</span>
          <span className="absolute right-[8%] top-16 rotate-[10deg] rounded-[12px] bg-vermelho-500 px-4 py-2 font-display text-[28px] font-extrabold text-white shadow-[0_6px_0_#9e150d] md:text-[34px]" aria-hidden>-45%</span>
          <span className="absolute bottom-10 right-[20%] rotate-[-8deg] rounded-[12px] bg-vermelho-500 px-4 py-2 font-display text-[28px] font-extrabold text-white shadow-[0_6px_0_#9e150d] md:text-[34px]" aria-hidden>-38%</span>
          <Container className="relative flex min-h-[650px] flex-col items-center justify-center py-16 text-center md:min-h-[700px]">
            <span className="inline-flex h-9 items-center gap-2 rounded-pill bg-amarelo-500 px-4 text-[14px] font-extrabold text-roxo-900">
              <Sparkles className="size-4" strokeWidth={3} /> Seleção oficial Economy Place
            </span>
            <h1 className="mt-6 font-display text-[72px] font-extrabold leading-[0.82] tracking-tight md:text-[112px]">
              <span className="block text-white">BLACK</span>
              <em className="mt-2 block text-amarelo-500">FRIDAY</em>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-white/85 md:text-[20px]">
              Até <strong className="text-amarelo-400">43% off</strong> em casa, cozinha, beleza e viagem. Só ofertas com histórico conferido: nada de “metade do dobro”.
            </p>
            <div className="mt-8 rounded-card bg-white/10 p-5 ring-1 ring-white/15">
              <Countdown endsAt={bfEnd} onDark source="oficial da campanha no Mercado Livre" />
            </div>
            <Link href="#ofertas" className="mt-7 inline-flex h-14 items-center gap-2 rounded-pill bg-amarelo-500 px-8 font-display text-[18px] font-extrabold text-roxo-900 shadow-btn-amarelo hover:bg-amarelo-400">
              <Percent className="size-5" strokeWidth={3} /> Ver ofertas da Black Friday
            </Link>
          </Container>
        </section>

        {/* Verified prices badge */}
        <div className="relative z-10 bg-amarelo-500 px-4 py-3 text-center text-roxo-900 font-display text-[16px] font-extrabold shadow-[0_3px_0_#c98f00]">
          <Sparkles className="mr-1 inline size-4" strokeWidth={3} /> Preços verificados de hora em hora · Compare com o histórico de 90 dias
        </div>

        {/* Category chips */}
        <section id="ofertas" className="py-8" aria-labelledby="bf-cats-title">
          <Container>
            <h2 id="bf-cats-title" className="sr-only">Filtrar por categoria</h2>
            <div className="no-scrollbar flex gap-3 overflow-x-auto" role="tablist" aria-label="Categorias Black Friday">
              {bfCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCat === cat}
                  onClick={() => setActiveCat(cat)}
                  className={cn(
                    'shrink-0 h-11 rounded-pill px-4 text-[15px] font-bold transition-colors',
                    activeCat === cat
                      ? 'bg-roxo-700 text-white shadow-btn-roxo'
                      : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200 hover:ring-roxo-500'
                  )}
                >
                  {cat === 'todas' ? 'Todas' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Product grid */}
        <section className="pb-14" aria-labelledby="bf-offers-title">
          <Container>
            <SectionTitle
              eyebrow={`Black Friday ${activeCat === 'todas' ? '' : `· ${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}`}`}
              title={activeCat === 'todas' ? 'Ofertas da Black Friday' : `Ofertas em ${activeCat.charAt(0).toUpperCase() + activeCat.slice(1)}`}
            />
            {bfProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-cinza-600">Nenhuma oferta nesta categoria no momento.</p>
              </div>
            ) : (
              <ProductGrid cols={5}>
                {bfProducts.map((p) => (
                  <ProductCard key={p.id} p={p} state={isFavorite(p.id) ? 'favoritado' : undefined} />
                ))}
              </ProductGrid>
            )}
          </Container>
        </section>

        <AffiliateNote className="mx-auto max-w-[1200px] px-4 pb-12" onDark />
      </main>
    </>
  );
}

export default function CampaignPage() {
  return (
    <Suspense fallback={<div className="h-64" />}>
      <CampaignContent />
    </Suspense>
  );
}