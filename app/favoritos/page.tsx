'use client';

import React, { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { Container, SectionTitle, ProductCard, ProductGrid, EmptyState, AffiliateNote, buttonCls, MLButton } from '@/components/ui';
import { useStore, to } from '@/lib/store';
import { products, money } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { Heart, ExternalLink, Share2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

function FavoritesContent() {
  const { favorites, toggleFavorite } = useStore();

  const favProducts = useMemo(() => {
    return favorites
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => !!p);
  }, [favorites]);

  const totalEconomy = useMemo(() => {
    return favProducts.reduce((sum, p) => sum + (p.oldPrice - p.price), 0);
  }, [favProducts]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meus favoritos no Economy Place',
          text: `Confira meus ${favProducts.length} achadinhos favoritos!`,
          url: window.location.origin,
        });
      } catch {
        // User cancelled
      }
    } else {
      // Fallback to clipboard
      const text = favProducts.map((p) => `${p.title} - ${money(p.price)} (${p.url})`).join('\n');
      await navigator.clipboard.writeText(text);
      alert('Lista copiada para a área de transferência!');
    }
  };

  const handleOpenAll = () => {
    favProducts.forEach((p) => window.open(p.url, '_blank', 'noopener,noreferrer'));
  };

  if (favProducts.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<Heart className="size-12 text-cinza-400" strokeWidth={1.5} />}
          title="Nenhum favorito ainda"
          description="Salve produtos que você gostou clicando no coração no card do produto."
          action={<Link href="/" className="mt-4 inline-flex h-11 items-center gap-2 rounded-pill bg-roxo-700 px-6 font-display text-[17px] font-extrabold text-white shadow-btn-roxo hover:bg-roxo-500">Ver ofertas</Link>}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[28px] text-roxo-700 md:text-[36px]">Meus favoritos</h1>
          <p className="mt-1 text-[14px] text-cinza-600">
            {favProducts.length} {favProducts.length === 1 ? 'produto salvo' : 'produtos salvos'} ·
            {totalEconomy > 0 && `Economia total: ${money(totalEconomy)}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleShare}
            className={cn(buttonCls('fantasma', 'md'), 'whitespace-nowrap')}
            disabled={favProducts.length === 0}
          >
            <Share2 className="size-5" strokeWidth={2.5} /> Compartilhar lista
          </button>
          <button
            type="button"
            onClick={handleOpenAll}
            className={cn(buttonCls('secundario', 'md'), 'whitespace-nowrap')}
            disabled={favProducts.length === 0}
          >
            <ExternalLink className="size-5" strokeWidth={2.5} /> Abrir todos no ML
          </button>
        </div>
      </div>

      <ProductGrid cols={4}>
        {favProducts.map((p) => (
          <ProductCard key={p.id} p={p} state="favoritado" />
        ))}
      </ProductGrid>

      <AffiliateNote className="mt-8" />
    </Container>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div className="h-64" />}>
      <FavoritesContent />
    </Suspense>
  );
}