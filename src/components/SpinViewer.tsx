import { useRef, useState, useCallback, useEffect } from 'react';
import { RotateCw, Pause, Play } from 'lucide-react';

interface SpinViewerProps {
  images: string[];
  alt: string;
}

export default function SpinViewer({ images, alt }: SpinViewerProps) {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const dragStart = useRef({ x: 0, angle: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const frameCount = images.length;
  const currentFrame = Math.round((angle / 360) * frameCount) % frameCount;
  const safeFrame = ((currentFrame % frameCount) + frameCount) % frameCount;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStart.current = { x: e.clientX, angle };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [angle]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const deltaX = e.clientX - dragStart.current.x;
    const sensitivity = rect.width / (frameCount * 2);
    const newAngle = dragStart.current.angle + (deltaX / sensitivity) * (360 / frameCount);
    setAngle(newAngle);
  }, [isDragging, frameCount]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setAngle((a) => a + (dt / 1000) * 60);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative aspect-[16/9] overflow-hidden rounded-2xl bg-obsidian-950 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${alt} — ${i + 1}/360`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
            style={{ opacity: i === safeFrame ? 1 : 0 }}
            draggable={false}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Hint overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass pointer-events-none">
          <RotateCw className="w-3.5 h-3.5 text-neon-300" />
          <span className="text-xs text-silver-200 font-medium">Aylantirish uchun sudrang</span>
        </div>

        {/* Auto-rotate toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-silver-200 hover:text-neon-300 hover:border-neon-400/40 transition-all duration-300"
          aria-label="Avtomatik aylantirish"
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none">
          <div className="flex items-center gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === safeFrame ? 'w-6 bg-neon-400' : 'w-1 bg-silver-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
