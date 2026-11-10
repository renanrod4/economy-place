'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { buttonCls, AffiliateNote } from '@/components/ui';
import { products, money, discountOf } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { useStore, to } from '@/lib/store';
import { CheckCircle, X, Loader2, Truck, Zap, Bell } from 'lucide-react';

export function ActiveAlerts() {
  const { toast } = useStore();
  const [hydrated, setHydrated] = useState(false);
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    productId: string;
    targetPrice: number;
    channel: 'whatsapp' | 'telegram';
    contact: string;
    createdAt: number;
  }>>([]);

  useEffect(() => {
    // Alerts are persisted client-side and must be loaded after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try {
      const stored = localStorage.getItem('ep:alerts');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setAlerts(JSON.parse(stored));
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAlerts([]);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('ep:alerts', JSON.stringify(alerts));
  }, [alerts, hydrated]);

  const removeAlert = (id: string) => {
    setAlerts((a) => a.filter((x) => x.id !== id));
    toast('Alerta removido', 'info');
  };

  const getProgress = (product: Product, targetPrice: number) => {
    if (product.price <= targetPrice) return 100;
    const range = product.oldPrice - targetPrice;
    const current = product.oldPrice - product.price;
    return Math.max(0, Math.min(100, Math.round((current / range) * 100)));
  };

  if (alerts.length === 0) {
    return (
      <div className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-8 text-center">
        <Bell className="mx-auto size-12 text-cinza-400" strokeWidth={1.5} />
        <h3 className="mt-4 text-[18px] font-bold text-tinta">Nenhum alerta ativo</h3>
        <p className="mt-2 text-[14px] text-cinza-600 max-w-md mx-auto">
          Crie seu primeiro alerta acima. Nós monitoramos o preço e te avisamos quando chegar no valor que você quer pagar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list" aria-label="Alertas ativos">
      {alerts.map((alert) => {
        const product = products.find((p) => p.id === alert.productId);
        const progress = product ? getProgress(product, alert.targetPrice) : 0;
        const reached = product && product.price <= alert.targetPrice;

        return (
          <article key={alert.id} className={cn('relative rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5', reached && 'ring-2 ring-verde-500')} role="listitem">
            <button
              type="button"
              onClick={() => removeAlert(alert.id)}
              className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-lilas-100 text-cinza-600 hover:bg-lilas-200 hover:text-roxo-700"
              aria-label="Remover alerta"
            >
              <X className="size-4" strokeWidth={2.5} />
            </button>

            {reached && (
              <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-verde-700 bg-verde-100 rounded-pill px-3 py-1">
                <CheckCircle className="size-4" strokeWidth={2.5} />
                Preço atingido! Valor atual: {product && money(product.price)}
              </div>
            )}

            <div className="flex gap-4">
              {product && (
                <img src={product.image} alt="" className="h-20 w-20 shrink-0 rounded-[12px] object-cover" />
              )}
              <div className="flex-1 min-w-0">
                {product && (
                  <h4 className="font-bold text-tinta line-clamp-1">{product.title}</h4>
                )}
                {!product && <p className="font-bold text-tinta">Produto removido</p>}
                <div className="mt-1 flex flex-wrap items-center gap-3 text-[13px] text-cinza-600">
                  <span>Alvo: <span className="font-bold text-vermelho-500">{money(alert.targetPrice)}</span></span>
                  <span>Atual: <span className="font-bold text-tinta">{product ? money(product.price) : '—'}</span></span>
                  <span className={cn('flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-extrabold', alert.channel === 'whatsapp' ? 'bg-verde-100 text-verde-700' : 'bg-lilas-100 text-roxo-700')}>
                    {alert.channel === 'whatsapp' ? (
                      <>
                        <Truck className="size-3.5" strokeWidth={2.5} /> WhatsApp
                      </>
                    ) : (
                      <>
                        <Zap className="size-3.5" strokeWidth={2.5} fill="currentColor" /> Telegram
                      </>
                    )}
                  </span>
                </div>

                <div className="mt-3" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progresso até o preço alvo: ${progress}%`}>
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-cinza-600">Preço original</span>
                    <span className="text-vermelho-500">Preço alvo</span>
                  </div>
                  <div className="h-3 bg-lilas-200 rounded-pill overflow-hidden">
                    <div
                      className={cn('h-full rounded-pill transition-all duration-500', reached ? 'bg-verde-500' : 'bg-roxo-700')}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[12px] text-cinza-600">
                    {progress}% até o preço desejado
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}