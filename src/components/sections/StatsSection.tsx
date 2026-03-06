import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, Users, Clock, MapPin } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Truck, value: '+15 Anos', label: 'no mercado' },
  { icon: Users, value: 'Operadores', label: 'qualificados' },
  { icon: Clock, value: 'Frota', label: 'moderna e atualizada' },
  { icon: MapPin, value: 'MG e região', label: 'área de atuação' },
];

const StatsSection: React.FC = () => {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = barsRef.current;
    if (!bars) return;
    const ctx = gsap.context(() => {
      gsap.from(Array.from(bars.children), {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: bars, start: 'top 85%', once: true },
      });
    }, bars);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-16 border-y" style={{ background: '#eaf5ed', borderColor: '#cce8d4' }}>
      <div className="container">
        <div
          ref={barsRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-8 xl:gap-10"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 w-full">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#cce8d4' }}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: '#3a6b4a' }} />
              </div>
              <div>
                <div className="font-bold text-xl sm:text-2xl md:text-3xl leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a' }}>
                  {value}
                </div>
                <div className="text-sm mt-1" style={{ color: '#4a8460' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
