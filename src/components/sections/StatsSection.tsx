import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const StatsSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cols = Array.from(grid.children);

      // Entrada das 3 colunas com stagger
      gsap.from(cols, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
      });

      // Contador "+15"
      const span15 = cols[0]?.querySelector('span:first-child') as HTMLSpanElement | null;
      if (span15) {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: 15,
          duration: 1.4,
          ease: 'power2.out',
          roundProps: 'value',
          onUpdate: () => { span15.textContent = `+${obj.value}`; },
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        });
      }

      // Contador "Desde 2008"
      const span2008 = cols[1]?.querySelector('span:first-child') as HTMLSpanElement | null;
      if (span2008) {
        const obj = { value: 1995 };
        gsap.to(obj, {
          value: 2008,
          duration: 1.2,
          ease: 'power1.inOut',
          roundProps: 'value',
          onUpdate: () => { span2008.textContent = `Desde ${obj.value}`; },
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        });
      }

      // Texto "Segurança..." — letter-spacing reveal
      const spanText = cols[2]?.querySelector('span') as HTMLSpanElement | null;
      if (spanText) {
        gsap.from(spanText, {
          opacity: 0,
          letterSpacing: '0.4em',
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        });
      }
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-10 md:py-14 border-y" style={{ background: '#eaf5ed', borderColor: '#cce8d4' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
          style={{ divideColor: '#a5d1b4' } as React.CSSProperties}>
          {/* Col 1 — +15 */}
          <div className="flex flex-col items-center justify-center py-6 md:py-0">
            <span className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a' }}>
              +15
            </span>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#4a8460' }}>
              Anos de Experiência
            </span>
          </div>

          {/* Col 2 — Desde 2008 */}
          <div className="flex flex-col items-center justify-center py-6 md:py-0">
            <span className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a' }}>
              Desde 2008
            </span>
            <span className="text-xs tracking-widest uppercase" style={{ color: '#4a8460' }}>
              No Mercado
            </span>
          </div>

          {/* Col 3 — Texto */}
          <div className="flex flex-col items-center justify-center py-6 md:py-0">
            <span className="text-sm md:text-base font-bold text-center"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Segurança · Qualidade · Comprometimento
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
