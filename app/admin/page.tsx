'use client';

import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { products, categories, discountOf, money } from '@/lib/data/products';
import { cn } from '@/lib/utils/cn';
import {
  Check, CheckCircle2, Clock3, Copy, ExternalLink, Inbox, LogIn, PackageCheck,
  Search, ShieldCheck, Sparkles, Trash2, Wrench, X,
} from 'lucide-react';

type Status = 'pendentes' | 'concluidos' | 'descartados';
type Category = 'todas' | (typeof categories)[number]['id'];
type Product = (typeof products)[number];
type DiscardReason = 'Desconto falso' | 'Produto ruim/avaliação baixa' | 'Já divulgado' | 'Fora do nicho' | 'Outro';

const pendingSeed = products.filter((p) => p.available).slice(0, 10);
const completedSeed = products.filter((p) => p.available).slice(10, 18);
const discardReasons: DiscardReason[] = ['Desconto falso', 'Produto ruim/avaliação baixa', 'Já divulgado', 'Fora do nicho', 'Outro'];

function AdminHeader({ email, onLogout }: { email?: string; onLogout?: () => void }) {
  return (
    <header className="bg-roxo-900 text-white shadow-[0_4px_0_rgba(59,10,115,.25)]">
      <div className="h-2 bg-[repeating-linear-gradient(135deg,#ffc20e_0_16px,#ffc20e_16px_25px,#3b0a73_25px_34px,#3b0a73_34px_43px)]" />
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <a href="/admin" className="flex items-center gap-3" aria-label="Economy Place — Painel">
          <img src="/assets/logo-economy-place.png" alt="" className="size-10 rounded-full" />
          <span className="font-display text-[20px] font-extrabold">Economy Place</span>
          <span className="rounded-pill bg-amarelo-500 px-3 py-1 text-[13px] font-extrabold text-roxo-900">Painel</span>
        </a>
        {email && <div className="flex items-center gap-4 text-[14px]"><span className="hidden text-white/75 sm:inline">{email}</span><button type="button" onClick={onLogout} className="flex h-10 items-center gap-2 rounded-pill border border-white/30 px-4 font-bold hover:bg-white/10"><LogIn className="size-4 rotate-180" /> Sair</button></div>}
      </div>
    </header>
  );
}

function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    onLogin(email || 'admin@economyplace.com.br');
  };
  return <div className="min-h-screen bg-fundo"><AdminHeader /><div className="mx-auto flex min-h-[calc(100vh-74px)] max-w-[520px] items-center justify-center px-4 py-12"><form onSubmit={submit} className="w-full rounded-card bg-white p-6 shadow-3d ring-1 ring-lilas-200 sm:p-10"><div className="text-center"><img src="/assets/logo-economy-place.png" alt="Economy Place — Achadinhos e Promoções" className="mx-auto size-16 rounded-full" /><h1 className="mt-4 text-[30px] text-roxo-700">Entrar no painel</h1><p className="mt-2 text-[15px] text-cinza-600">Área restrita para revisar e publicar ofertas.</p></div><label className="mt-8 block text-[14px] font-bold text-tinta" htmlFor="admin-email">E-mail</label><input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@economyplace.com.br" className="mt-2 h-12 w-full rounded-campo border border-lilas-200 px-4 outline-none focus:border-roxo-500 focus:ring-2 focus:ring-roxo-500/20" required /><label className="mt-5 block text-[14px] font-bold text-tinta" htmlFor="admin-password">Senha</label><input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-2 h-12 w-full rounded-campo border border-lilas-200 px-4 outline-none focus:border-roxo-500 focus:ring-2 focus:ring-roxo-500/20" required /><button type="submit" disabled={loading} className="mt-6 flex h-14 w-full items-center justify-center rounded-pill bg-amarelo-500 font-display text-[18px] font-extrabold text-roxo-900 shadow-btn-amarelo hover:bg-amarelo-400 disabled:opacity-60">{loading ? 'Entrando…' : 'Entrar'}</button><p className="mt-4 text-center text-[12px] text-cinza-600">Demonstração: qualquer e-mail e senha funcionam.</p></form></div></div>;
}

function StatusCard({ icon: Icon, tone, title, children }: { icon: typeof CheckCircle2; tone: string; title: string; children: ReactNode }) {
  return <div className="rounded-card bg-white p-5 shadow-3d ring-1 ring-lilas-200"><div className={cn('mb-3 grid size-9 place-items-center rounded-full', tone)}><Icon className="size-5" /></div><p className="text-[12px] font-extrabold uppercase tracking-wide text-cinza-600">{title}</p><div className="mt-1 text-[15px] font-bold text-tinta">{children}</div></div>;
}

function OfferCard({ product, mode, onApprove, onDiscard, onRemove }: { product: Product; mode: 'pending' | 'completed' | 'discarded'; onApprove?: () => void; onDiscard?: () => void; onRemove?: () => void }) {
  return <article className="rounded-card bg-white p-4 shadow-3d ring-1 ring-lilas-200 md:p-5"><div className="flex gap-4"><img src={product.image} alt="" className="size-24 shrink-0 rounded-[14px] object-cover sm:size-28" /><div className="min-w-0 flex-1"><h2 className="font-display text-[18px] font-extrabold text-tinta">{product.title}</h2><p className="mt-1 text-[13px] text-cinza-600">{categories.find((c) => c.id === product.category)?.label} · {product.seller}</p><div className="mt-2 flex flex-wrap items-center gap-2"><strong className="text-[20px] text-vermelho-500">{money(product.price)}</strong><span className="text-[13px] text-cinza-600 line-through">{money(product.oldPrice)}</span><span className="rounded-pill bg-vermelho-500 px-2.5 py-1 text-[12px] font-extrabold text-white">-{discountOf(product)}%</span>{product.full && <span className="rounded-pill bg-roxo-700 px-2.5 py-1 text-[12px] font-extrabold text-white">Full</span>}</div><p className="mt-2 text-[13px] text-cinza-600">★ {product.rating.toFixed(1)} de 5 estrelas · {product.sold}</p>{mode === 'pending' && <p className="mt-2 flex items-center gap-1 text-[12px] text-cinza-600"><Clock3 className="size-3.5" /> Coletado hoje 06:00</p>}{mode === 'completed' && <p className="mt-2 flex items-center gap-1 text-[12px] font-bold text-verde-700"><PackageCheck className="size-3.5" /> No ar · Verificado há 1 min</p>}{mode === 'discarded' && <p className="mt-2 flex items-center gap-1 text-[12px] text-vermelho-700"><Trash2 className="size-3.5" /> Descartado</p>}</div><div className="hidden flex-col items-end justify-between sm:flex"><a href={product.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="flex items-center gap-1 text-[13px] font-bold text-roxo-700 hover:underline">Ver no Mercado Livre <ExternalLink className="size-3.5" /></a>{mode === 'pending' && <div className="flex gap-2"><button type="button" onClick={onApprove} className="h-11 rounded-pill bg-amarelo-500 px-5 font-display font-extrabold text-roxo-900 shadow-btn-amarelo"><Check className="mr-1 inline size-4" /> Aprovar</button><button type="button" onClick={onDiscard} className="h-11 rounded-pill px-5 font-display font-extrabold text-roxo-700 ring-2 ring-inset ring-lilas-200 hover:bg-lilas-100"><X className="mr-1 inline size-4" /> Descartar</button></div>}{mode === 'completed' && <div className="flex gap-2"><button type="button" onClick={() => navigator.clipboard.writeText(product.url)} className="text-[13px] font-bold text-roxo-700 hover:underline"><Copy className="mr-1 inline size-4" /> Copiar link</button><button type="button" onClick={onRemove} className="text-[13px] font-bold text-vermelho-700 hover:underline">Remover do site</button></div>}{mode === 'discarded' && <button type="button" onClick={onRemove} className="text-[13px] font-bold text-roxo-700 hover:underline">Desfazer descarte</button>}</div></div></article>;
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-roxo-900/45 p-4" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div role="dialog" aria-modal="true" aria-labelledby="admin-modal-title" className="max-h-[90vh] w-full max-w-[560px] overflow-auto rounded-card bg-white p-6 shadow-3d-lg"><div className="flex items-center justify-between"><h2 id="admin-modal-title" className="text-[24px] text-roxo-700">{title}</h2><button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full text-cinza-600 hover:bg-lilas-100" aria-label="Fechar"><X /></button></div>{children}</div></div>;
}

export default function AdminPage() {
  const [email, setEmail] = useState<string>();
  const [status, setStatus] = useState<Status>('pendentes');
  const [category, setCategory] = useState<Category>('todas');
  const [discount, setDiscount] = useState(0);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'recentes' | 'desconto' | 'vendidos'>('recentes');
  const [pending, setPending] = useState(pendingSeed);
  const [completed, setCompleted] = useState(completedSeed);
  const [discarded, setDiscarded] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [approveProduct, setApproveProduct] = useState<Product>();
  const [affiliate, setAffiliate] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [discardProduct, setDiscardProduct] = useState<Product>();
  const [bulkDiscard, setBulkDiscard] = useState(false);
  const [notice, setNotice] = useState('');
  const [validation, setValidation] = useState('14:00');
  const [canUndo, setCanUndo] = useState(false);

  const visible = useMemo(() => {
    const source = status === 'pendentes' ? pending : status === 'concluidos' ? completed : discarded;
    return source.filter((p) => category === 'todas' || p.category === category).filter((p) => discountOf(p) >= discount).filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'desconto' ? discountOf(b) - discountOf(a) : sort === 'vendidos' ? b.reviews - a.reviews : 0);
  }, [category, completed, discarded, discount, pending, query, sort, status]);

  const notify = (message: string, undo = false) => { setNotice(message); setCanUndo(undo); window.setTimeout(() => { setNotice(''); setCanUndo(false); }, 3500); };
  const removePending = (product: Product, destination: 'completed' | 'discarded', reason?: string) => {
    setPending((items) => items.filter((item) => item.id !== product.id));
    setSelected((items) => items.filter((id) => id !== product.id));
    if (destination === 'completed') setCompleted((items) => [product, ...items]);
    else setDiscarded((items) => [product, ...items]);
    notify(destination === 'completed' ? 'Oferta aprovada e publicada no site' : `Oferta descartada · ${reason}`, destination === 'discarded');
  };
  const approve = async () => {
    if (!approveProduct || !affiliate.trim()) return;
    setPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    removePending(approveProduct, 'completed');
    setPublishing(false);
    setApproveProduct(undefined);
    setAffiliate('');
  };
  const discard = (reason: DiscardReason) => {
    if (bulkDiscard) {
      const ids = new Set(selected);
      const chosen = pending.filter((p) => ids.has(p.id));
      setPending((items) => items.filter((p) => !ids.has(p.id)));
      setDiscarded((items) => [...chosen, ...items]);
      setSelected([]);
      setBulkDiscard(false);
      notify(`${chosen.length} ofertas descartadas · ${reason}`, true);
    } else if (discardProduct) {
      removePending(discardProduct, 'discarded', reason);
      setDiscardProduct(undefined);
    }
  };
  const undoLast = () => {
    const product = discarded[0];
    if (!product) return;
    setDiscarded((items) => items.slice(1));
    setPending((items) => [product, ...items]);
    setCanUndo(false);
    notify('Descarte desfeito');
  };

  if (!email) return <Login onLogin={setEmail} />;
  const counts = { pendentes: pending.length, concluidos: completed.length, descartados: discarded.length };
  return <div className="min-h-screen bg-fundo"><AdminHeader email={email} onLogout={() => setEmail(undefined)} /><div className="mx-auto max-w-[1200px] px-4 py-8 pb-16"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h1 className="text-[32px] text-roxo-700 md:text-[40px]">Revisão de ofertas</h1><p className="mt-1 text-[15px] text-cinza-600">Aprove as boas com seu link de afiliado e descarte as ruins.</p></div><p className="text-[14px] text-cinza-600">Próxima coleta: <strong className="text-tinta">amanhã 06:00</strong></p></div>
    <section aria-label="Status das automações" className="mt-7 grid gap-4 md:grid-cols-3"><StatusCard icon={CheckCircle2} tone="bg-verde-100 text-verde-700" title="OK · Última coleta"><strong>hoje 06:00</strong><span className="mt-1 block font-normal text-cinza-600">87 encontradas · 23 novas · 0 erros</span></StatusCard><StatusCard icon={ShieldCheck} tone="bg-lilas-100 text-roxo-700" title="Última validação"><strong>{validation}</strong><span className="mt-1 block font-normal text-cinza-600">41 verificadas · 2 expiraram</span><button type="button" onClick={() => { setValidation(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })); notify('Validação simulada com sucesso'); }} className="mt-3 flex items-center gap-1 text-[13px] text-roxo-700 underline"><Wrench className="size-3.5" /> Simular validação (demo)</button></StatusCard><div className="rounded-card bg-white p-5 shadow-3d ring-1 ring-lilas-200"><p className="text-[12px] font-extrabold uppercase tracking-wide text-cinza-600">Resumo</p><div className="mt-3 grid grid-cols-3 gap-2">{([['pendentes','Pendentes'],['concluidos','Concluídos'],['descartados','Descartados 30 dias']] as const).map(([key, label]) => <button key={key} type="button" onClick={() => setStatus(key)} className="rounded-[14px] bg-fundo p-3 text-left ring-1 ring-lilas-200"><strong className="block text-[22px] text-roxo-700">{counts[key]}</strong><span className="text-[11px] font-bold text-cinza-600">{label}</span></button>)}</div></div></section>
    <div role="tablist" aria-label="Status das ofertas" className="mt-8 flex max-w-[570px] gap-1 rounded-card bg-white p-1.5 shadow-3d ring-1 ring-lilas-200">{([['pendentes','Pendentes'],['concluidos','Concluídos'],['descartados','Descartados']] as const).map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={status === value} onClick={() => setStatus(value)} className={cn('flex h-12 flex-1 items-center justify-center gap-2 rounded-pill text-[14px] font-extrabold', status === value ? 'bg-roxo-700 text-white shadow-btn-roxo' : 'text-roxo-700 hover:bg-lilas-100')}><Inbox className="size-4" />{label}<span className={cn('rounded-full px-2 py-0.5 text-[11px]', status === value ? 'bg-amarelo-500 text-roxo-900' : 'bg-lilas-100')}>{counts[value]}</span></button>)}</div>
    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]"><label className="flex h-12 items-center gap-2 rounded-pill bg-white px-4 ring-2 ring-lilas-200"><Search className="size-5 text-roxo-500" /><span className="sr-only">Buscar por título</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por título…" className="min-w-0 flex-1 outline-none" /></label><select aria-label="Categoria" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="h-12 rounded-pill bg-white px-4 font-bold text-tinta ring-2 ring-lilas-200"><option value="todas">Todas as categorias</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select><select aria-label="Desconto mínimo" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="h-12 rounded-pill bg-white px-4 font-bold text-tinta ring-2 ring-lilas-200"><option value="0">Qualquer desconto</option><option value="20">20% ou mais</option><option value="30">30% ou mais</option><option value="40">40% ou mais</option></select><select aria-label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-12 rounded-pill bg-white px-4 font-bold text-tinta ring-2 ring-lilas-200"><option value="recentes">Mais recentes</option><option value="desconto">Maior desconto</option><option value="vendidos">Mais vendidos</option></select></div>
    {status === 'pendentes' && <label className="mt-6 flex items-center gap-3 text-[14px] font-bold text-cinza-600"><input type="checkbox" checked={visible.length > 0 && visible.every((p) => selected.includes(p.id))} onChange={(e) => setSelected(e.target.checked ? visible.map((p) => p.id) : [])} className="size-5 accent-roxo-700" aria-label="Selecionar todas as ofertas visíveis" /> Selecionar todas ({visible.length})</label>}
    {status === 'pendentes' && selected.length > 0 && <div className="mt-4 flex items-center gap-3 rounded-card bg-lilas-100 px-4 py-3 text-[14px] font-bold text-roxo-700"><span>{selected.length} selecionadas</span><button type="button" onClick={() => setSelected([])} className="underline">Limpar</button><button type="button" onClick={() => setBulkDiscard(true)} className="ml-auto flex items-center gap-1 rounded-pill bg-white px-4 py-2 text-vermelho-700 ring-1 ring-lilas-200"><Trash2 className="size-4" /> Descartar selecionados</button></div>}
    <section aria-label="Ofertas para revisar" className="mt-4 space-y-4">{visible.length === 0 ? <div className="rounded-card bg-white p-10 text-center text-cinza-600 ring-1 ring-lilas-200">Nenhuma oferta nesta seção.</div> : visible.map((p) => <div key={p.id} className="relative">{status === 'pendentes' && <input type="checkbox" checked={selected.includes(p.id)} onChange={(e) => setSelected((ids) => e.target.checked ? [...ids, p.id] : ids.filter((id) => id !== p.id))} className="absolute left-4 top-6 z-10 size-5 accent-roxo-700" aria-label={`Selecionar ${p.title}`} />}<OfferCard product={p} mode={status === 'pendentes' ? 'pending' : status === 'concluidos' ? 'completed' : 'discarded'} onApprove={() => setApproveProduct(p)} onDiscard={() => setDiscardProduct(p)} onRemove={() => status === 'descartados' ? undoLast() : (status === 'concluidos' ? setCompleted((items) => items.filter((item) => item.id !== p.id)) : undefined)} /></div>)}</section>
    <p className="mt-10 text-center text-[12px] text-cinza-600">Economy Place · Painel administrativo de uso interno · não indexado por buscadores</p></div>
    {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-4 rounded-pill bg-tinta px-5 py-3 text-[14px] font-bold text-white shadow-3d"><span>{notice}</span>{canUndo && <button type="button" onClick={undoLast} className="text-amarelo-400 underline">Desfazer</button>}<button type="button" onClick={() => { setNotice(''); setCanUndo(false); }} aria-label="Fechar aviso"><X className="size-4" /></button></div>}
    {(approveProduct || discardProduct || bulkDiscard) && <Modal title={approveProduct ? 'Aprovar oferta' : 'Motivo do descarte'} onClose={() => { setApproveProduct(undefined); setDiscardProduct(undefined); setBulkDiscard(false); }}>{approveProduct ? <div><p className="mt-5 font-bold text-tinta">{approveProduct.title}</p><div className="mt-4 flex flex-wrap gap-3 text-[14px]"><span>Preço atual: <strong>{money(approveProduct.price)}</strong></span><span>Preço original: <strong>{money(approveProduct.oldPrice)}</strong></span><span className="rounded-pill bg-vermelho-500 px-2 py-1 font-bold text-white">-{discountOf(approveProduct)}%</span></div><label className="mt-6 block text-[14px] font-bold text-tinta" htmlFor="affiliate">Link de afiliado * <span className="font-normal text-cinza-600">(obrigatório)</span></label><div className="mt-2 flex gap-2"><input id="affiliate" value={affiliate} onChange={(e) => setAffiliate(e.target.value)} placeholder="https://mercadolivre.com/sec/…" className="h-12 min-w-0 flex-1 rounded-campo border border-lilas-200 px-4 outline-none focus:border-roxo-500" /><button type="button" onClick={async () => setAffiliate(await navigator.clipboard.readText())} className="rounded-campo bg-lilas-100 px-4 font-bold text-roxo-700">Colar</button></div><p className="mt-2 text-[13px] text-cinza-600">Gere o link no Portal de Afiliados do Mercado Livre e cole aqui.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setApproveProduct(undefined)} className="h-11 rounded-pill px-5 font-bold text-roxo-700 ring-2 ring-inset ring-lilas-200">Cancelar</button><button type="button" disabled={!affiliate.trim() || publishing} onClick={approve} className="h-11 rounded-pill bg-amarelo-500 px-5 font-bold text-roxo-900 shadow-btn-amarelo disabled:opacity-50">{publishing ? 'Publicando…' : 'Confirmar aprovação'}</button></div></div> : <div><p className="mt-5 text-[14px] text-cinza-600">{bulkDiscard ? `${selected.length} ofertas selecionadas` : 'Escolha o motivo para registrar o descarte.'}</p><div className="mt-4 grid gap-2">{discardReasons.map((reason) => <button key={reason} type="button" onClick={() => discard(reason)} className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-left font-bold text-tinta hover:bg-lilas-100"><Trash2 className="size-4 text-vermelho-500" />{reason}</button>)}</div></div>}</Modal>}
  </div>;
}
