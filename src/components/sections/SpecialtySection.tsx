import React, { useEffect, useRef } from 'react';
import { Wrench, ShieldCheck, Clock, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const SpecialtySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0, y: 28, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      });

      // Visual col (verde esquerda) — slide da esquerda
      gsap.from(visualColRef.current, {
        opacity: 0, x: -50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: visualColRef.current, start: 'top 80%', once: true },
      });

      // Content col (direita) — slide da direita
      gsap.from(contentColRef.current, {
        opacity: 0, x: 50, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: visualColRef.current, start: 'top 80%', once: true },
      });

      // 4 feature badges — stagger
      if (badgesRef.current) {
        gsap.from(Array.from(badgesRef.current.children), {
          opacity: 0,
          y: 14,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.4,
          scrollTrigger: { trigger: badgesRef.current, start: 'top 85%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicos" className="section-spacing relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-15" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="lean-label block mb-3">Destaque</span>
          <h2 className="lean-section-title mb-6">Disponibilidade Garantida</h2>
          <p className="text-base text-[#555555] max-w-2xl mx-auto leading-relaxed mt-4">
            Com manutenção preventiva e frota atualizada, sua operação nunca para.
          </p>
        </div>

        <div className="lean-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual side */}
            <div ref={visualColRef} className="relative min-h-[280px] lg:min-h-auto flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1e3d28, #3a6b4a)', willChange: 'transform' }}>
              <div className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full opacity-10"
                style={{ background: '#7dba93' }} />
              <div className="relative z-10 text-center p-8">
                <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Wrench className="w-12 h-12 text-white" />
                </div>
                <div className="text-white font-black text-4xl mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-1px', lineHeight: 1.1 }}>
                  Manutenção
                </div>
                <div className="text-[#a5d1b4] text-sm tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Preventiva e Corretiva
                </div>
                <div className="mt-4 text-[#7dba93] text-xs">Equipamentos sempre prontos para operar</div>
              </div>
            </div>

            {/* Content side */}
            <div ref={contentColRef} className="p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-6"
              style={{ willChange: 'transform' }}>
              <div>
                <span className="lean-label block mb-3">Nossa Proposta</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>
                  Sua operação nunca para
                </h3>
                <p className="text-sm" style={{ color: '#555555' }}>
                  Excelência em manutenção e disponibilidade para seus projetos.
                </p>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: '#555555' }}>
                <p>
                  Com uma frota moderna e <strong style={{ color: '#1a1a1a' }}>equipamentos atualizados</strong>, garantimos a máxima eficiência e segurança para seus projetos, assegurando que suas atividades prossigam sem interrupções.
                </p>
                <p>
                  Nossa equipe especializada realiza manutenção preventiva rigorosa em todos os equipamentos, com peças originais e técnicos certificados, para que você não perca tempo nem produtividade.
                </p>
              </div>

              {/* Feature badges */}
              <div ref={badgesRef} className="grid grid-cols-2 gap-3">
                {[
                  { icon: Wrench, text: 'Manutenção preventiva regular' },
                  { icon: ShieldCheck, text: 'Equipamentos certificados' },
                  { icon: Clock, text: 'Resposta rápida a ocorrências' },
                  { icon: Zap, text: 'Máxima eficiência operacional' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs p-3 rounded-lg" style={{ background: '#eaf5ed' }}>
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#3a6b4a' }} />
                    <span style={{ color: '#2d2d2d' }}>{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
                  className="btn-pill btn-primary font-bold text-sm px-6 py-3"
                >
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtySection;
