'use client';

import React from 'react';
import { Container, ProductCard, SectionTitle, ProductGrid } from '@/components/ui';
import { products } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { to } from '@/lib/store';

interface RelatedProductsProps {
  product: Product;
}

export function RelatedProducts({ product }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-title">
      <Container>
        <SectionTitle title="Também pode gostar" eyebrow="Mesma categoria" />
        <ProductGrid cols={4}>
          {related.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </ProductGrid>
      </Container>
    </section>
  );
}