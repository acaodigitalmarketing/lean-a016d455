import React, { useEffect, useRef } from 'react';
import { Shield, Clock, MapPin, Truck, Award, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { icon: Award, title: 'Referência em locação de caminhões para mineração e terraplanagem' },
  { icon: Shield, title: 'Operação com responsabilidade, ética e comprometimento desde 2008' },
  { icon: Truck, title: 'Frota própria moderna com manutenção preventiva rigorosa' },
  { icon: Clock, title: 'Disponibilidade garantida para operações contínuas e de alta complexidade' },
  { icon: MapPin, title: 'Atuação em Minas Gerais e regiões adjacentes' },
  { icon: Users, title: 'Valorizamos colaboradores, comunidade e meio ambiente' },
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true },
      });

      // Coluna de texto — slide da esquerda
      gsap.from(contentRef.current, {
        opacity: 0, x: -30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
      });

      // Card verde — slide da direita
      gsap.from(cardRef.current, {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
      });

      // Contador "2008"
      if (yearRef.current) {
        const obj = { value: 1990 };
        gsap.to(obj, {
          value: 2008,
          duration: 1.6,
          ease: 'power2.out',
          roundProps: 'value',
          onUpdate: () => { if (yearRef.current) yearRef.current.textContent = String(obj.value); },
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
        });
      }

      // credential cards — sem animação GSAP, hover via CSS
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="section-spacing relative overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-30" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] decorative-blur decorative-blur-accent opacity-20" />

      <div className="container relative z-10">
        <div ref={headerRef} className="text-center mb-8 md:mb-12">
          <span className="lean-label block mb-3">A Empresa</span>
          <h2 className="lean-section-title">
            Quem somos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>
                LEAN Transportes e Empreendimentos
              </h3>
              <p className="text-lg font-semibold" style={{ color: '#3a6b4a', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.02em' }}>
                Força, Segurança e Resultado desde 2008.
              </p>
            </div>

            <div className="space-y-4 leading-relaxed text-sm md:text-base" style={{ color: '#555555' }}>
              <p>
                A <strong style={{ color: '#1a1a1a' }}>LEAN TRANSPORTES E EMPREENDIMENTOS LTDA.</strong> atua desde 2008 com excelência na locação de equipamentos e execução de terraplanagem. Somos referência em locações de caminhões para mineração e movimentação de terra em Minas Gerais.
              </p>
              <p>
                Oferecemos soluções de qualidade, buscando sempre as melhores alternativas para nossos clientes. Valorizamos nossos colaboradores, contribuímos com a comunidade e o meio ambiente, operando com <strong style={{ color: '#1a1a1a' }}>responsabilidade, ética, comprometimento e segurança</strong>.
              </p>
              <p>
                Com uma frota moderna e equipamentos atualizados, garantimos a máxima eficiência para seus projetos, assegurando que suas atividades prossigam sem interrupções.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
                className="btn-pill btn-primary font-bold text-sm px-6 py-3 w-full sm:w-auto"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>

          {/* Visual block */}
          <div className="flex items-center justify-center">
            <div ref={cardRef} className="relative w-full max-w-md" style={{ willChange: 'transform' }}>
              <div className="rounded-2xl p-10 text-center relative overflow-hidden"
                style={{ background: '#3a6b4a' }}>
                {/* Background photo */}
                <img
                  src="/lovable-uploads/2008.webp"
                  alt="LEAN desde 2008"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(10,28,16,0.88) 0%, rgba(30,61,40,0.82) 60%, rgba(10,28,16,0.88) 100%)' }} />
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-20"
                  style={{ background: '#5c9e74' }} />
                <div className="absolute bottom-[-30px] left-[-20px] w-24 h-24 rounded-full opacity-15"
                  style={{ background: '#1e3d28' }} />
                <div className="relative z-10">
                  <div className="text-[#7dba93] text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    No mercado desde
                  </div>
                  <div
                    ref={yearRef}
                    className="text-white font-black leading-none mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '80px', letterSpacing: '-3px' }}>
                    2008
                  </div>
                  <div className="text-[#a5d1b4] text-lg font-bold"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em' }}>
                    +15 ANOS DE EXPERIÊNCIA
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Frota</div>
                      <div className="text-[#a5d1b4] text-xs mt-0.5">Moderna e atualizada</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>100%</div>
                      <div className="text-[#a5d1b4] text-xs mt-0.5">Comprometimento</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credential cards */}
        <div ref={credentialsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 md:mt-12">
          {credentials.map((item, index) => (
            <div
              key={index}
              className="lean-card lean-card-accent flex items-center gap-4 p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: '#eaf5ed', borderColor: '#cce8d4' }}>
                <item.icon className="h-4 w-4" style={{ color: '#3a6b4a' }} strokeWidth={1.5} />
              </div>
              <p className="text-sm leading-snug" style={{ color: '#2d2d2d' }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
