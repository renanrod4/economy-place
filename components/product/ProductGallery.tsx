'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronLeft, ChevronRight, X, Maximize } from 'lucide-react';
import type { Product } from '@/lib/types/product';

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = product.gallery.length > 0 ? product.gallery : [product.image];

  const goPrev = () => setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
        <button
          type="button"
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          aria-label="Fechar"
        >
          <X className="size-6" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 z-10 grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 lg:h-16 lg:w-16"
          aria-label="Anterior"
        >
          <ChevronLeft className="size-7" strokeWidth={3} />
        </button>
        <div className="relative flex-1 flex items-center justify-center px-4">
          <img
            src={images[selectedIndex]}
            alt={`${product.title} - imagem ${selectedIndex + 1} de ${images.length}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        </div>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 z-10 grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 lg:h-16 lg:w-16"
          aria-label="Próxima"
        >
          <ChevronRight className="size-7" strokeWidth={3} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" aria-hidden>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn('h-2 w-10 rounded-full transition-colors', i === selectedIndex ? 'bg-white' : 'bg-white/30')}
              aria-label={`Ir para imagem ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-[24px] bg-neutro-img">
        <img
          src={images[selectedIndex]}
          alt={`${product.title} - imagem principal`}
          className="size-full object-cover transition-opacity duration-200"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-roxo-700 shadow-3d hover:bg-white lg:left-4 lg:h-14 lg:w-14"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="size-6" strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-roxo-700 shadow-3d hover:bg-white lg:right-4 lg:h-14 lg:w-14"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="size-6" strokeWidth={3} />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-roxo-700 shadow-3d hover:bg-white lg:right-4 lg:bottom-4 lg:h-11 lg:w-11"
          aria-label="Ampliar imagem"
        >
          <Maximize className="size-5" strokeWidth={2.5} />
        </button>
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Miniaturas">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn(
                'relative shrink-0 h-20 w-20 rounded-[12px] overflow-hidden ring-2 transition-all',
                i === selectedIndex ? 'ring-roxo-500 shadow-3d' : 'ring-transparent hover:ring-lilas-200'
              )}
              aria-label={`Miniatura ${i + 1}`}
              aria-current={i === selectedIndex ? 'true' : 'false'}
            >
              <img src={img} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}