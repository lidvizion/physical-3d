'use client';

import { GenerationMetrics } from '@/types';
import { BarChart3, Triangle, Palette, Image, Clock, HardDrive } from 'lucide-react';

interface MetricsChipsProps {
  metrics: GenerationMetrics;
  processingTime?: number;
  fileSize?: string;
  className?: string;
}

export default function MetricsChips({ metrics, processingTime, fileSize, className = '' }: MetricsChipsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const chips = [
    {
      label: 'Real-time Generation',
      dotColor: 'bg-green-500'
    },
    {
      label: 'GLB Export Ready', 
      dotColor: 'bg-blue-500'
    },
    {
      label: 'Professional Quality',
      dotColor: 'bg-purple-500'
    }
  ];


  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {chips.map((chip, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
          >
            <div className={`w-2 h-2 ${chip.dotColor} rounded-full animate-pulse`}></div>
            <span className="text-sm text-black">{chip.label}</span>
          </div>
        );
      })}
    </div>
  );
}
