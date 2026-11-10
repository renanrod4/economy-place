'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-12">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-lilas-100 text-roxo-500">
        {icon}
      </div>
      <div>
        <h3 className="text-[20px] font-bold text-tinta">{title}</h3>
        <p className="mt-2 max-w-md text-[15px] text-cinza-600">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}