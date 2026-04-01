import React, { useEffect, useRef } from 'react';
import { Truck, Wrench, Shield, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const fleetStats = [
  { icon: Truck, value: 'Ágil', label: 'Atendimento rápido' },
  { icon: Wrench, value: '100%', label: 'Manutenção preventiva' },
  { icon: Shield, value: 'Zero', label: 'Tolerância a falhas' },
  { icon: Users, value: 'Time', label: 'Especializado' },
];

const ClinicSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statGridRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 4 stat cards — pop-in com spring
      if (statGridRef.current) {
        gsap.from(Array.from(statGridRef.current.children), {
          opacity: 0,
          scale: 0.88,
          y: 20,
          stagger: 0.12,
          duration: 0.55,
          ease: 'back.out(1.4)',
          immediateRender: false,
          scrollTrigger: { trigger: statGridRef.current, start: 'top 80%', once: true },
        });
      }

      // Coluna direita — fade da direita
      gsap.from(contentColRef.current, {
        opacity: 0, x: 30, duration: 0.8, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: statGridRef.current, start: 'top 80%', once: true },
      });

      // Checklist items — slide da esquerda
      if (checklistRef.current) {
        gsap.from(Array.from(checklistRef.current.children), {
          opacity: 0,
          x: -16,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.4,
          immediateRender: false,
          scrollTrigger: { trigger: checklistRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="frota" className="section-spacing relative overflow-hidden">
      {/* Background photo — oculta no mobile */}
      <img
        src="/lovable-uploads/stats-bg-1.webp"
        alt="Nossa frota LEAN"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        width="1920"
        height="1080"
      />
      {/* Overlay desktop */}
      <div className="hidden lg:block absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,42,27,0.95) 0%, rgba(30,61,40,0.92) 60%, rgba(42,82,53,0.88) 100%)' }} />
      {/* Fundo sólido mobile */}
      <div className="lg:hidden absolute inset-0" style={{ background: '#0e2016' }} />

      <div className="container relative z-10">
        {/* Foto quadrada no mobile */}
        <div className="lg:hidden w-full aspect-square rounded-2xl overflow-hidden mb-8">
          <img
            src="/lovable-uploads/stats-bg-1.webp"
            alt="Nossa frota LEAN"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            width="640"
            height="640"
          />
        </div>
        {/* Stats grid — mobile only (sem GSAP) */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
          {fleetStats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: '#7dba93' }} />
              <div className="text-white font-black text-2xl mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.5px' }}>
                {value}
              </div>
              <div className="text-xs" style={{ color: '#a5d1b4' }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats grid — desktop only (com GSAP) */}
          <div ref={statGridRef} className="hidden lg:grid grid-cols-2 gap-3 md:gap-4">
            {fleetStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-xl p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3" style={{ color: '#7dba93' }} />
                <div className="text-white font-black text-2xl md:text-3xl mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.5px' }}>
                  {value}
                </div>
                <div className="text-xs" style={{ color: '#a5d1b4' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Conteúdo — lado direito */}
          <div ref={contentColRef} className="space-y-6">
            <div>
              <span className="text-[#7dba93] text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Nossa Frota
              </span>
              <h2 className="text-white font-bold leading-tight mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)' }}>
                Equipamentos modernos para grandes desafios
              </h2>
            </div>

            <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: '#a5d1b4' }}>
              <p>
                Nossa frota é composta por equipamentos modernos e atualizados, com manutenção preventiva rigorosa para garantir disponibilidade máxima nas suas operações.
              </p>
              <p>
                De caminhões basculantes a equipamentos de terraplanagem, temos a solução certa para cada desafio — com <strong style={{ color: '#ffffff' }}>operadores qualificados, documentação em dia e comprometimento total</strong> em cada projeto.
              </p>
            </div>

            <div ref={checklistRef} className="space-y-3">
              {[
                'Caminhões basculantes MB Axor 3131 e VW 3260',
                'Caminhões Munck Ford Cargo e MB Atego — 10.000 kg',
                'Escavadeiras — 22.500 kg / 1,2 m³',
                'Retroescavadeiras — 8.185 kg / 4,54 m',
                'Carregadeiras — Carregamento a granel e movimentação de terra',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#3a6b4a' }}>
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm" style={{ color: '#cce8d4' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicSection;
