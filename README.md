# Economy Place — Achadinhos • Promoções

> Um site que garimpa as melhores ofertas do Mercado Livre todo dia, com histórico de preço real pra você não cair em "metade do dobro".

---

## O que é isso?

O **Economy Place** é um portal de ofertas curado. A gente entra no Mercado Livre, procura os produtos que realmente valem a pena, confere o histórico de preço dos últimos 90 dias e coloca aqui pra você decidir com calma.

**O modelo:** Somos afiliados do Mercado Livre. Quando você clica em "Ver oferta", abre o produto lá no site deles (nova aba, link patrocinado). A compra, pagamento, entrega e garantia são 100% com o Mercado Livre e o vendedor.

---

## O que tem aqui

| Página | Pra que serve |
|--------|---------------|
| **Início** | Hero com destaque, 4 categorias, "Achadinho do dia" com contagem regressiva, carrossel da semana, mais vendidos, banner WhatsApp, guias de compra |
| **Categorias** | `/categoria/cozinha`, `/categoria/beleza`, etc. — lista filtrada com sidebar de filtros (preço, desconto, frete grátis, Full) |
| **Busca** | `/busca?q=air+fryer` — mesma estrutura, mas busca por texto |
| **Produto** | `/produto/air-fryer-mondial-4l` — galeria, preço com histórico gráfico (90 dias), ficha técnica, produtos relacionados, botão fixo no mobile |
| **Favoritos** | `/favoritos` — sua lista salva, abre tudo no ML de uma vez, compartilha a lista |
| **Comparador** | `/comparar` — até 3 produtos lado a lado, tabela alinhada, badges de "menor preço", "maior desconto" |
| **Alertas** | `/alertas` — escolhe produto, preço alvo, WhatsApp ou Telegram, a gente avisa quando chegar lá |
| **Black Friday** | `/black-friday` — página especial da campanha, contagem oficial, grid filtrável |
| **Link na bio** | `/bio` — versão mobile-first pro Instagram/TikTok |
| **Estados** | `/estados` — telas de erro, vazio, carregando (pra design/dev) |
| **Design System** | `/design/fundamentos`, `/design/componentes`, `/design/desktop`, `/design/mobile` — documentação visual completa |

---

## Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4** — tokens no `@theme` (cores, fontes, sombras, raios, breakpoints)
- **TypeScript** strict
- **Fontes:** Baloo 2 (títulos/preços/botões) + Nunito (textos) — via `next/font/google`
- **Ícones:** Lucide React
- **Estado global:** React Context + localStorage (favoritos, comparador, toasts)
- **Imagens:** Unsplash (produtos) + logo local
- **Deploy:** Vercel (recomendado)

---

## Estrutura de pastas

```
economy-place/
├── app/
│   ├── layout.tsx              # Root layout + fonts + metadata
│   ├── globals.css             # Design tokens (@theme) + base + utilities
│   ├── page.tsx                # Home
│   ├── categoria/[cat]/page.tsx
│   ├── busca/page.tsx
│   ├── produto/[id]/page.tsx
│   ├── favoritos/page.tsx
│   ├── comparar/page.tsx
│   ├── alertas/page.tsx
│   ├── black-friday/page.tsx
│   ├── bio/page.tsx
│   ├── estados/page.tsx
│   └── design/[page]/page.tsx
├── components/
│   ├── ui/index.tsx            # Design System (Button, Card, Seal, SearchPill, etc.)
│   ├── layout/                 # Header, Footer, MobileTabBar, Crumbs
│   ├── home/                   # Hero, CategoryStrip, DealOfDay, WeekCarousel, WhatsAppBanner, Guides
│   ├── listing/                # ListingContent, FilterPanel, FilterSheet
│   ├── product/                # Gallery, Info, PriceHistory, Specs, Related, StickyCTA
│   ├── favorites/
│   ├── compare/
│   ├── alerts/
│   └── campaign/
├── lib/
│   ├── types/product.ts        # Interfaces TypeScript
│   ├── data/                   # Mock data (20 produtos, 4 categorias, 3 guias)
│   ├── utils/                  # cn(), money(), discountOf(), installment(), datas
│   └── store/                  # StoreProvider + useStore (favoritos, compare, toasts)
└── public/assets/logo-economy-place.png
```

---

## Design System

### Cores principais
- **Roxo 900/700/500** — marca, fundos escuros, primária
- **Amarelo 500** — **botão principal (CTA)**, badge "Achadinho do dia"
- **Vermelho 500** — **só preço atual e badge de desconto** (urgência real)
- **Verde 700** — "Frete grátis" (acessível)
- **Fundo** `#FBF8FF` — background da página
- **Tinta** `#22163A` — texto principal

> Regra: nunca amarelo no branco. Texto no amarelo = roxo 900. Vermelho só pra preço/desconto.

### Tipografia
- **Display (Baloo 2 ExtraBold):** títulos, preços, botões
- **Corpo (Nunito 400/700):** textos, parcelamento, legendas

### Sombras 3D 
Sombras **sólidas, sem blur** — dão sensação de "brinquedo", profundidade tátil.
- `shadow-3d` (padrão): `0 6px 0 rgba(59,10,115,.18)`
- `shadow-3d-lg` (hover): `0 10px 0 rgba(59,10,115,.18)`
- Botões têm "click" físico: `hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none`

### Breakpoints
- `sm` 480px | `md` 768px | `lg` 1024px | `xl` 1280px (container 1200px)

---

## Componentes de UI 

Todos prontos, testados, acessíveis:

- **Logo / LogoMark** — selo circular + horizontal
- **Button** (5 variantes × 3 tamanhos) + **MLButton** (abre ML em nova aba)
- **DiscountBadge** (`-XX%`) + **Seal** (Frete grátis, Full, Mais vendido, Indisponível, Menor preço 90d)
- **SearchPill** (busca com enter → `/busca?q=`) + **Chip** (toggle com `aria-pressed`)
- **Price** (antigo riscado + atual vermelho + parcelamento) + **UpdatedLine** ("atualizado há X min")
- **FavButton** (coração, persiste no localStorage, sincroniza entre abas)
- **ProductCard** (4 estados: padrão, hover, favoritado, indisponível)
- **Countdown** (só aparece se tem data real de fim)
- **Toast / Toaster / EmptyState** (feedback completo)
- **Container / SectionTitle / ProductGrid** (layout helpers)

---

## Store Global

```ts
// useStore() te dá:
favorites: string[]           // IDs dos favoritos
toggleFavorite(id)            // add/remove + toast
isFavorite(id)                // boolean

compare: string[]             // máx 3
toggleCompare(id)             // add/remove + validação + toast

toasts: Toast[]
toast(text, kind?)            // sucesso / info / erro
dismiss(id)

// Helpers de navegação:
to('/categoria/cozinha')      // respeita NEXT_PUBLIC_BASE_PATH
go('/produto/xyz')            // navega programaticamente
useRoute()                    // lê pathname + searchParams (reativo)
```

**Persistência:** `localStorage` (`ep:fav`, `ep:cmp`) + sync cross-tab via evento `storage`.

---

## Mock Data

**20 produtos** em 4 categorias:

| Categoria | Produtos | Exemplo destaque |
|-----------|----------|------------------|
| Cozinha | 6 | Air Fryer Mondial 4L (36% off, best-seller, Full) |
| Beleza | 5 | Sérum Vitamina C 10% (31% off, best-seller) |
| Casa | 4 | Robô Aspirador 3 em 1 (40% off, best-seller, Full) |
| Viagem | 5 | Mala de Bordo 10kg (38% off, best-seller, Full) |

Cada produto tem: galeria (1-2 imgs Unsplash), specs, histórico 13 pontos (90 dias), seller, rating, reviews, vendidos, `updatedMin`, `endsAt?` (só air fryer tem, pra demo do countdown).

---

## Acessibilidade 

- **Foco visível:** anel amarelo 3px + contorno roxo 2px (funciona em fundo claro e escuro)
- **Alvos de toque:** mínimo 44×44px
- **Estados não só por cor:** `aria-pressed`, ícones (check/heart fill), labels de texto
- **ARIA:** `role="search"`, `role="timer"`, `aria-live="polite"`, `aria-label` em botões só-ícone
- **Skip link:** "Pular para o conteúdo" (tecla Tab no topo)
- **Reduced motion:** desliga animações se o usuário preferir
- **Contraste:** tudo ≥ 4.5:1 (AA) ou 3:1 (AA large)

---

## Como rodar

```bash
# Instala dependências
npm install

# Desenvolvimento (Turbopack)
npm run dev
# abre http://localhost:3000

# Build de produção
npm run build

# Preview produção
npm run start

# Lint
npm run lint
```

**Variável de ambiente opcional:**
- `NEXT_PUBLIC_BASE_PATH` — se for deployar em subpath (ex: `/economy-place`)

---

## Checklist rápido de testes

- [ ] Home carrega tudo: Hero, categorias, Achadinho do dia (countdown roda), carrossel da semana (setas funcionam), mais vendidos, banner WhatsApp, guias
- [ ] Navegação: Header, MobileTabBar (mobile), Breadcrumbs, Footer
- [ ] `/categoria/cozinha` → 6 produtos, filtros funcionam, ordenação, "Carregar mais"
- [ ] `/busca?q=air+fryer` → resultados; termo inexistente → empty state com sugestões
- [ ] `/produto/air-fryer-mondial-4l` → galeria thumbnails, PriceHistory (hover tooltip), Ficha, Relacionados, Sticky CTA mobile
- [ ] `/produto/perfume-floral` → indisponível (UnavailableBox)
- [ ] `/produto/air-fryer-mondial-4l?erro=preco` → PriceError + retry
- [ ] Favoritar → coração preenche, persiste, cross-tab sync, toast
- [ ] Comparar → adiciona até 3, remove, sugere da mesma categoria, badges "Menor preço"/"Maior desconto"
- [ ] Alertas → form valida (preço < atual, contato válido, consentimento), cria, mostra progresso, remove
- [ ] `/black-friday` → header escuro, hero countdown oficial, chips filtram grid
- [ ] `/bio` → mobile-first, 3 ofertas, 5 links sociais
- [ ] `/estados` → 4 estados renderizam
- [ ] `/design/*` → iframes navegáveis, tokens exportam JSON
- [ ] Build limpo: `npm run build` sem erros TS/ESLint
- [ ] Acessibilidade: Tab em todas as páginas, focus visible amarelo, screen reader anuncia certo

---

## Próximos passos

- [ ] **Admin real:** CRUD de ofertas, agendamento, logs de verificação de preço
- [ ] **API real:** Integração com API do Mercado Livre (preços, disponibilidade, comissão)
- [ ] **Push notifications:** Service Worker + Web Push para alertas
- [ ] **SEO avançado:** Sitemap dinâmico, schema.org Product/Offer/AggregateRating
- [ ] **Analytics:** Eventos `view_item`, `select_item`, `click_affiliate_link`
- [ ] **i18n:** PT/ES/EN com `next-intl`
- [ ] **Testes:** Vitest (unit), Playwright (e2e), Chromatic (visual regression)
- [ ] **Storybook:** Documentar componentes UI isoladamente

---

## Licença

Projeto proprietário — Economy Place. Código-fonte não é open source.

---

## Contato

- **Site:** `https://economyplace.com.br` (deploy)
- **Link na bio:** `/bio`
- **WhatsApp/Telegram:** Via página `/alertas`
- **Instagram/TikTok:** `@economyplace`
