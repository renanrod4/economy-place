'use client';

import type { ReactNode } from 'react';
import { Container, Logo, AffiliateNote, LogoMark } from '@/components/ui';
import { to } from '@/lib/store';
import { categories } from '@/lib/data/products';
import { cn } from '@/lib/utils/cn';

export function Footer() {
  const cols = [
    { t: 'Navegue', l: [['Ofertas do dia', '/'], ['Mais vendidos', '/categoria/todas?ordem=vendidos'], ['Black Friday', '/black-friday'], ['Comparador', '/comparar']] },
    { t: 'Categorias', l: categories.map((c) => [c.label, `/categoria/${c.id}`]) },
    { t: 'Transparência', l: [['Como funciona', '/'], ['Como escolhemos as ofertas', '/'], ['Política de privacidade', '/'], ['Fale conosco', '/bio']] },
  ];
  return (
    <footer className="mt-20 bg-roxo-900 pb-24 text-white lg:pb-0">
      <div className="h-3 bg-[repeating-linear-gradient(90deg,#FFC20E_0_24px,#FFD23F_24px_48px)]" aria-hidden />
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] text-white/80">
            Curadoria diária de achadinhos e promoções. Você escolhe aqui e finaliza a compra com segurança no Mercado Livre.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <h2 className="text-[18px] text-amarelo-400">{c.t}</h2>
            <ul className="mt-3 space-y-1">
              {c.l.map(([label, href]) => (
                <li key={label}><a href={to(href)} className="inline-flex min-h-9 items-center text-[14px] text-white/85 hover:text-white hover:underline">{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container>
        <div className="rounded-card bg-white/8 p-4 ring-1 ring-white/15">
          <AffiliateNote onDark className="text-[13px] text-white/90" />
          <p className="mt-2 pl-5 text-[12.5px] text-white/70">
            O Economy Place não é uma loja oficial do Mercado Livre. Pagamento, entrega e garantia são de responsabilidade do Mercado Livre e de seus vendedores. Preços e disponibilidade podem mudar.
          </p>
        </div>
        <div className="flex flex-col items-start justify-between gap-2 py-6 text-[12.5px] text-white/65 md:flex-row md:items-center">
          <span>© 2025 Economy Place · CNPJ 00.000.000/0001-00</span>
          <span className="flex items-center gap-2"><LogoMark size={24} decorative /> Achadinhos • Promoções</span>
        </div>
      </Container>
    </footer>
  );
}