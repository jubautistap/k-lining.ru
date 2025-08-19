'use client';

import React from 'react';
import { useAmoCRM } from '@/components/providers/AmoCRMProvider';

type Props = {
  children: React.ReactNode;
  className?: string;
  ctaId?: string;
  ariaLabel?: string;
};

export default function OpenWizardButton({ children, className = '', ctaId = 'wizard_open', ariaLabel }: Props) {
  const { openModal } = useAmoCRM();
  const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 103567092;

  const onClick = () => {
    try {
      if (typeof window !== 'undefined') {
        const w = window as any;
        w?.ym?.(YM_ID, 'reachGoal', 'wizard_open', { id: ctaId, page: location.pathname });
        w?.gtag?.('event', 'wizard_open', { id: ctaId, page: location.pathname });
      }
    } catch {}
    openModal();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      data-cta={ctaId}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}


