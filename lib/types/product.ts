export type Category = 'casa' | 'cozinha' | 'beleza' | 'viagem';

export interface Product {
  id: string;
  title: string;
  category: Category;
  image: string;
  gallery: string[];
  price: number;
  oldPrice: number;
  installments: number;
  freeShipping: boolean;
  full: boolean;
  bestSeller: boolean;
  seller: string;
  sellerTag: string;
  rating: number;
  reviews: number;
  sold: string;
  updatedMin: number;
  available: boolean;
  specs: Record<string, string>;
  history: number[]; // últimos 90 dias, 1 ponto a cada ~7,5 dias
  url: string;
  /** Data real de fim da oferta (informada pelo vendedor/campanha). Opcional. */
  endsAt?: string;
}

export interface Guide {
  id: string;
  title: string;
  tag: string;
  read: string;
  image: string;
}