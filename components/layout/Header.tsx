import React, { type ReactNode } from 'react';
import { Heart, Bell, Scale, House, LayoutGrid, Percent } from 'lucide-react';
import { Container, Logo, AffiliateNote, LogoMark } from '@/components/ui';
import { SearchPill } from '@/components/ui/SearchPill';
import { useStore, to } from '@/lib/store';
import { categories } from '@/lib/data/products';
import { cn } from '@/lib/utils/cn';

function IconLink({ href, label, icon, count }: { href: string; label: string; icon: ReactNode; count?: number }) {
  return (
    <a href={to(href)} className="relative flex min-h-11 min-w-11 flex-col items-center justify-center rounded-pill px-2 text-white hover:text-amarelo-400" aria-label={count ? `${label} (${count})` : label}>
      {icon}
      <span className="mt-0.5 hidden text-[12px] font-bold lg:block">{label}</span>
      {!!count && (
        <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-pill bg-amarelo-500 px-1 text-[11px] font-extrabold text-roxo-900 ring-2 ring-roxo-700" aria-hidden>
          {count}
        </span>
      )}
    </a>
  );
}

export function Header({ path }: { path: string }) {
  const { favorites, compare } = useStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Readiness is client-only so server and client markup stay identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const favCount = mounted ? favorites.length : 0;
  const cmpCount = mounted ? compare.length : 0;

  const nav = [
    ...categories.map((c) => ({ href: `/categoria/${c.id}`, label: c.label })),
    { href: '/categoria/todas?ordem=vendidos', label: 'Mais vendidos' },
    { href: '/?secao=guias', label: 'Guias de compra' },
  ];
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-roxo-900 via-roxo-700 to-roxo-700 shadow-[0_4px_0_rgba(59,10,115,.25)]">
      <Container className="flex h-[72px] items-center gap-3 lg:h-20 lg:gap-8">
        <div className="lg:hidden"><Logo compact /></div>
        <div className="hidden lg:block"><Logo /></div>
        <div className="hidden flex-1 md:block lg:max-w-[560px]">
          <SearchPill />
        </div>
        <nav aria-label="Atalhos" className="ml-auto flex items-center gap-1 lg:gap-3">
          <span className="hidden md:block"><IconLink href="/comparar" label="Comparar" icon={<Scale className="size-6" strokeWidth={2.25} />} count={cmpCount} /></span>
          <IconLink href="/alertas" label="Alertas" icon={<Bell className="size-6" strokeWidth={2.25} />} />
          <IconLink href="/favoritos" label="Favoritos" icon={<Heart className="size-6" strokeWidth={2.25} />} count={favCount} />
        </nav>
      </Container>
      <Container className="pb-3 md:hidden">
        <SearchPill />
      </Container>
      <div className="hidden border-t border-white/10 lg:block">
        <Container className="flex h-12 items-center gap-1">
          {nav.map((n) => (
            <a key={n.href} href={to(n.href)} className={cn('flex h-11 items-center rounded-pill px-4 text-[15px] font-bold text-white/90 hover:bg-white/10 hover:text-white', path === n.href && 'bg-white/15 text-white')}>
              {n.label}
            </a>
          ))}
          <a href={to('/black-friday')} className="ml-auto flex h-9 items-center gap-1.5 rounded-pill bg-amarelo-500 px-4 font-display text-[15px] font-extrabold text-roxo-900 shadow-btn-amarelo">
            <Percent className="size-4" strokeWidth={3} /> Black Friday
          </a>
        </Container>
      </div>
    </header>
  );
}