'use client';

import React from 'react';
import Link from 'next/link';
import { Container, SectionTitle, Logo, LogoMark, buttonCls, DiscountBadge, Seal, Price, Chip, AffiliateNote, Container as ContainerComp, ProductCard, ProductCardSkeleton, UpdatedLine, MLButton, EmptyState } from '@/components/ui';
import { products, money, discountOf } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { to } from '@/lib/store';
import { cn } from '@/lib/utils/cn';
import { Heart, Truck, Zap, Sparkles, AlertCircle, CheckCircle, Bell, Scale, Search, Percent, Tag, X, Timer, ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Shield, RotateCcw, Share2 } from 'lucide-react';

interface DesignPageProps {
  page: string;
}

const pages = [
  { id: 'fundamentos', label: 'Fundamentos', href: '/design/fundamentos' },
  { id: 'cores', label: 'Cores', href: '/design/cores' },
  { id: 'tipografia', label: 'Tipografia', href: '/design/tipografia' },
  { id: 'forma', label: 'Forma', href: '/design/forma' },
  { id: 'acessibilidade', label: 'Acessibilidade', href: '/design/acessibilidade' },
  { id: 'grid', label: 'Grid', href: '/design/grid' },
  { id: 'componentes', label: 'Componentes', href: '/design/componentes' },
  { id: 'botoes', label: 'Botões', href: '/design/botoes' },
  { id: 'selos', label: 'Selos', href: '/design/selos' },
  { id: 'busca-chips', label: 'Busca/Chips', href: '/design/busca-chips' },
  { id: 'card', label: 'Card', href: '/design/card' },
  { id: 'oferta-dia', label: 'Oferta do dia', href: '/design/oferta-dia' },
  { id: 'banner', label: 'Banner', href: '/design/banner' },
  { id: 'feedback', label: 'Feedback', href: '/design/feedback' },
  { id: 'icones', label: 'Ícones', href: '/design/icones' },
  { id: 'desktop', label: 'Desktop', href: '/design/desktop' },
  { id: 'mobile', label: 'Mobile', href: '/design/mobile' },
] as const;

const pageGroups = [
  { title: 'Fundamentos', pages: pages.slice(0, 6) },
  { title: 'Componentes', pages: pages.slice(6, 16) },
  { title: 'Galeria de telas', pages: pages.slice(16) },
] as const;

export default async function DesignPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  const currentPage = pages.find((p) => p.id === page) || pages[0];

  const renderPage = () => {
    switch (page) {
      case 'fundamentos':
        return <Fundamentos />;
      case 'cores':
        return <Cores />;
      case 'tipografia':
        return <Tipografia />;
      case 'forma':
        return <Forma />;
      case 'acessibilidade':
        return <Acessibilidade />;
      case 'grid':
        return <GridLayout />;
      case 'componentes':
        return <ComponentesOverview />;
      case 'botoes':
        return <BotoesPage />;
      case 'selos':
        return <SelosPage />;
      case 'busca-chips':
        return <BuscaChipsPage />;
      case 'card':
        return <CardPage />;
      case 'oferta-dia':
        return <OfertaDiaPage />;
      case 'banner':
        return <BannerPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'icones':
        return <IconesPage />;
      case 'desktop':
        return <DesktopGallery />;
      case 'mobile':
        return <MobileGallery />;
      default:
        return <Fundamentos />;
    }
  };

  return (
    <div className="min-h-screen bg-fundo">
      {/* Sidebar navigation */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-white lg:border-r lg:border-lilas-200 lg:overflow-y-auto lg:py-6">
        <ContainerComp className="px-4">
          <Logo compact className="mb-6" />
          <nav aria-label="Design System">
            {pageGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <h3 className="mb-3 px-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-roxo-500">{group.title}</h3>
                <ul className="space-y-1">
                  {group.pages.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={p.href}
                        className={cn(
                          'flex h-10 items-center gap-3 rounded-pill px-3 text-[14px] font-bold transition-colors',
                          p.id === page ? 'bg-lilas-100 text-roxo-700' : 'text-cinza-600 hover:bg-lilas-50 hover:text-roxo-700'
                        )}
                        aria-current={p.id === page ? 'page' : undefined}
                      >
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </ContainerComp>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64">
        <div className="lg:hidden border-b border-lilas-200 bg-white sticky top-0 z-10">
          <ContainerComp className="flex h-16 items-center justify-between">
            <Logo compact />
            <select
              value={page}
              onChange={(e) => window.location.href = e.target.value}
              className="h-10 rounded-pill border border-lilas-200 bg-white px-3 text-[14px] font-bold text-roxo-700"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.href}>{p.label}</option>
              ))}
            </select>
          </ContainerComp>
        </div>

        <ContainerComp className="py-8 lg:py-12">
          <div className="mb-8">
            <h1 className="text-[36px] font-bold text-roxo-700 md:text-[48px]">Design System — {currentPage.label}</h1>
            <p className="mt-2 text-[16px] text-cinza-600">Tokens, componentes e diretrizes visuais do Economy Place.</p>
          </div>
          {renderPage()}
        </ContainerComp>
      </main>
    </div>
  );
}

// ===== Page Components =====

function Fundamentos() {
  return (
    <div className="space-y-12">
      <section aria-labelledby="brand-title">
        <h2 id="brand-title" className="mb-4 text-[24px] font-bold text-roxo-700">Marca</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-4 text-[18px] font-bold text-tinta">Logo principal</h3>
            <Logo />
          </div>
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-4 text-[18px] font-bold text-tinta">Logo compacto</h3>
            <Logo compact />
          </div>
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-4 text-[18px] font-bold text-tinta">Logo mark (símbolo)</h3>
            <div className="flex gap-8">
              <LogoMark size={56} />
              <LogoMark size={80} />
              <LogoMark size={120} />
            </div>
          </div>
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-4 text-[18px] font-bold text-tinta">Tagline</h3>
            <p className="font-display text-[22px] font-extrabold text-roxo-700">Achadinhos • Promoções</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-title">
        <h2 id="mission-title" className="mb-4 text-[24px] font-bold text-roxo-700">Missão & Princípios</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Curadoria honesta', desc: 'Só mostramos ofertas com desconto real verificado no histórico de 90 dias.' },
            { title: 'Transparência total', desc: 'Mostramos preço antigo, preço atual, parcelamento e quem vende.' },
            { title: 'Sem pegadinhas', desc: 'Não maquiiamo preços. O desconto mostrado é o desconto real.' },
          ].map((p, i) => (
            <article key={i} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
              <h3 className="text-[18px] font-bold text-tinta">{p.title}</h3>
              <p className="mt-2 text-[15px] text-cinza-600">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Cores() {
  const colorGroups = [
    { name: 'Roxo (Principal)', colors: ['roxo-900', 'roxo-700', 'roxo-500'] },
    { name: 'Amarelo (Ação)', colors: ['amarelo-500', 'amarelo-400'] },
    { name: 'Laranja (Destaque)', colors: ['laranja-500'] },
    { name: 'Vermelho (Preço/Urgência)', colors: ['vermelho-500', 'vermelho-700'] },
    { name: 'Verde (Sucesso/Frete)', colors: ['verde-500', 'verde-700', 'verde-100'] },
    { name: 'Lilas (Fundos suaves)', colors: ['lilas-100', 'lilas-200'] },
    { name: 'Neutros', colors: ['fundo', 'tinta', 'cinza-600', 'cinza-400', 'cinza-200', 'neutro-img'] },
  ];

  const colorValues: Record<string, string> = {
    'roxo-900': '#3b0a73',
    'roxo-700': '#5a0e9e',
    'roxo-500': '#7a1fc4',
    'amarelo-500': '#ffc20e',
    'amarelo-400': '#ffd23f',
    'laranja-500': '#ff9d00',
    'vermelho-500': '#ee2a1f',
    'vermelho-700': '#c41c13',
    'verde-500': '#1fa855',
    'verde-700': '#12763a',
    'verde-100': '#e2f6e9',
    'lilas-100': '#efe3fb',
    'lilas-200': '#e0cdf6',
    'fundo': '#fbf8ff',
    'tinta': '#22163a',
    'cinza-600': '#625a74',
    'cinza-400': '#a49db3',
    'cinza-200': '#e7e2ef',
    'neutro-img': '#f4f1f8',
  };

  return (
    <div className="space-y-10">
      {colorGroups.map((group) => (
        <section key={group.name} aria-labelledby={group.name.toLowerCase().replace(/\s+/g, '-')}>
          <h2 id={group.name.toLowerCase().replace(/\s+/g, '-')} className="mb-4 text-[24px] font-bold text-roxo-700">{group.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {group.colors.map((color) => (
              <article key={color} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-4">
                <div
                  className="h-20 w-full rounded-[12px] mb-3"
                  style={{ backgroundColor: `var(--color-${color})` }}
                  role="img"
                  aria-label={`${color}: ${colorValues[color]}`}
                />
                <div className="space-y-1">
                  <p className="font-bold text-tinta text-[14px]">--color-{color}</p>
                  <p className="text-[13px] text-cinza-600 font-mono">{colorValues[color]}</p>
                  <p className="text-[13px] text-cinza-600">Tailwind: <code className="font-mono">bg-{color.replace('_', '-')}</code></p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section aria-labelledby="gradients">
        <h2 id="gradients" className="mb-4 text-[24px] font-bold text-roxo-700">Gradientes da marca</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-3 text-[16px] font-bold text-tinta">Hero principal</h3>
            <div className="h-32 rounded-[16px] bg-gradient-to-br from-roxo-900 via-roxo-700 to-roxo-500" />
            <p className="mt-2 text-[13px] text-cinza-600">from-roxo-900 via-roxo-700 to-roxo-500</p>
          </div>
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-3 text-[16px] font-bold text-tinta">Botão amarelo</h3>
            <div className="h-16 rounded-pill bg-gradient-to-r from-amarelo-500 to-amarelo-400" />
            <p className="mt-2 text-[13px] text-cinza-600">from-amarelo-500 to-amarelo-400</p>
          </div>
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-3 text-[16px] font-bold text-tinta">Faixa decorativa</h3>
            <div className="h-3 bg-[repeating-linear-gradient(90deg,#FFC20E_0_24px,#FFD23F_24px_48px)] rounded-pill" />
            <p className="mt-2 text-[13px] text-cinza-600">repeating-linear-gradient (amarelo-500 / amarelo-400)</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="contrast">
        <h2 id="contrast" className="mb-4 text-[24px] font-bold text-roxo-700">Contraste (WCAG AA)</h2>
        <table className="w-full min-w-[600px] border-collapse" role="table">
          <thead>
            <tr className="border-b border-lilas-200">
              <th className="p-3 text-left font-bold text-roxo-700">Combinação</th>
              <th className="p-3 text-left font-bold text-roxo-700">Ratio</th>
              <th className="p-3 text-left font-bold text-roxo-700">AA Normal</th>
              <th className="p-3 text-left font-bold text-roxo-700">AA Large</th>
            </tr>
          </thead>
          <tbody>
            {[
              { combo: 'roxo-900 sobre fundo', ratio: '12.6:1', aa: '✓', aal: '✓' },
              { combo: 'roxo-700 sobre fundo', ratio: '7.8:1', aa: '✓', aal: '✓' },
              { combo: 'amarelo-500 sobre roxo-900', ratio: '8.2:1', aa: '✓', aal: '✓' },
              { combo: 'vermelho-500 sobre fundo', ratio: '4.8:1', aa: '✗', aal: '✓' },
              { combo: 'verde-700 sobre fundo', ratio: '8.1:1', aa: '✓', aal: '✓' },
              { combo: 'cinza-600 sobre fundo', ratio: '4.9:1', aa: '✗', aal: '✓' },
              { combo: 'tinta sobre fundo', ratio: '15.2:1', aa: '✓', aal: '✓' },
            ].map((row) => (
              <tr key={row.combo} className="border-b border-lilas-200">
                <td className="p-3 text-[14px] text-tinta">{row.combo}</td>
                <td className="p-3 text-[14px] font-mono text-tinta">{row.ratio}</td>
                <td className="p-3 text-center text-[14px]">{row.aa}</td>
                <td className="p-3 text-center text-[14px]">{row.aal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-[13px] text-cinza-600">* vermelho-500 e cinza-600 não passam AA em texto normal — usar apenas em texto grande (≥18px) ou com fundo mais escuro.</p>
      </section>
    </div>
  );
}

function Tipografia() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="fonts">
        <h2 id="fonts" className="mb-4 text-[24px] font-bold text-roxo-700">Fontes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-4 text-[18px] font-bold text-tinta">Display — Baloo 2</h3>
            <p className="mb-2 text-[14px] text-cinza-600">Títulos, números grandes, elementos de destaque</p>
            <div className="space-y-2 font-display" style={{ fontFamily: 'var(--font-display)' }}>
              <p className="text-[48px] font-extrabold text-tinta" style={{ lineHeight: 1.1 }}>Baloo 2 — 800</p>
              <p className="text-[36px] font-extrabold text-tinta" style={{ lineHeight: 1.1 }}>Baloo 2 — 800</p>
              <p className="text-[24px] font-bold text-tinta" style={{ lineHeight: 1.1 }}>Baloo 2 — 700</p>
              <p className="text-[18px] font-semibold text-tinta" style={{ lineHeight: 1.1 }}>Baloo 2 — 600</p>
              <p className="text-[16px] font-medium text-tinta" style={{ lineHeight: 1.1 }}>Baloo 2 — 500</p>
            </div>
          </div>
          <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
            <h3 className="mb-4 text-[18px] font-bold text-tinta">Body — Nunito</h3>
            <p className="mb-2 text-[14px] text-cinza-600">Textos longos, UI, labels, descrições</p>
            <div className="space-y-2" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-[20px] font-bold text-tinta">Nunito — 800</p>
              <p className="text-[18px] font-bold text-tinta">Nunito — 700</p>
              <p className="text-[16px] font-semibold text-tinta">Nunito — 600</p>
              <p className="text-[16px] font-normal text-tinta">Nunito — 400 (regular)</p>
              <p className="text-[16px] font-bold italic text-tinta">Nunito — 700 italic</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="scale">
        <h2 id="scale" className="mb-4 text-[24px] font-bold text-roxo-700">Escala tipográfica</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <table className="w-full min-w-[600px] border-collapse" role="table">
            <thead>
              <tr className="border-b border-lilas-200">
                <th className="p-3 text-left font-bold text-roxo-700">Uso</th>
                <th className="p-3 text-left font-bold text-roxo-700">Tamanho</th>
                <th className="p-3 text-left font-bold text-roxo-700">Peso</th>
                <th className="p-3 text-left font-bold text-roxo-700">Família</th>
                <th className="p-3 text-left font-bold text-roxo-700">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              {[
                { use: 'H1 (Hero)', size: '72px / 64px / 44px', weight: '800', family: 'Display', example: 'Achadinhos que cabem no seu bolso' },
                { use: 'H2 (Seção)', size: '36px / 28px', weight: '800', family: 'Display', example: 'Ofertas da semana' },
                { use: 'H3 (Card)', size: '26px / 22px / 15px', weight: '800/700', family: 'Display', example: 'Fritadeira Air Fryer...' },
                { use: 'Body Large', size: '19px / 17px', weight: '400', family: 'Body', example: 'Garimpamos as melhores promoções...' },
                { use: 'Body', size: '16px / 15px', weight: '400/600', family: 'Body', example: 'Preço atualizado há 12 min' },
                { use: 'Small / Caption', size: '13px / 12px', weight: '400/700', family: 'Body', example: '1.248 ofertas verificadas hoje' },
                { use: 'Button', size: '19px / 17px / 15px', weight: '800', family: 'Display', example: 'Ver oferta no Mercado Livre' },
              ].map((row) => (
                <tr key={row.use} className="border-b border-lilas-200">
                  <td className="p-3 text-[14px] text-tinta">{row.use}</td>
                  <td className="p-3 text-[13px] font-mono text-cinza-600">{row.size}</td>
                  <td className="p-3 text-[13px] font-mono text-cinza-600">{row.weight}</td>
                  <td className="p-3 text-[13px] text-cinza-600">{row.family}</td>
                  <td className="p-3 text-[14px] text-tinta">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Forma() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="radius">
        <h2 id="radius" className="mb-4 text-[24px] font-bold text-roxo-700">Raios de borda</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: 'Campo (inputs)', token: '--radius-campo', value: '10px', example: <input className="w-full h-12 rounded-campo border border-lilas-200 px-4 text-[15px] placeholder-cinza-400" placeholder="Input com radius-campo" /> },
            { name: 'Card (produtos)', token: '--radius-card', value: '18px', example: <div className="aspect-square w-full max-w-xs rounded-card bg-neutro-img ring-1 ring-lilas-200" /> },
            { name: 'Pill (botões, tags)', token: '--radius-pill', value: '999px', example: <button className="inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-4 text-white font-display font-extrabold">Botão pill</button> },
          ].map((r) => (
            <article key={r.name} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6 text-center">
              <h3 className="mb-3 text-[16px] font-bold text-tinta">{r.name}</h3>
              <p className="mb-3 font-mono text-[13px] text-cinza-600">{r.token}: {r.value}</p>
              <div className="mx-auto max-w-xs">{r.example}</div>
              <p className="mt-2 text-[13px] text-cinza-600">Tailwind: <code className="font-mono">rounded-{r.name.toLowerCase().includes('campo') ? 'campo' : r.name.toLowerCase().includes('card') ? 'card' : 'pill'}</code></p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="shadows">
        <h2 id="shadows" className="mb-4 text-[24px] font-bold text-roxo-700">Sombras 3D (assinatura da marca)</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: 'Sombra 3D pequena', token: '--shadow-3d-sm', value: '0 4px 0 rgba(59,10,115,0.18)', example: <div className="h-20 w-20 rounded-card bg-white shadow-3d-sm" /> },
            { name: 'Sombra 3D padrão', token: '--shadow-3d', value: '0 6px 0 rgba(59,10,115,0.18)', example: <div className="h-20 w-20 rounded-card bg-white shadow-3d" /> },
            { name: 'Sombra 3D grande', token: '--shadow-3d-lg', value: '0 10px 0 rgba(59,10,115,0.18)', example: <div className="h-20 w-20 rounded-card bg-white shadow-3d-lg" /> },
            { name: 'Botão amarelo', token: '--shadow-btn-amarelo', value: '0 4px 0 #c98f00', example: <button className="h-12 rounded-pill bg-amarelo-500 text-roxo-900 font-display font-extrabold shadow-btn-amarelo">Botão</button> },
            { name: 'Botão roxo', token: '--shadow-btn-roxo', value: '0 4px 0 #2a0653', example: <button className="h-12 rounded-pill bg-roxo-700 text-white font-display font-extrabold shadow-btn-roxo">Botão</button> },
            { name: 'Botão vermelho', token: '--shadow-btn-vermelho', value: '0 4px 0 #9e150d', example: <button className="h-12 rounded-pill bg-vermelho-700 text-white font-display font-extrabold shadow-btn-vermelho">Botão</button> },
          ].map((s) => (
            <article key={s.name} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6 text-center">
              <h3 className="mb-3 text-[16px] font-bold text-tinta">{s.name}</h3>
              <p className="mb-3 font-mono text-[12px] text-cinza-600">{s.token}</p>
              <p className="mb-3 font-mono text-[11px] text-cinza-600">{s.value}</p>
              <div className="mx-auto">{s.example}</div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="elevation">
        <h2 id="elevation" className="mb-4 text-[24px] font-bold text-roxo-700">Elevação interativa (hover/active)</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-[13px] font-bold text-cinza-600">Repouso</p>
              <div className="h-20 w-20 rounded-card bg-white shadow-3d ring-1 ring-lilas-200" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[13px] font-bold text-cinza-600">Hover</p>
              <div className="h-20 w-20 rounded-card bg-white shadow-3d-lg ring-2 ring-roxo-500 -translate-y-1" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[13px] font-bold text-cinza-600">Active (pressed)</p>
              <div className="h-20 w-20 rounded-card bg-white shadow-none ring-2 ring-roxo-500 translate-y-1" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-[13px] font-bold text-cinza-600">Botão hover</p>
              <button className="h-12 rounded-pill bg-amarelo-500 text-roxo-900 font-display font-extrabold shadow-btn-amarelo hover:translate-y-[1px] hover:shadow-none active:translate-y-[4px] active:shadow-none transition-all px-6">Hover me</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Acessibilidade() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="focus">
        <h2 id="focus" className="mb-4 text-[24px] font-bold text-roxo-700">Foco visível</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <p className="mb-4 text-[15px] text-cinza-600">Todos os elementos interativos têm foco visível com anel amarelo 3px + outline roxo 2px (contraste AA).</p>
          <div className="flex flex-wrap gap-4">
            <button className="h-12 rounded-pill bg-roxo-700 px-6 text-white font-display font-extrabold shadow-btn-roxo">Botão primário</button>
            <a href="#" className="h-12 flex items-center rounded-pill bg-white px-6 text-roxo-700 font-display font-extrabold ring-2 ring-inset ring-lilas-200">Link fantasma</a>
            <input className="h-12 rounded-campo border border-lilas-200 px-4 text-[15px] w-64" placeholder="Input focável" />
            <select className="h-12 rounded-campo border border-lilas-200 px-4 text-[15px] bg-white">
              <option>Select focável</option>
            </select>
          </div>
        </div>
      </section>

      <section aria-labelledby="skip-link">
        <h2 id="skip-link" className="mb-4 text-[24px] font-bold text-roxo-700">Skip link</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <p className="mb-4 text-[15px] text-cinza-600">Link &quot;Pular para o conteúdo principal&quot; disponível no topo da página (visível apenas no foco).</p>
          <a href="#conteudo" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 h-11 rounded-pill bg-amarelo-500 px-4 text-[15px] font-bold text-roxo-900 shadow-btn-amarelo">
            Pular para o conteúdo principal
          </a>
        </div>
      </section>

      <section aria-labelledby="reduced-motion">
        <h2 id="reduced-motion" className="mb-4 text-[24px] font-bold text-roxo-700">Redução de movimento</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <p className="mb-4 text-[15px] text-cinza-600">Animações (shimmer, float-y) são desativadas quando <code className="font-mono">prefers-reduced-motion: reduce</code>.</p>
          <div className="flex gap-4">
            <div className="shimmer h-12 w-48 rounded-pill" />
            <div className="float-y h-12 w-12 rounded-card bg-roxo-700" />
          </div>
        </div>
      </section>

      <section aria-labelledby="aria">
        <h2 id="aria" className="mb-4 text-[24px] font-bold text-roxo-700">ARIA & Semântica</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <ul className="space-y-3 text-[15px] text-cinza-600">
            <li><strong>role=&quot;list&quot;</strong> + <strong>role=&quot;listitem&quot;</strong> em grids de produtos</li>
            <li><strong>aria-label</strong> em cards de produto (título do produto)</li>
            <li><strong>aria-pressed</strong> em botões toggle (favorito, filtros)</li>
            <li><strong>aria-current=&quot;page&quot;</strong> em navegação ativa</li>
            <li><strong>aria-live=&quot;polite/assertive&quot;</strong> em toasts e alertas de preço</li>
            <li><strong>role=&quot;dialog&quot;</strong> + <strong>aria-modal=&quot;true&quot;</strong> em modais/sheets</li>
            <li><strong>role=&quot;progressbar&quot;</strong> com aria-valuenow/min/max em barras de progresso</li>
            <li><strong>role=&quot;tablist/tab/tabpanel&quot;</strong> em filtros de categoria (Black Friday)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function GridLayout() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="container">
        <h2 id="container" className="mb-4 text-[24px] font-bold text-roxo-700">Container</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <p className="mb-4 text-[15px] text-cinza-600">Max-width: 1200px. Padding: 16px (mobile) / 24px (md+).</p>
          <div className="h-32 rounded-card bg-lilas-100 ring-1 ring-lilas-200 flex items-center justify-center">
            <code className="text-[14px] text-roxo-700">Container (max-w-[1200px] px-4 md:px-6)</code>
          </div>
        </div>
      </section>

      <section aria-labelledby="breakpoints">
        <h2 id="breakpoints" className="mb-4 text-[24px] font-bold text-roxo-700">Breakpoints</h2>
        <table className="w-full min-w-[600px] border-collapse" role="table">
          <thead>
            <tr className="border-b border-lilas-200">
              <th className="p-3 text-left font-bold text-roxo-700">Nome</th>
              <th className="p-3 text-left font-bold text-roxo-700">Valor</th>
              <th className="p-3 text-left font-bold text-roxo-700">Tailwind</th>
              <th className="p-3 text-left font-bold text-roxo-700">Uso típico</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'sm', value: '480px', tw: 'sm:', use: 'Ajustes finos mobile' },
              { name: 'md', value: '768px', tw: 'md:', use: 'Tablet / sidebar filters' },
              { name: 'lg', value: '1024px', tw: 'lg:', use: 'Desktop / grid 4-5 colunas' },
              { name: 'xl', value: '1280px', tw: 'xl:', use: 'Large desktop / grid 5 colunas' },
            ].map((bp) => (
              <tr key={bp.name} className="border-b border-lilas-200">
                <td className="p-3 text-[14px] text-tinta">{bp.name}</td>
                <td className="p-3 text-[13px] font-mono text-tinta">{bp.value}</td>
                <td className="p-3 text-[13px] font-mono text-cinza-600">{bp.tw}</td>
                <td className="p-3 text-[14px] text-cinza-600">{bp.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section aria-labelledby="grids">
        <h2 id="grids" className="mb-4 text-[24px] font-bold text-roxo-700">ProductGrid responsivo</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <p className="mb-4 text-[15px] text-cinza-600">Grid fluido: 2 col (mobile) → 3 col (md) → 4 col (lg) → 5 col (xl).</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ComponentesOverview() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="index">
        <h2 id="index" className="mb-4 text-[24px] font-bold text-roxo-700">Índice de componentes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Botões', href: '/design/botoes', desc: 'Primário, secundário, fantasma, vermelho, tamanhos' },
            { name: 'Selos', href: '/design/selos', desc: 'Desconto, Frete grátis, Full, Mais vendido, Indisponível, Menor preço' },
            { name: 'Busca / Chips', href: '/design/busca-chips', desc: 'SearchPill, Chip (filtro categoria)' },
            { name: 'Card de produto', href: '/design/card', desc: 'ProductCard, ProductCardSkeleton, estados' },
            { name: 'Oferta do dia', href: '/design/oferta-dia', desc: 'DealOfDay com galeria, info, countdown' },
            { name: 'Banner WhatsApp', href: '/design/banner', desc: 'WhatsAppBanner CTA' },
            { name: 'Feedback', href: '/design/feedback', desc: 'Toasts, EmptyState, Countdown, AffiliateNote' },
            { name: 'Ícones', href: '/design/icones', desc: 'Lucide icons usados no projeto' },
            { name: 'Preço', href: '/design/botoes', desc: 'Price component com parcelamento' },
          ].map((c) => (
            <Link key={c.name} href={c.href} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5 hover:ring-2 hover:ring-roxo-500 transition-colors">
              <h3 className="text-[18px] font-bold text-tinta">{c.name}</h3>
              <p className="mt-1 text-[14px] text-cinza-600">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function BotoesPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="variants">
        <h2 id="variants" className="mb-4 text-[24px] font-bold text-roxo-700">Variantes</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap gap-4">
            <button className="h-12 rounded-pill bg-amarelo-500 px-6 text-roxo-900 font-display font-extrabold shadow-btn-amarelo">Primário</button>
            <button className="h-12 rounded-pill bg-roxo-700 px-6 text-white font-display font-extrabold shadow-btn-roxo">Secundário</button>
            <button className="h-12 rounded-pill bg-white px-6 text-roxo-700 font-display font-extrabold ring-2 ring-inset ring-roxo-700/25">Fantasma</button>
            <button className="h-12 rounded-pill bg-white/10 px-6 text-white font-display font-extrabold ring-2 ring-inset ring-white/40">Fantasma claro</button>
            <button className="h-12 rounded-pill bg-vermelho-700 px-6 text-white font-display font-extrabold shadow-btn-vermelho">Vermelho</button>
          </div>
        </div>
      </section>

      <section aria-labelledby="sizes">
        <h2 id="sizes" className="mb-4 text-[24px] font-bold text-roxo-700">Tamanhos</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <button className="h-11 rounded-pill bg-amarelo-500 px-4 text-roxo-900 font-display font-extrabold shadow-btn-amarelo text-[15px]">SM</button>
            <button className="h-12 rounded-pill bg-amarelo-500 px-6 text-roxo-900 font-display font-extrabold shadow-btn-amarelo text-[17px]">MD</button>
            <button className="h-14 rounded-pill bg-amarelo-500 px-8 text-roxo-900 font-display font-extrabold shadow-btn-amarelo text-[19px]">LG</button>
          </div>
        </div>
      </section>

      <section aria-labelledby="ml-button">
        <h2 id="ml-button" className="mb-4 text-[24px] font-bold text-roxo-700">MLButton (CTA afiliado)</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <p className="mb-4 text-[15px] text-cinza-600">Sempre abre no Mercado Livre em nova aba com rel=&quot;noopener noreferrer sponsored nofollow&quot;.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer sponsored nofollow" className="h-12 rounded-pill bg-amarelo-500 px-6 text-roxo-900 font-display font-extrabold shadow-btn-amarelo flex items-center gap-2">
              Ver oferta no Mercado Livre
              <svg className="size-5" strokeWidth={2.75} aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer sponsored nofollow" className="h-14 rounded-pill bg-amarelo-500 px-8 text-roxo-900 font-display font-extrabold shadow-btn-amarelo flex items-center gap-2.5">
              Ver oferta no Mercado Livre
              <svg className="size-[1.05em]" strokeWidth={2.75} aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="states">
        <h2 id="states" className="mb-4 text-[24px] font-bold text-roxo-700">Estados interativos</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap gap-4">
            <button className="h-12 rounded-pill bg-amarelo-500 px-6 text-roxo-900 font-display font-extrabold shadow-btn-amarelo hover:bg-amarelo-400 hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none transition-all">Hover + Active</button>
            <button className="h-12 rounded-pill bg-amarelo-500 px-6 text-roxo-900 font-display font-extrabold shadow-btn-amarelo opacity-50 cursor-not-allowed" disabled>Disabled</button>
            <button className="h-12 rounded-pill bg-roxo-700 px-6 text-white font-display font-extrabold shadow-btn-roxo focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amarelo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-roxo-900">Com focus-visible</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SelosPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="discount-badge">
        <h2 id="discount-badge" className="mb-4 text-[24px] font-bold text-roxo-700">DiscountBadge</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap gap-4">
            <DiscountBadge value={10} />
            <DiscountBadge value={25} />
            <DiscountBadge value={50} />
            <DiscountBadge value={70} />
            <DiscountBadge value={30} className="h-7 text-[16px]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="seals">
        <h2 id="seals" className="mb-4 text-[24px] font-bold text-roxo-700">Seals (Selos)</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap gap-4">
            <Seal kind="frete" />
            <Seal kind="full" />
            <Seal kind="maisvendido" />
            <Seal kind="indisponivel" />
            <Seal kind="menorpreco" />
          </div>
          <table className="mt-6 w-full min-w-[600px] border-collapse" role="table">
            <thead>
              <tr className="border-b border-lilas-200">
                <th className="p-3 text-left font-bold text-roxo-700">Kind</th>
                <th className="p-3 text-left font-bold text-roxo-700">Cor</th>
                <th className="p-3 text-left font-bold text-roxo-700">Ícone</th>
                <th className="p-3 text-left font-bold text-roxo-700">Texto</th>
              </tr>
            </thead>
            <tbody>
              {[
                { kind: 'frete', bg: 'verde-100', text: 'verde-700', icon: 'Truck', label: 'Frete grátis' },
                { kind: 'full', bg: 'roxo-900', text: 'amarelo-400', icon: 'Zap', label: 'Full' },
                { kind: 'maisvendido', bg: 'laranja-500', text: 'roxo-900', icon: 'Flame', label: 'Mais vendido' },
                { kind: 'indisponivel', bg: 'cinza-200', text: 'cinza-600', icon: 'Ban', label: 'Indisponível' },
                { kind: 'menorpreco', bg: 'lilas-100', text: 'roxo-700', icon: 'Sparkles', label: 'Menor preço em 90 dias' },
              ].map((s) => (
                <tr key={s.kind} className="border-b border-lilas-200">
                  <td className="p-3 text-[14px] font-mono text-tinta">{s.kind}</td>
                  <td className="p-3"><span className="inline-flex h-6 w-16 items-center justify-center rounded-pill" style={{ backgroundColor: `var(--color-${s.bg})` }} /></td>
                  <td className="p-3 text-[14px] font-mono text-cinza-600">{s.icon}</td>
                  <td className="p-3 text-[14px] text-tinta">{s.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function BuscaChipsPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="search-pill">
        <h2 id="search-pill" className="mb-4 text-[24px] font-bold text-roxo-700">SearchPill</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <SearchPillDemo />
        </div>
      </section>

      <section aria-labelledby="chips">
        <h2 id="chips" className="mb-4 text-[24px] font-bold text-roxo-700">Chips (filtros de categoria)</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="no-scrollbar flex flex-wrap gap-2" role="tablist">
            {['Todas', 'Casa', 'Cozinha', 'Beleza', 'Viagem'].map((cat, i) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={i === 0}
                className={`h-11 shrink-0 rounded-pill px-4 text-[15px] font-bold transition-colors ${i === 0 ? 'bg-roxo-700 text-white shadow-btn-roxo' : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Need SearchPill component
function SearchPillDemo() {
  return (
    <div className="relative max-w-md">
      <label htmlFor="search" className="sr-only">Buscar ofertas</label>
      <input
        id="search"
        type="search"
        placeholder="Buscar ofertas..."
        className="w-full h-12 rounded-pill bg-white pl-12 pr-4 text-[15px] font-bold text-tinta placeholder-cinza-400 ring-2 ring-inset ring-lilas-200 focus:ring-roxo-500"
      />
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-cinza-400 pointer-events-none" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
    </div>
  );
}

function CardPage() {
  const sampleProduct = products[0];

  return (
    <div className="space-y-10">
      <section aria-labelledby="default">
        <h2 id="default" className="mb-4 text-[24px] font-bold text-roxo-700">Estado padrão</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <ProductCard p={sampleProduct} />
        </div>
      </section>

      <section aria-labelledby="states">
        <h2 id="states" className="mb-4 text-[24px] font-bold text-roxo-700">Estados</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <p className="mb-3 text-[14px] font-bold text-cinza-600">Padrão</p>
              <ProductCard p={sampleProduct} />
            </div>
            <div className="text-center">
              <p className="mb-3 text-[14px] font-bold text-cinza-600">Hover</p>
              <ProductCard p={sampleProduct} state="hover" />
            </div>
            <div className="text-center">
              <p className="mb-3 text-[14px] font-bold text-cinza-600">Favoritado</p>
              <ProductCard p={sampleProduct} state="favoritado" />
            </div>
            <div className="text-center">
              <p className="mb-3 text-[14px] font-bold text-cinza-600">Indisponível</p>
              <ProductCard p={products.find((p) => !p.available) || sampleProduct} state="indisponivel" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="skeleton">
        <h2 id="skeleton" className="mb-4 text-[24px] font-bold text-roxo-700">Skeleton</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <ProductCardSkeleton />
        </div>
      </section>
    </div>
  );
}

function OfertaDiaPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="deal">
        <h2 id="deal" className="mb-4 text-[24px] font-bold text-roxo-700">DealOfDay</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <DealOfDay p={products[0]} />
        </div>
      </section>
    </div>
  );
}

// Need DealOfDay component
function DealOfDay({ p }: { p: Product }) {
  return (
    <article className="grid overflow-hidden rounded-[24px] bg-white shadow-3d-lg ring-2 ring-amarelo-500 md:grid-cols-[1fr_1.15fr]">
      <div className="relative bg-neutro-img">
        <img src={p.image} alt={p.title} className="aspect-square size-full object-cover md:aspect-auto" />
        <span className="absolute left-4 top-4 inline-flex h-9 items-center gap-1.5 rounded-pill bg-amarelo-500 px-4 font-display text-[17px] font-extrabold text-roxo-900 shadow-btn-amarelo">
          <Sparkles className="size-4" strokeWidth={3} /> Achadinho do dia
        </span>
      </div>
      <div className="flex flex-col gap-4 p-5 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <DiscountBadge value={discountOf(p)} />
          <Seal kind="menorpreco" />
          {p.full && <Seal kind="full" />}
          {p.freeShipping && <Seal kind="frete" />}
        </div>
        <h3 className="text-[26px] leading-tight text-tinta md:text-[32px]">{p.title}</h3>
        <ul className="space-y-1.5 text-[14.5px] text-tinta">
          <li className="flex gap-2"><CheckCircle className="size-5 shrink-0 text-roxo-500" strokeWidth={2.5} /> Menor preço que vimos nos últimos 90 dias</li>
          <li className="flex gap-2"><CheckCircle className="size-5 shrink-0 text-roxo-500" strokeWidth={2.5} /> Nota {p.rating.toLocaleString('pt-BR')} · {p.sold}</li>
          <li className="flex gap-2"><CheckCircle className="size-5 shrink-0 text-roxo-500" strokeWidth={2.5} /> Vendido por {p.seller} ({p.sellerTag})</li>
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Price p={p} size="lg" />
          <CountdownDemo endsAt={p.endsAt} />
        </div>
        <MLButton product={p} size="lg" full />
      </div>
    </article>
  );
}

function CountdownDemo({ endsAt }: { endsAt?: string }) {
  const [now, setNow] = React.useState(0);
  React.useEffect(() => {
    // The timer must start only in the browser to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!endsAt) return null;
  const diff = new Date(endsAt).getTime() - now;
  if (diff <= 0) return <span className="text-[14px] font-bold text-vermelho-500">Oferta encerrada</span>;
  const h = Math.floor(diff / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4);
  const s = Math.floor((diff % 6e4) / 1e3);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill bg-roxo-900 px-3 py-1.5 text-[14px] font-bold text-amarelo-400">
      <TimerIcon className="size-4" strokeWidth={2.5} />
      {h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`}
    </span>
  );
}

function TimerIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} strokeWidth={2.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

function BannerPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="whatsapp-banner">
        <h2 id="whatsapp-banner" className="mb-4 text-[24px] font-bold text-roxo-700">WhatsAppBanner</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <WhatsAppBannerDemo />
        </div>
      </section>
    </div>
  );
}

function WhatsAppBannerDemo() {
  return (
    <section className="bg-amarelo-500 rounded-[20px] p-6 md:p-8">
      <Container>
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
          <span className="grid size-16 shrink-0 place-items-center rounded-[20px] bg-roxo-700 text-amarelo-400 shadow-btn-roxo">
            <MessageCircle className="size-8" strokeWidth={2.4} />
          </span>
          <div className="flex-1">
            <h2 className="text-[26px] text-roxo-900 md:text-[32px]">Receba alertas de queda de preço no WhatsApp</h2>
            <p className="text-[15px] text-roxo-900/85">Escolha o produto e o preço que você quer pagar. A gente avisa quando chegar lá. Sem spam, cancele quando quiser.</p>
          </div>
          <Link href="/alertas" className="h-12 rounded-pill bg-roxo-700 px-6 text-white font-display text-[17px] font-extrabold shadow-btn-roxo hover:bg-roxo-500 max-md:w-full text-center">
            Quero receber alertas
          </Link>
        </div>
      </Container>
    </section>
  );
}


function FeedbackPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="toasts">
        <h2 id="toasts" className="mb-4 text-[24px] font-bold text-roxo-700">Toasts</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="flex flex-wrap gap-4">
            <ToastDemo kind="sucesso" text="Produto salvo nos favoritos!" />
            <ToastDemo kind="info" text="Removido dos favoritos" />
            <ToastDemo kind="erro" text="Erro ao carregar preço. Tente novamente." />
          </div>
        </div>
      </section>

      <section aria-labelledby="empty-state">
        <h2 id="empty-state" className="mb-4 text-[24px] font-bold text-roxo-700">EmptyState</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <EmptyState
            icon={<Search className="size-12 text-cinza-400" strokeWidth={1.5} />}
            title="Nenhuma oferta encontrada"
            description="Sua busca não retornou resultados. Tente termos diferentes."
            action={<Link href={to('/')} className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500">Ver ofertas</Link>}
          />
        </div>
      </section>

      <section aria-labelledby="countdown">
        <h2 id="countdown" className="mb-4 text-[24px] font-bold text-roxo-700">Countdown</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <CountdownDemo endsAt={new Date('2030-01-01T02:00:00.000Z').toISOString()} />
        </div>
      </section>

      <section aria-labelledby="affiliate-note">
        <h2 id="affiliate-note" className="mb-4 text-[24px] font-bold text-roxo-700">AffiliateNote</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="space-y-4">
            <AffiliateNote />
            <AffiliateNote onDark className="bg-roxo-900 p-4 rounded-card text-white/90" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ToastDemo({ kind, text }: { kind: 'sucesso' | 'info' | 'erro'; text: string }) {
  const colors = {
    sucesso: 'bg-verde-100 text-verde-700 border-verde-500',
    info: 'bg-lilas-100 text-roxo-700 border-roxo-500',
    erro: 'bg-vermelho-100 text-vermelho-700 border-vermelho-500',
  };
  const icons = {
    sucesso: <CheckCircle className="size-5" strokeWidth={2.5} />,
    info: <AlertCircle className="size-5" strokeWidth={2.5} />,
    erro: <X className="size-5" strokeWidth={2.5} />,
  };
  return (
    <div className={`flex items-start gap-3 rounded-card border-2 p-4 shadow-3d ${colors[kind]}`} role="alert" aria-live={kind === 'erro' ? 'assertive' : 'polite'}>
      <span className="shrink-0">{icons[kind]}</span>
      <p className="text-[14px] font-bold">{text}</p>
    </div>
  );
}

function IconesPage() {
  const icons = [
    { name: 'Heart', component: <Heart className="size-8" strokeWidth={2.25} /> },
    { name: 'Bell', component: <Bell className="size-8" strokeWidth={2.25} /> },
    { name: 'Scale', component: <Scale className="size-8" strokeWidth={2.25} /> },
    { name: 'Truck', component: <Truck className="size-8" strokeWidth={2.5} /> },
    { name: 'Zap', component: <Zap className="size-8" strokeWidth={2.5} fill="currentColor" /> },
    { name: 'Sparkles', component: <Sparkles className="size-8" strokeWidth={2.5} /> },
    { name: 'CheckCircle', component: <CheckCircle className="size-8" strokeWidth={2.5} /> },
    { name: 'AlertCircle', component: <AlertCircle className="size-8" strokeWidth={2.5} /> },
    { name: 'X', component: <X className="size-8" strokeWidth={2.5} /> },
    { name: 'ChevronLeft', component: <ChevronLeft className="size-8" strokeWidth={2.5} /> },
    { name: 'ChevronRight', component: <ChevronRight className="size-8" strokeWidth={2.5} /> },
    { name: 'ExternalLink', component: <svg className="size-8" strokeWidth={2.75} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> },
    { name: 'MessageCircle', component: <MessageCircle /> },
    { name: 'Shield', component: <Shield className="size-8" strokeWidth={2.5} /> },
    { name: 'RotateCcw', component: <RotateCcw className="size-8" strokeWidth={2.5} /> },
    { name: 'Share2', component: <Share2 className="size-8" strokeWidth={2.5} /> },
    { name: 'Search', component: <Search className="size-8" strokeWidth={2} /> },
    { name: 'Percent', component: <Percent className="size-8" strokeWidth={3} /> },
    { name: 'Tag', component: <Tag className="size-8" strokeWidth={2} /> },
  ];

  return (
    <div className="space-y-10">
      <section aria-labelledby="icons-list">
        <h2 id="icons-list" className="mb-4 text-[24px] font-bold text-roxo-700">Ícones Lucide usados</h2>
        <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {icons.map((icon) => (
              <div key={icon.name} className="flex flex-col items-center gap-2 p-4 rounded-card bg-lilas-50 ring-1 ring-lilas-200">
                <div className="text-roxo-700">{icon.component}</div>
                <code className="text-[12px] font-mono text-cinza-600">{icon.name}</code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DesktopGallery() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="desktop-screens">
        <h2 id="desktop-screens" className="mb-4 text-[24px] font-bold text-roxo-700">Capturas de tela — Desktop (≥1024px)</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Home — Hero + CategoryStrip', desc: 'Hero com gradiente, logo flutuante, 3 cards flutuantes. CategoryStrip em grid 4 colunas.' },
            { title: 'Home — DealOfDay', desc: 'Layout 2 colunas: imagem + info completa com countdown, preço, benefícios.' },
            { title: 'Home — WeekCarousel', desc: 'Carrossel horizontal snap com 10 cards, setas de navegação.' },
            { title: 'Home — Mais vendidos', desc: 'ProductGrid 5 colunas com bestSellers.' },
            { title: 'Listing — Sidebar filtros', desc: 'Filtros laterais fixos (sticky): preço slider, desconto chips, checkboxes.' },
            { title: 'Listing — Grid produtos', desc: 'Grid responsivo com ordenação e paginação "Carregar mais".' },
            { title: 'Produto — Galeria + Info', desc: 'Galeria com thumbnails, info sticky à direita, price history abaixo.' },
            { title: 'Produto — PriceHistory', desc: 'Gráfico SVG interativo 90 dias com hover tooltip e marcadores min/max.' },
            { title: 'Favoritos', desc: 'Header com stats, ações (abrir todos, compartilhar), grid de cards.' },
            { title: 'Comparador', desc: 'Tabela responsiva scroll horizontal, até 3 produtos, linhas destacadas.' },
            { title: 'Alertas', desc: 'Formulário validador + lista de alertas ativos com barra de progresso.' },
            { title: 'Black Friday', desc: 'Hero escuro, countdown oficial, chips de categoria, grid filtrável.' },
          ].map((screen) => (
            <article key={screen.title} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
              <h3 className="text-[18px] font-bold text-tinta">{screen.title}</h3>
              <p className="mt-2 text-[14px] text-cinza-600">{screen.desc}</p>
              <div className="mt-4 h-48 rounded-[12px] bg-lilas-100 ring-1 ring-lilas-200 flex items-center justify-center">
                <span className="text-[14px] text-cinza-600">[Screenshot placeholder]</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MobileGallery() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="mobile-screens">
        <h2 id="mobile-screens" className="mb-4 text-[24px] font-bold text-roxo-700">Capturas de tela — Mobile (≤767px)</h2>
        <div className="grid gap-6">
          {[
            { title: 'Home — Hero empilhado', desc: 'Hero em coluna única, cards flutuantes empilhados. CategoryStrip scroll horizontal.' },
            { title: 'Home — DealOfDay', desc: 'Imagem acima, info abaixo. Countdown e preço empilhados.' },
            { title: 'Home — WeekCarousel', desc: 'Carrossel touch com snap, 2 cards visíveis por vez.' },
            { title: 'Listing — FilterSheet', desc: 'Bottom sheet expansível com acordeões: Preço, Desconto, Benefícios.' },
            { title: 'Produto — Sticky CTA', desc: 'Barra fixa inferior: preço, favorito, comparar, alerta, botão "Ver oferta".' },
            { title: 'Produto — Galeria fullscreen', desc: 'Modal fullscreen com navegação por setas/teclado, thumbnails na base.' },
            { title: 'Favoritos', desc: 'Cards horizontais (imagem + info), ações na base de cada card.' },
            { title: 'Comparador', desc: 'Tabela com scroll horizontal, header fixo com foto + título + preço.' },
            { title: 'Alertas — Form', desc: 'Formulário em coluna única, sugestões de preço como chips.' },
            { title: 'MobileTabBar', desc: '5 abas fixas: Início, Ofertas, Favoritos, Alertas, Comparar (com badges).' },
            { title: 'Black Friday', desc: 'Hero compacto, chips de categoria scroll horizontal, grid 2 colunas.' },
          ].map((screen) => (
            <article key={screen.title} className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-6">
              <h3 className="text-[18px] font-bold text-tinta">{screen.title}</h3>
              <p className="mt-2 text-[14px] text-cinza-600">{screen.desc}</p>
              <div className="mt-4 h-64 max-w-sm mx-auto rounded-[12px] bg-lilas-100 ring-1 ring-lilas-200 flex items-center justify-center">
                <span className="text-[14px] text-cinza-600">[Screenshot placeholder]</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}


function SearchPill() {
  return (
    <div className="relative max-w-md">
      <label htmlFor="search" className="sr-only">Buscar ofertas</label>
      <input
        id="search"
        type="search"
        placeholder="Buscar ofertas..."
        className="w-full h-12 rounded-pill bg-white pl-12 pr-4 text-[15px] font-bold text-tinta placeholder-cinza-400 ring-2 ring-inset ring-lilas-200 focus:ring-roxo-500"
      />
      <svg className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-cinza-400 pointer-events-none" strokeWidth={2} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
    </div>
  );
}