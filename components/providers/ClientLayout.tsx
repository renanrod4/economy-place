'use client';

import React, { ReactNode, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { StoreProvider } from '@/lib/store';
import { Toaster } from '@/components/ui/Toaster';
import { Header, Footer, MobileTabBar } from '@/components/layout';
import { useRoute, isFrame } from '@/lib/store';
import { to } from '@/lib/store';
import { Palette } from 'lucide-react';

function Providers({ children }: { children: ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}

function ClientLayoutContent({ children }: { children: ReactNode }) {
  const { path } = useRoute();
  const pathname = usePathname();
  const isCampaign = pathname === '/black-friday';
  const isAdmin = pathname === '/admin';

  return (
    <Providers>
      {!isCampaign && !isAdmin && <Header path={path} />}
      <main id="conteudo">{children}</main>
      {!isCampaign && !isAdmin && <Footer />}
      {!isCampaign && !isAdmin && <MobileTabBar path={path} />}
      <Toaster />
      {!isCampaign && !isAdmin && !isFrame() && (
        <a href={to('/design')} className="fixed bottom-20 right-4 z-50 flex h-11 items-center gap-2 rounded-pill bg-tinta px-4 text-[13px] font-bold text-white shadow-[0_4px_0_rgba(0,0,0,.25)] hover:bg-roxo-900 lg:bottom-5">
          <Palette className="size-4" /> Design System
        </a>
      )}
    </Providers>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  );
}