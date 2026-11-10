'use client';

import React from 'react';
import { to } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Sofa, CookingPot, Sparkles, Plane, BadgeCheck, TrendingDown, Clock } from 'lucide-react';
import { products, categories, guides, discountOf, money } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import {
  Container, SectionTitle, ProductCard, ProductGrid, DiscountBadge, Seal, MLButton, AffiliateNote,
  buttonCls, LogoMark, Price, UpdatedLine,
} from '@/components/ui';
import { Countdown } from '@/components/ui/Countdown';
import { FavButton } from '@/components/ui/FavButton';

const cx = cn;

export const catIcon = { casa: Sofa, cozinha: CookingPot, beleza: Sparkles, viagem: Plane };
const catTint = {
  casa: 'bg-lilas-100 text-roxo-700',
  cozinha: 'bg-amarelo-400 text-roxo-900',
  beleza: 'bg-[#FFE3D6] text-[#8A2A00]',
  viagem: 'bg-verde-100 text-verde-700',
};

export function Hero() {
  const stack = [products[0], products[14], products[5]];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-roxo-900 via-roxo-700 to-roxo-500 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-roxo-500/50 blur-0" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[360px] rounded-full bg-amarelo-500/15" aria-hidden />
      <Container className="relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <span className="inline-flex h-8 items-center gap-2 rounded-pill bg-white/12 px-3 text-[13px] font-bold ring-1 ring-white/25">
            <BadgeCheck className="size-4 text-amarelo-400" /> 1.248 ofertas verificadas hoje
          </span>
          <h1 className="mt-5 text-[44px] leading-[0.98] tracking-tight md:text-[64px] lg:text-[72px]">
            Achadinhos que <em className="font-extrabold text-amarelo-400">cabem no seu bolso</em>
          </h1>
          <p className="mt-5 max-w-lg text-[17px] text-white/85 md:text-[19px]">
            Garimpamos as melhores promoções do Mercado Livre todos os dias. Você compara, escolhe e finaliza a compra direto por lá.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={to('/categoria/todas')} className={buttonCls('primario', 'lg')}>
              Ver ofertas de hoje <ArrowRight className="size-5" strokeWidth={3} />
            </a>
            <a href={to('/alertas')} className={buttonCls('fantasma-claro', 'lg')}>Criar alerta de preço</a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-bold text-white/85">
            <li className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-amarelo-400" /> Compra segura no Mercado Livre</li>
            <li className="flex items-center gap-1.5"><TrendingDown className="size-4 text-amarelo-400" /> Histórico de preço real</li>
          </ul>
        </div>
        <div className="relative mx-auto hidden h-[440px] w-full max-w-[460px] md:block" aria-hidden>
          <div className="absolute left-1/2 top-1/2 z-10 grid size-[260px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
            <LogoMark size={200} decorative className="float-y drop-shadow-[0_14px_0_rgba(0,0,0,.18)]" />
          </div>
          {stack.map((p, i) => (
            <div
              key={p.id}
              className={cx(
                'absolute w-[160px] rounded-card bg-white p-2.5 text-tinta shadow-[0_8px_0_rgba(0,0,0,.2)]',
                ['-left-4 top-0 -rotate-6', '-right-4 top-16 rotate-6', 'bottom-0 left-6 -rotate-3'][i],
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-neutro-img">
                <img src={p.image} alt="" className="size-full object-cover" />
                <DiscountBadge value={discountOf(p)} className="absolute left-2 top-2 h-7 text-[16px]" />
              </div>
              <p className="mt-2 line-clamp-1 text-[13px] font-bold">{p.title}</p>
              <p className="font-display text-[22px] font-extrabold leading-none text-vermelho-500">{money(p.price)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CategoryStrip() {
  return (
    <Container className="relative z-10 -mt-8">
      <nav aria-label="Categorias" className="no-scrollbar flex gap-3 overflow-x-auto rounded-card bg-white p-3 shadow-3d ring-1 ring-lilas-200 md:grid md:grid-cols-4 md:overflow-visible md:p-4">
        {categories.map((c) => {
          const I = catIcon[c.id];
          return (
            <a key={c.id} href={to(`/categoria/${c.id}`)} className="group flex min-w-[150px] items-center gap-3 rounded-[14px] p-2 hover:bg-lilas-100">
              <span className={cx('grid size-14 shrink-0 place-items-center rounded-[16px] shadow-3d-sm transition-transform group-hover:-rotate-6', catTint[c.id])}>
                <I className="size-7" strokeWidth={2.25} />
              </span>
              <span>
                <span className="block font-display text-[19px] font-extrabold leading-tight text-roxo-700">{c.label}</span>
                <span className="text-[13px] text-cinza-600">{c.count} ofertas</span>
              </span>
            </a>
          );
        })}
      </nav>
    </Container>
  );
}

export function DealOfDay({ p }: { p: Product }) {
  return (
    <article className="grid overflow-hidden rounded-[24px] bg-white shadow-3d-lg ring-2 ring-amarelo-500 md:grid-cols-[1fr_1.15fr]">
      <div className="relative bg-neutro-img">
        <img src={p.image} alt={p.title} className="aspect-square size-full object-cover md:aspect-auto" />
        <span className="absolute left-4 top-4 inline-flex h-9 items-center gap-1.5 rounded-pill bg-amarelo-500 px-4 font-display text-[17px] font-extrabold text-roxo-900 shadow-btn-amarelo">
          <Sparkles className="size-4" strokeWidth={3} /> Achadinho do dia
        </span>
        <FavButton id={p.id} className="absolute right-4 top-4" />
      </div>
      <div className="flex flex-col gap-4 p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <DiscountBadge value={discountOf(p)} />
          <Seal kind="menorpreco" />
          {p.full && <Seal kind="full" />}
          {p.freeShipping && <Seal kind="frete" />}
        </div>
        <h3 className="text-[26px] leading-tight text-tinta md:text-[32px]">
          <a href={to(`/produto/${p.id}`)} className="hover:text-roxo-700 hover:underline">{p.title}</a>
        </h3>
        <ul className="space-y-1.5 text-[14.5px] text-tinta">
          <li className="flex gap-2"><BadgeCheck className="size-5 shrink-0 text-roxo-500" /> Menor preço que vimos nos últimos 90 dias</li>
          <li className="flex gap-2"><BadgeCheck className="size-5 shrink-0 text-roxo-500" /> Nota {p.rating.toLocaleString('pt-BR')} com {p.reviews.toLocaleString('pt-BR')} avaliações · {p.sold}</li>
          <li className="flex gap-2"><BadgeCheck className="size-5 shrink-0 text-roxo-500" /> Vendido por {p.seller} ({p.sellerTag})</li>
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Price p={p} size="lg" />
          <Countdown endsAt={p.endsAt} />
        </div>
        <div className="mt-auto">
          <MLButton product={p} size="lg" full />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <UpdatedLine min={p.updatedMin} />
            <a href={to(`/produto/${p.id}`)} className="text-[14px] font-bold text-roxo-700 underline-offset-2 hover:underline">Ver histórico de preço</a>
          </div>
          <AffiliateNote className="mt-3" />
        </div>
      </div>
    </article>
  );
}

export function WeekCarousel() {
  const ref = React.useRef<HTMLDivElement>(null);
  const list = [...products].sort((a, b) => discountOf(b) - discountOf(a)).slice(0, 10);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <section className="py-12" aria-roledescription="carrossel" aria-label="Ofertas da semana">
      <Container>
        <SectionTitle
          eyebrow="Atualizado toda segunda"
          title="Ofertas da semana"
          action={
            <div className="flex gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Ofertas anteriores" className="grid size-11 place-items-center rounded-pill bg-white text-roxo-700 shadow-3d-sm ring-2 ring-lilas-200 hover:ring-roxo-500"><ChevronLeft className="size-5" strokeWidth={3} /></button>
              <button type="button" onClick={() => scroll(1)} aria-label="Próximas ofertas" className="grid size-11 place-items-center rounded-pill bg-roxo-700 text-white shadow-btn-roxo hover:bg-roxo-500"><ChevronRight className="size-5" strokeWidth={3} /></button>
            </div>
          }
        />
      </Container>
      <div ref={ref} className="no-scrollbar mx-auto flex max-w-[1200px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 pt-1 md:scroll-px-6 md:px-6">
        {list.map((p) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc(20%-13px)]">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhatsAppBanner() {
  return (
    <section className="bg-amarelo-500">
      <Container className="flex flex-col items-start gap-5 py-8 md:flex-row md:items-center">
        <span className="grid size-16 shrink-0 place-items-center rounded-[20px] bg-roxo-700 text-amarelo-400 shadow-btn-roxo">
          <MessageCircle className="size-8" strokeWidth={2.4} />
        </span>
        <div className="flex-1">
          <h2 className="text-[26px] text-roxo-900 md:text-[32px]">Receba alertas de queda de preço no WhatsApp</h2>
          <p className="text-[15px] text-roxo-900/85">Escolha o produto e o preço que você quer pagar. A gente avisa quando chegar lá. Sem spam, cancele quando quiser.</p>
        </div>
        <a href={to('/alertas')} className={buttonCls('secundario', 'lg', 'max-md:w-full')}>Quero receber alertas</a>
      </Container>
    </section>
  );
}

export function Guides() {
  return (
    <section id="guias" className="scroll-mt-40 py-12">
      <Container>
        <SectionTitle eyebrow="Compre sem errar" title="Guias de compra" action={<a href={to('/')} className="hidden text-[15px] font-bold text-roxo-700 hover:underline md:block">Ver todos os guias</a>} />
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((g) => (
            <a key={g.id} href={to('/')} className="group overflow-hidden rounded-card bg-white shadow-3d ring-1 ring-lilas-200 transition-transform hover:-translate-y-1">
              <div className="aspect-[16/9] overflow-hidden bg-neutro-img">
                <img src={g.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="inline-flex h-6 items-center rounded-pill bg-lilas-100 px-2.5 text-[12.5px] font-extrabold text-roxo-700">{g.tag}</span>
                <h3 className="mt-3 text-[21px] leading-snug text-tinta group-hover:text-roxo-700">{g.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-[13px] text-cinza-600"><Clock className="size-3.5" /> {g.read}</p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}