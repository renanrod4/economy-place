'use client';

import { Suspense } from 'react';
import { Container, SectionTitle } from '@/components/ui';
import { AlertForm } from '@/components/alerts/AlertForm';
import { ActiveAlerts } from '@/components/alerts/ActiveAlerts';

function AlertFormWrapper({ presetId }: { presetId?: string }) {
  return <AlertForm presetId={presetId} />;
}

export default function AlertsPage() {
  return (
    <Container className="py-8 max-w-2xl">
      <SectionTitle eyebrow="Monitore preços" title="Alertas de preço" />
      <div className="space-y-8">
        <section aria-labelledby="form-title">
          <h2 id="form-title" className="sr-only">Criar novo alerta</h2>
          <Suspense fallback={<div className="h-64" />}>
            <AlertFormWrapper presetId={undefined} />
          </Suspense>
        </section>
        <section aria-labelledby="active-title">
          <h2 id="active-title" className="mb-4 text-[22px] font-bold text-roxo-700">Alertas ativos</h2>
          <ActiveAlerts />
        </section>
      </div>
    </Container>
  );
}