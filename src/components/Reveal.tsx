import { useRef, useCallback, type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-down' | 'fade-in' | 'scale-in' | 'slide-in';
  as?: 'div' | 'section' | 'article' | 'li';
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  as = 'div',
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as;

  const style = delay ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref as React.RefObject<any>}
      className={`${className} ${visible ? `animate-${animation}` : 'opacity-0'}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

export function useTilt<T extends HTMLElement>(maxTilt: number = 12) {
  const ref = useRef<T>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = -y * maxTilt;
      const tiltY = x * maxTilt;
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    },
    [maxTilt]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }, []);

  return { ref, handleMove, handleLeave };
}
