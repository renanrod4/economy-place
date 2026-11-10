'use client';

import { to } from '@/lib/store';

export const Crumbs = ({ items }: { items: [string, string?][] }) => (
  <nav aria-label="Você está em" className="py-4 text-[13px] text-cinza-600">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map(([l, h], i) => (
        <li key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden>›</span>}
          {h ? <a href={to(h)} className="font-bold text-roxo-700 hover:underline">{l}</a> : <span aria-current="page">{l}</span>}
        </li>
      ))}
    </ol>
  </nav>
);