'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/lib/types/product';

interface PriceHistoryProps {
  product: Product;
}

export function PriceHistory({ product }: PriceHistoryProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const history = product.history;
  const dataPoints = history.length;
  const maxPrice = Math.max(...history);
  const minPrice = Math.min(...history);
  const priceRange = maxPrice - minPrice || 1;
  const currentPrice = history[history.length - 1];
  const lowestPrice = minPrice;
  const highestPrice = maxPrice;

  // Calculate points for the line path
  const points = history.map((price, i) => {
    const x = (i / (dataPoints - 1)) * 100;
    const y = 100 - ((price - minPrice) / priceRange) * 90; // 5% margin top/bottom
    return { x, y, price };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaPathD = [
    `M ${points[0].x} 100`,
    ...points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} 100`,
    'Z',
  ].join(' ');

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const index = Math.round((x / 100) * (dataPoints - 1));
    setHoverIndex(Math.max(0, Math.min(index, dataPoints - 1)));
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null;
  const hoverIdx = hoverIndex ?? -1;

  return (
    <section aria-labelledby="price-history-title" className="rounded-card bg-white shadow-3d ring-1 ring-lilas-200 p-5 md:p-8">
      <div className="mb-6">
        <h2 id="price-history-title" className="text-[22px] font-bold text-roxo-700">Histórico de preço (90 dias)</h2>
        <p className="mt-1 text-[14px] text-cinza-600">
          Variação do preço nos últimos 90 dias. Passe o mouse para ver o valor exato de cada dia.
        </p>
      </div>

      <div ref={containerRef} className="relative h-[280px] max-w-full" onMouseLeave={handleMouseLeave}>
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0"
          onMouseMove={handleMouseMove}
          role="img"
          aria-label={`Gráfico de histórico de preço. Preço atual: R$ ${currentPrice.toFixed(2).replace('.', ',')}. Menor preço: R$ ${lowestPrice.toFixed(2).replace('.', ',')}. Maior preço: R$ ${highestPrice.toFixed(2).replace('.', ',')}`}
        >
          <defs>
            <linearGradient id="price-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a1fc4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7a1fc4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="price-line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5a0e9e" />
              <stop offset="100%" stopColor="#7a1fc4" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <g stroke="#e0cdf6" strokeWidth="0.5">
            {[0, 25, 50, 75, 100].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} />
            ))}
            {[0, 25, 50, 75, 100].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="100" />
            ))}
          </g>

          {/* Y-axis labels */}
          <g fontSize="8" fill="#625a74" fontFamily="system-ui" textAnchor="end">
            <text x="-2" y="8" dominantBaseline="hanging">R$ {highestPrice.toFixed(0)}</text>
            <text x="-2" y="30" dominantBaseline="middle">R$ {((highestPrice + lowestPrice) / 2).toFixed(0)}</text>
            <text x="-2" y="95" dominantBaseline="auto">R$ {lowestPrice.toFixed(0)}</text>
          </g>

          {/* X-axis labels */}
          <g fontSize="8" fill="#625a74" fontFamily="system-ui" textAnchor="middle" dominantBaseline="hanging">
            <text x="0" y="102">90 dias atrás</text>
            <text x="50" y="102">45 dias</text>
            <text x="100" y="102">Hoje</text>
          </g>

          {/* Area */}
          <path d={areaPathD} fill="url(#price-gradient)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke="url(#price-line-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Current price dot */}
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="4"
            fill="#7a1fc4"
            stroke="#fff"
            strokeWidth="2"
          />

          {/* Lowest price marker */}
          {points.findIndex((p) => p.price === lowestPrice) !== -1 && (
            <g>
              <circle
                cx={points.find((p) => p.price === lowestPrice)!.x}
                cy={points.find((p) => p.price === lowestPrice)!.y}
                r="5"
                fill="#1fa855"
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x={points.find((p) => p.price === lowestPrice)!.x}
                y={points.find((p) => p.price === lowestPrice)!.y - 10}
                textAnchor="middle"
                fontSize="7"
                fill="#12763a"
                fontWeight="bold"
                fontFamily="system-ui"
              >
                Menor
              </text>
            </g>
          )}

          {/* Hover tooltip */}
          {hoveredPoint && (
            <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))">
              <line x1={hoveredPoint.x} y1={0} x2={hoveredPoint.x} y2={hoveredPoint.y} stroke="#7a1fc4" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="6" fill="#7a1fc4" stroke="#fff" strokeWidth="2" />
              <rect
                x={hoveredPoint.x > 50 ? hoveredPoint.x - 70 : hoveredPoint.x + 10}
                y={hoveredPoint.y > 50 ? hoveredPoint.y - 55 : hoveredPoint.y - 10}
                width={70}
                height={45}
                rx="6"
                fill="#22163a"
              />
              <text
                x={hoveredPoint.x > 50 ? hoveredPoint.x - 35 : hoveredPoint.x + 45}
                y={hoveredPoint.y > 50 ? hoveredPoint.y - 38 : hoveredPoint.y + 7}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="#ffc20e"
                fontWeight="bold"
                fontFamily="system-ui"
              >
                R$ {hoveredPoint.price.toFixed(2).replace('.', ',')}
              </text>
              <text
                x={hoveredPoint.x > 50 ? hoveredPoint.x - 35 : hoveredPoint.x + 45}
                y={hoveredPoint.y > 50 ? hoveredPoint.y - 24 : hoveredPoint.y + 21}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="7"
                fill="#a49db3"
                fontFamily="system-ui"
              >
                Dia {hoverIdx + 1} de {dataPoints}
              </text>
            </g>
          )}
        </svg>

        {/* Summary stats */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2 p-4 bg-white/95 backdrop-blur-sm" role="region" aria-label="Resumo do histórico">
          <div className="text-center">
            <p className="text-[11px] text-cinza-600">Menor preço</p>
            <p className="text-[16px] font-bold text-verde-700">R$ {lowestPrice.toFixed(2).replace('.', ',')}</p>
          </div>
          <div className="text-center border-x border-lilas-200">
            <p className="text-[11px] text-cinza-600">Preço atual</p>
            <p className="text-[16px] font-bold text-vermelho-500">R$ {currentPrice.toFixed(2).replace('.', ',')}</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-cinza-600">Maior preço</p>
            <p className="text-[16px] font-bold text-roxo-700">R$ {highestPrice.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}