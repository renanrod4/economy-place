"use client";

import Link from "next/link";
import { products } from "@/lib/data/products";
import {
  DealOfDay,
  WeekCarousel,
  WhatsAppBanner,
  Guides,
  CategoryStrip,
  Hero,
} from "@/components/home/HomeComponents";
import {
  Container,
  SectionTitle,
  ProductGrid,
  ProductCard,
} from "@/components/ui";

export default function Home() {
  const best = products.filter((p) => p.bestSeller && p.available).slice(0, 10);
  return (
    <>
      <Hero />
      <CategoryStrip />
      <section className="pt-14">
        <Container>
          <SectionTitle eyebrow="Escolhido a dedo hoje" title="Achadinho do dia" />
          <DealOfDay p={products[0]} />
        </Container>
      </section>
      <WeekCarousel />
      <section className="pb-14">
        <Container>
          <SectionTitle
            eyebrow="O que a galera está levando"
            title="Mais vendidos"
            action={
              <Link
                href="/categoria/todas?ordem=vendidos"
                className="hidden text-[15px] font-bold text-roxo-700 hover:underline md:block"
              >
                Ver todos
              </Link>
            }
          />
          <ProductGrid>
            {best.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </ProductGrid>
        </Container>
      </section>
      <WhatsAppBanner />
      <Guides />
    </>
  );
}