'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

/* ---------- Toasts ---------- */
export type ToastKind = 'sucesso' | 'info' | 'erro';

export interface Toast {
  id: number;
  kind: ToastKind;
  text: string;
}

/* ---------- App store ---------- */
interface Store {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  compare: string[];
  toggleCompare: (id: string) => void;
  toasts: Toast[];
  toast: (text: string, kind?: ToastKind) => void;
  dismiss: (id: number) => void;
}

const Ctx = createContext<Store | null>(null);

const load = (k: string, d: string[]) => {
  try {
    return JSON.parse(localStorage.getItem(k) || '') as string[];
  } catch {
    return d;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFav] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Browser storage is loaded after hydration to keep SSR markup deterministic.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFav(load('ep:fav', ['air-fryer-mondial-4l', 'mala-bordo', 'serum-vitamina-c', 'perfume-floral']));
    setCompare(load('ep:cmp', ['mala-bordo', 'mala-media', 'mochila-viagem']));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('ep:fav', JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('ep:cmp', JSON.stringify(compare));
  }, [compare, hydrated]);

  useEffect(() => {
    const on = (e: StorageEvent) => {
      if (e.key === 'ep:fav') setFav(load('ep:fav', []));
      if (e.key === 'ep:cmp') setCompare(load('ep:cmp', []));
    };
    window.addEventListener('storage', on);
    return () => window.removeEventListener('storage', on);
  }, []);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (text: string, kind: ToastKind = 'sucesso') => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t.slice(-2), { id, kind, text }]);
      setTimeout(() => dismiss(id), 3800);
    },
    [dismiss],
  );

  const value = useMemo<Store>(
    () => ({
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) => {
        const had = favorites.includes(id);
        setFav((f) => (had ? f.filter((x) => x !== id) : [...f, id]));
        toast(had ? 'Removido dos favoritos' : 'Salvo nos favoritos', had ? 'info' : 'sucesso');
      },
      compare,
      toggleCompare: (id) => {
        if (compare.includes(id)) {
          setCompare((c) => c.filter((x) => x !== id));
          toast('Removido do comparador', 'info');
        } else if (compare.length >= 3) {
          toast('O comparador aceita até 3 produtos. Remova um para adicionar.', 'erro');
        } else {
          setCompare((c) => [...c, id]);
          toast('Adicionado ao comparador');
        }
      },
      toasts,
      toast,
      dismiss,
    }),
    [favorites, compare, toasts, toast, dismiss],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error('StoreProvider ausente');
  return s;
};

/* ---------- Helpers de navegação (para uso em Server Components) ---------- */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';
export const to = (path: string) => BASE + (path.startsWith('/') ? path : `/${path}`);

/* ---------- Client-side navigation helpers ---------- */
const NAV = 'ep:navigate';

function readRoute(currentUrl?: URL) {
  const url = currentUrl ?? new URL(window.location.href);
  if (!currentUrl && url.hash.startsWith('#/')) {
    window.history.replaceState(null, '', to(window.location.hash.slice(1)));
    return readRoute();
  }
  let path = url.pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  path = path.replace(/\/+$/, '') || '/';
  return { path, params: new URLSearchParams(url.search) };
}

export function useRoute() {
  const router = useRouter();
  const [route, setRoute] = useState(() => ({ path: '/', params: new URLSearchParams() }));
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Read the browser URL after hydration so the server and client render the same shell.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoute(readRoute());
    const on = () => {
      setRoute(readRoute());
      if (!window.location.hash) window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', on);
    window.addEventListener(NAV, on);
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const raw = a.getAttribute('href') || '';
      if (!raw.startsWith('/')) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
      setRoute(readRoute(url));
      if (!url.hash) window.scrollTo({ top: 0 });
    };
    document.addEventListener('click', click);
    return () => {
      window.removeEventListener('popstate', on);
      window.removeEventListener(NAV, on);
      document.removeEventListener('click', click);
    };
  }, [router]);
  return route;
}

export const go = (path: string) => {
  if (typeof window === 'undefined') return;
  window.history.pushState(null, '', to(path));
  window.dispatchEvent(new Event(NAV));
};

export const isFrame = () => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('frame');
};