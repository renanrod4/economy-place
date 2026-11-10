'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Bell, Scale, House, LayoutGrid } from 'lucide-react';
import { Container, LogoMark } from '@/components/ui';
import { useStore, to } from '@/lib/store';
import { cn } from '@/lib/utils/cn';

export function MobileTabBar({ path }: { path: string }) {
  const [activeLink, setActiveLink] = useState('/');
  const { favorites } = useStore();

  // Update active link after mount to avoid SSR/client mismatch
  useEffect(() => {
    // The route is client-derived to avoid an SSR/client pathname mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveLink(path);
  }, [path]);

  const items = [
    { href: '/', label: 'Início', icon: House },
    { href: '/categoria/todas', label: 'Ofertas', icon: LayoutGrid },
    { href: '/favoritos', label: 'Favoritos', icon: Heart, count: favorites.length },
    { href: '/alertas', label: 'Alertas', icon: Bell },
    { href: '/comparar', label: 'Comparar', icon: Scale },
  ];

  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-lilas-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="mx-auto flex max-w-lg">
        {items.map(({ href, label, icon: I, count }) => {
          const isActive = href === activeLink;
          return (
            <li key={href} className="flex-1">
              <a href={to(href)} className={cn('relative flex h-16 flex-col items-center justify-center gap-0.5 text-sm font-bold', isActive ? 'text-roxo-700' : 'text-cinza-600')}>
                <span className={cn('grid h-7 w-12 place-items-center rounded-pill', isActive && 'bg-lilas-100')}>
                  <I className={cn('size-5', isActive && 'fill-roxo-700/15')} strokeWidth={2.4} />
                </span>
                {label}
                {!!count && <span className="absolute right-[18%] top-1.5 grid h-4.5 min-w-4.5 place-items-center rounded-pill bg-roxo-700 px-1 text-[10px] font-extrabold text-white">{count}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}