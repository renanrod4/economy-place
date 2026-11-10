'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { buttonCls } from '@/components/ui';
import { products, money, discountOf } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';
import { useStore, to } from '@/lib/store';
import { CheckCircle, AlertCircle, Loader2, MessageSquare, Send } from 'lucide-react';

interface AlertFormProps {
  presetId?: string;
}

export function AlertForm({ presetId }: AlertFormProps) {
  const { toast } = useStore();
  const [productId, setProductId] = useState(presetId || '');
  const [targetPrice, setTargetPrice] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'telegram'>('whatsapp');
  const [contact, setContact] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedProduct = products.find((p) => p.id === productId);
  const currentPrice = selectedProduct?.price || 0;

  const suggestions = selectedProduct
    ? [
        Math.round(currentPrice * 0.95 * 100) / 100,
        Math.round(currentPrice * 0.9 * 100) / 100,
        Math.round(currentPrice * 0.85 * 100) / 100,
      ]
    : [];

  const isValid =
    productId &&
    targetPrice &&
    Number(targetPrice) > 0 &&
    Number(targetPrice) < currentPrice &&
    contact.trim().length >= 10 &&
    consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800)); // Simulate API call

    // In a real app, this would save to a database
    toast(`Alerta criado! Vamos te avisar no ${channel === 'whatsapp' ? 'WhatsApp' : 'Telegram'} quando ${selectedProduct?.title} chegar a ${money(Number(targetPrice))}.`, 'sucesso');
    setSubmitting(false);

    // Reset form
    setProductId('');
    setTargetPrice('');
    setContact('');
    setConsent(false);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="product" className="block mb-2 text-[14px] font-bold text-tinta">
          Produto <span className="text-vermelho-500">*</span>
        </label>
        <select
          id="product"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full h-12 rounded-campo border border-lilas-200 bg-white px-4 text-[15px] font-bold text-tinta placeholder-cinza-400 focus:border-roxo-500 focus:ring-2 focus:ring-roxo-500/20"
          required
        >
          <option value="">Selecione um produto</option>
          {products
            .filter((p) => p.available)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {money(p.price)}
              </option>
            ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="rounded-card bg-lilas-50/50 p-4 ring-1 ring-lilas-200">
          <p className="text-[14px] text-cinza-600">Preço atual: <span className="font-bold text-vermelho-500">{money(currentPrice)}</span></p>
          <p className="mt-1 text-[14px] text-cinza-600">
            Sugestões de preço alvo:
            <span className="flex flex-wrap gap-2 mt-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTargetPrice(String(s))}
                  className="h-8 rounded-pill bg-white px-3 text-[13px] font-bold text-roxo-700 ring-1 ring-lilas-200 hover:ring-roxo-500"
                >
                  {money(s)} (-{Math.round((1 - s / currentPrice) * 100)}%)
                </button>
              ))}
            </span>
          </p>
        </div>
      )}

      <div>
        <label htmlFor="targetPrice" className="block mb-2 text-[14px] font-bold text-tinta">
          Preço desejado <span className="text-vermelho-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-cinza-600">R$</span>
          <input
            id="targetPrice"
            type="number"
            step="0.01"
            min="0.01"
            max={currentPrice - 0.01 || 10000}
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="0,00"
            className="w-full h-12 rounded-campo border border-lilas-200 bg-white pl-10 pr-4 text-[16px] font-bold text-tinta placeholder-cinza-400 focus:border-roxo-500 focus:ring-2 focus:ring-roxo-500/20"
            required
            disabled={!productId}
          />
        </div>
        {targetPrice && Number(targetPrice) >= currentPrice && currentPrice > 0 && (
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-vermelho-500">
            <AlertCircle className="size-4" strokeWidth={2.5} />
            O preço desejado deve ser menor que o preço atual ({money(currentPrice)})
          </p>
        )}
        {targetPrice && Number(targetPrice) > 0 && Number(targetPrice) < currentPrice && (
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-verde-700">
            <CheckCircle className="size-4" strokeWidth={2.5} />
            Economia de {money(currentPrice - Number(targetPrice))} ({discountOf({ price: Number(targetPrice), oldPrice: currentPrice })}%)
          </p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-[14px] font-bold text-tinta">Canal de notificação <span className="text-vermelho-500">*</span></legend>
        <div className="flex gap-3">
          <label className={cn('flex-1 flex items-center justify-center gap-2 h-12 rounded-pill font-bold transition-colors border-2', channel === 'whatsapp' ? 'border-verde-500 bg-verde-50 text-verde-700' : 'border-lilas-200 text-cinza-600 hover:border-lilas-400')}>
            <input type="radio" name="channel" value="whatsapp" checked={channel === 'whatsapp'} onChange={() => setChannel('whatsapp')} className="sr-only" />
            <MessageSquare className="size-5 fill-current" /> WhatsApp
          </label>
          <label className={cn('flex-1 flex items-center justify-center gap-2 h-12 rounded-pill font-bold transition-colors border-2', channel === 'telegram' ? 'border-roxo-700 bg-lilas-100 text-roxo-700' : 'border-lilas-200 text-cinza-600 hover:border-lilas-400')}>
            <input type="radio" name="channel" value="telegram" checked={channel === 'telegram'} onChange={() => setChannel('telegram')} className="sr-only" />
            <Send className="size-5" strokeWidth={2.5} /> Telegram
          </label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact" className="block mb-2 text-[14px] font-bold text-tinta">
          {channel === 'whatsapp' ? 'WhatsApp (com DDD)' : 'Telegram (username ou telefone)'} <span className="text-vermelho-500">*</span>
        </label>
        <input
          id="contact"
          type="tel"
          value={contact}
          onChange={(e) => setContact(formatPhone(e.target.value))}
          placeholder={channel === 'whatsapp' ? '(11) 99999-9999' : '@usuario ou (11) 99999-9999'}
          className="w-full h-12 rounded-campo border border-lilas-200 bg-white px-4 text-[15px] font-bold text-tinta placeholder-cinza-400 focus:border-roxo-500 focus:ring-2 focus:ring-roxo-500/20"
          required
          maxLength={15}
        />
        <p className="mt-1.5 text-[12.5px] text-cinza-600">
          Usaremos apenas para enviar o alerta de preço. Sem spam.
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-5 w-5 rounded-campo border-lilas-200 text-roxo-700 focus:ring-roxo-500 accent-roxo-500"
          required
        />
        <span className="text-[13px] text-cinza-600">
          Concordo em receber notificações de alerta de preço e confirmo que li a <a href={to('/')} className="underline hover:text-roxo-700">Política de Privacidade</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={!isValid || submitting}
        className={cn(buttonCls('primario', 'lg', 'w-full'), submitting && 'opacity-70 cursor-not-allowed')}
      >
        {submitting ? (
          <>
            <Loader2 className="size-5 animate-spin" strokeWidth={2.5} /> Criando alerta...
          </>
        ) : (
          'Criar alerta de preço'
        )}
      </button>
    </form>
  );
}