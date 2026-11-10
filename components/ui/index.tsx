import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import type { Product } from '@/lib/types/product';
import { FavButton } from './FavButton';
import { EmptyState } from './EmptyState';

/* ============ Logo ============ */
export function LogoMark({ size = 48, className, decorative }: { size?: number; className?: string; decorative?: boolean }) {
  return (
    <span className={cn('inline-block shrink-0 overflow-hidden rounded-full', className)} style={{ width: size, height: size }}>
      <img
        src="/assets/logo-economy-place.png"
        alt={decorative ? '' : 'Economy Place &#x2014; Achadinhos &#x2022; Promo&#xE7;&#xF5;es'}
        width={size}
        height={size}
        className="size-full scale-[1.04] object-cover"
      />
    </span>
  );
}

interface LogoProps {
  light?: boolean;
  compact?: boolean;
  className?: string;
}

export function Logo({ light = true, compact = false, className }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5 rounded-pill', className)} aria-label="Economy Place &#x2014; p&#xE1;gina inicial">
      <LogoMark size={compact ? 46 : 56} decorative className="ring-2 ring-white/30" />
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[22px] font-extrabold tracking-tight', light ? 'text-white' : 'text-roxo-700')}>
          Economy Place
        </span>
        {!compact && (
          <span className={cn('mt-0.5 text-[11.5px] font-bold uppercase tracking-[0.12em]', light ? 'text-amarelo-400' : 'text-roxo-500')}>
            Achadinhos &#x2022; Promo&#xE7;&#xF5;es
          </span>
        )}
      </span>
    </Link>
  );
}

/* ============ Bot&#xF5;es ============ */
type Variant = 'primario' | 'secundario' | 'fantasma' | 'fantasma-claro' | 'vermelho';
type Size = 'sm' | 'md' | 'lg';

const variantCls: Record<Variant, string> = {
  primario: 'bg-amarelo-500 text-roxo-900 shadow-btn-amarelo hover:bg-amarelo-400',
  secundario: 'bg-roxo-700 text-white shadow-btn-roxo hover:bg-roxo-500',
  fantasma: 'bg-white text-roxo-700 ring-2 ring-inset ring-roxo-700/25 hover:ring-roxo-700 hover:bg-lilas-100',
  'fantasma-claro': 'bg-white/10 text-white ring-2 ring-inset ring-white/40 hover:bg-white/20 hover:ring-white',
  vermelho: 'bg-vermelho-700 text-white shadow-btn-vermelho hover:bg-vermelho-500',
};

const sizeCls: Record<Size, string> = {
  sm: 'h-11 px-4 text-[15px] gap-1.5',
  md: 'h-12 px-6 text-[17px] gap-2',
  lg: 'h-14 px-8 text-[19px] gap-2.5',
};

export function buttonCls(variant: Variant = 'primario', size: Size = 'md', extra?: string) {
  const pressable = variant !== 'fantasma' && variant !== 'fantasma-claro';
  return cn(
    'inline-flex select-none items-center justify-center whitespace-nowrap rounded-pill font-display font-extrabold leading-none transition-all duration-150',
    'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    pressable && 'hover:translate-y-[1px] active:translate-y-[4px] active:shadow-none',
    variantCls[variant],
    sizeCls[size],
    extra,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = 'primario',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" className={buttonCls(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/** CTA principal do modelo de afiliado: sempre abre o Mercado Livre em nova aba. */
interface MLButtonProps {
  product: Product;
  size?: Size;
  label?: string;
  className?: string;
  full?: boolean;
}

export function MLButton({ product, size = 'md', label = 'Ver oferta no Mercado Livre', className, full }: MLButtonProps) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className={buttonCls('primario', size, cn(full && 'w-full', className))}
      onClick={(e) => e.stopPropagation()}
    >
      {label}
      <svg className="size-[1.05em] shrink-0" strokeWidth={2.75} aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

/* ============ Selos ============ */
interface DiscountBadgeProps {
  value: number;
  className?: string;
}

export function DiscountBadge({ value, className }: DiscountBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-8 items-center rounded-pill bg-vermelho-500 px-3 font-display text-[19px] font-extrabold leading-none text-white shadow-[0_3px_0_#9e150d]',
        className,
      )}
      aria-label={`${value}% de desconto`}
    >
      -{value}%
    </span>
  );
}

type SealKind = 'frete' | 'full' | 'maisvendido' | 'indisponivel' | 'menorpreco';

interface SealProps {
  kind: SealKind;
  className?: string;
}

function TruckIcon() {
  return <svg className="size-3.5" strokeWidth={2.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="15" y2="3" /></svg>;
}
function ZapIcon() {
  return <svg className="size-3.5 fill-current" strokeWidth={2} viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function FlameIcon() {
  return <svg className="size-3.5" strokeWidth={2.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1.172-3.184" /></svg>;
}
function BanIcon() {
  return <svg className="size-3.5" strokeWidth={2.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /><line x1="4.9" x2="19.1" y1="4.9" y2="19.1" /></svg>;
}
function SparklesIcon() {
  return <svg className="size-3.5" strokeWidth={2.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>;
}

export function Seal({ kind, className }: SealProps) {
  const map = {
    frete: { cls: 'bg-verde-100 text-verde-700', icon: <TruckIcon />, text: 'Frete gr&#xE1;tis' },
    full: { cls: 'bg-roxo-900 text-amarelo-400', icon: <ZapIcon />, text: 'Full' },
    maisvendido: { cls: 'bg-laranja-500 text-roxo-900', icon: <FlameIcon />, text: 'Mais vendido' },
    indisponivel: { cls: 'bg-cinza-200 text-cinza-600', icon: <BanIcon />, text: 'Indispon&#xED;vel' },
    menorpreco: { cls: 'bg-lilas-100 text-roxo-700', icon: <SparklesIcon />, text: 'Menor pre&#231;o em 90 dias' },
  }[kind];

  return (
    <span className={cn('inline-flex h-6 items-center gap-1 rounded-pill px-2.5 text-[12.5px] font-extrabold', map.cls, className)}>
      {map.icon}
      {map.text}
    </span>
  );
}

/* ============ Pre&#xE7;o ============ */
import { money, installment, discountOf } from '@/lib/data/products';

interface PriceProps {
  p: Product;
  size?: 'md' | 'lg';
}

export function Price({ p, size = 'md' }: PriceProps) {
  const off = !p.available;
  return (
    <div>
      <div className="text-[13px] text-cinza-600">
        <span className="sr-only">Pre&#231;o anterior: </span>
        {money(p.oldPrice)}
      </div>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'font-display font-extrabold leading-none tracking-tight',
            size === 'lg' ? 'text-[44px]' : 'text-[28px]',
            off ? 'text-cinza-600' : 'text-vermelho-500',
          )}
        >
          <span className="sr-only">Pre&#231;o atual: </span>
          {money(p.price)}
        </span>
      </div>
      <div className="mt-1 text-[13px] font-bold text-tinta">{installment(p)}</div>
    </div>
  );
}

interface UpdatedLineProps {
  min: number;
  className?: string;
}

export const UpdatedLine = ({ min, className }: UpdatedLineProps) => (
  <p className={cn('flex items-center gap-1 text-[12px] text-cinza-600', className)}>
    <ClockIcon className="size-3.5" aria-hidden />
    Pre&#231;o atualizado h&#225; {min} min
  </p>
);

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

/* ============ Chips ============ */
interface ChipProps {
  selected?: boolean;
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
}

export function Chip({ selected, children, onClick, icon }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'inline-flex h-11 shrink-0 items-center gap-2 rounded-pill px-4 text-[15px] font-bold transition-colors',
        selected
          ? 'bg-roxo-700 text-white shadow-btn-roxo'
          : 'bg-white text-roxo-700 ring-2 ring-inset ring-lilas-200 hover:ring-roxo-500',
      )}
    >
      {selected ? <CheckIcon className="size-4" strokeWidth={3} aria-hidden /> : icon}
      {children}
    </button>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} strokeWidth={3} viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12" /></svg>;
}

/* ============ Card de produto ============ */
export type CardState = 'padrao' | 'hover' | 'favoritado' | 'indisponivel';

interface ProductCardProps {
  p: Product;
  state?: CardState;
}

export function ProductCard({ p, state }: ProductCardProps) {
  const unavailable = state === 'indisponivel' || (!state && !p.available);
  const forcedHover = state === 'hover';
  const off = discountOf(p);
  const href = `/produto/${p.id}`;

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-card bg-white p-2.5 ring-1 ring-lilas-200 transition-all duration-200 sm:p-3',
        forcedHover ? '-translate-y-1 shadow-3d-lg ring-2 ring-roxo-500' : 'shadow-3d',
        !unavailable && 'hover:-translate-y-1 hover:shadow-3d-lg hover:ring-2 hover:ring-roxo-500',
      )}
      aria-label={p.title}
    >
      <a href={href} className="relative block aspect-square overflow-hidden rounded-[12px] bg-neutro-img" tabIndex={-1} aria-hidden>
        <img
          src={p.image}
          alt=""
          loading="lazy"
          className={cn(
            'size-full object-cover transition-transform duration-300',
            forcedHover ? 'scale-105' : 'group-hover:scale-105',
            unavailable && 'opacity-50 grayscale',
          )}
        />
        {unavailable && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-fit">
            <Seal kind="indisponivel" className="h-7 bg-white px-3 text-[13px] shadow-3d-sm" />
          </span>
        )}
      </a>
      {!unavailable && <DiscountBadge value={off} className="absolute left-4 top-4 sm:left-5 sm:top-5" />}
      <FavButton id={p.id} forced={state === 'favoritado' ? true : state ? false : undefined} className="absolute right-4 top-4 sm:right-5 sm:top-5" />

      <div className="flex flex-1 flex-col px-1 pt-3">
        <div className="mb-1.5 flex min-h-6 flex-wrap gap-1">
          {p.full && <Seal kind="full" />}
          {p.bestSeller && <Seal kind="maisvendido" className="max-sm:hidden" />}
        </div>
        <h3 className="font-body text-[14px] font-bold leading-snug text-tinta sm:text-[15px]">
          <a href={href} className="line-clamp-2 min-h-[2.75em] hover:text-roxo-700 hover:underline focus-visible:rounded">
            {p.title}
          </a>
        </h3>
        <div className="mt-2">
          <Price p={p} />
        </div>
        <div className="mt-1.5 min-h-6">{p.freeShipping && !unavailable && <Seal kind="frete" />}</div>
        <div className="mt-auto pt-3">
          {unavailable ? (
            <a href={`/alertas?produto=${p.id}`} className={buttonCls('fantasma', 'sm', 'w-full')}>
              <BellIcon className="size-4" strokeWidth={2.5} aria-hidden /> Avise-me
            </a>
          ) : (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className={buttonCls('primario', 'sm', cn('w-full', forcedHover && 'bg-amarelo-400'))}
            >
              Ver oferta <ExternalLinkIcon className="size-4" strokeWidth={2.75} aria-hidden />
              <span className="sr-only"> no Mercado Livre (abre em nova aba)</span>
            </a>
          )}
          <UpdatedLine min={p.updatedMin} className="mt-2 justify-center" />
        </div>
      </div>
    </article>
  );
}

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} strokeWidth={2.5} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}
function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} strokeWidth={2.75} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-card bg-white p-3 ring-1 ring-lilas-200 shadow-3d" aria-hidden>
      <div className="shimmer aspect-square rounded-[12px]" />
      <div className="shimmer mt-4 h-4 w-11/12 rounded-pill" />
      <div className="shimmer mt-2 h-4 w-2/3 rounded-pill" />
      <div className="shimmer mt-4 h-3 w-1/3 rounded-pill" />
      <div className="shimmer mt-2 h-7 w-1/2 rounded-pill" />
      <div className="shimmer mt-2 h-3 w-3/4 rounded-pill" />
      <div className="shimmer mt-5 h-11 w-full rounded-pill" />
    </div>
  );
}

/* ============ Aviso de afiliado ============ */
import { AFFILIATE_NOTE } from '@/lib/data/products';

interface AffiliateNoteProps {
  onDark?: boolean;
  className?: string;
}

export function AffiliateNote({ onDark, className }: AffiliateNoteProps) {
  return (
    <p className={cn('flex items-start gap-1.5 text-[12px] leading-snug', onDark ? 'text-white/75' : 'text-cinza-600', className)}>
      <InfoIcon className="mt-px size-3.5 shrink-0" aria-hidden />
      {AFFILIATE_NOTE}
    </p>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" /></svg>;
}

/* ============ Layout helpers ============ */
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn('mx-auto w-full max-w-[1200px] px-4 md:px-6', className)}>{children}</div>
);

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
}

export function SectionTitle({ eyebrow, title, action }: SectionTitleProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 text-[13px] font-extrabold uppercase tracking-[0.14em] text-roxo-500">{eyebrow}</p>}
        <h2 className="text-[28px] text-roxo-700 md:text-[36px]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

interface ProductGridProps {
  children: ReactNode;
  cols?: 4 | 5;
}

export const ProductGrid = ({ children, cols = 5 }: ProductGridProps) => (
  <div className={cn('grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3', cols === 5 ? 'lg:grid-cols-4 xl:grid-cols-5' : 'lg:grid-cols-4')}>{children}</div>
);

export { EmptyState } from './EmptyState';