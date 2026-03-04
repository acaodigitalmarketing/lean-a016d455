import React from 'react';
import { Shield, Clock, MapPin, Truck, Award, Users } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

const credentials = [
  { icon: Award, title: 'ANTT Regularizada — Transporte Rodoviário de Cargas' },
  { icon: Shield, title: 'Seguro de carga incluso em todas as operações' },
  { icon: Truck, title: 'Frota própria monitorada 24h com rastreamento satelital' },
  { icon: Clock, title: 'Pontualidade de 99% nas entregas realizadas' },
  { icon: MapPin, title: 'Cobertura nacional — capitais e interior' },
  { icon: Users, title: 'Time especializado em logística e atendimento ao cliente' },
];

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="section-spacing relative overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-30" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] decorative-blur decorative-blur-accent opacity-20" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <span className="lean-label block mb-3">A Empresa</span>
            <h2 className="lean-section-title">
              Quem somos
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>
                  LEAN Transportes
                </h3>
                <p className="text-lg font-semibold" style={{ color: '#3a6b4a', fontFamily: "'Barlow Condensed', sans-serif', letterSpacing: '0.02em" }}>
                  Logística inteligente, entrega garantida.
                </p>
              </div>

              <div className="space-y-4 leading-relaxed text-sm md:text-base" style={{ color: '#555555' }}>
                <p>
                  Fundada com a missão de transformar a logística de cargas no Brasil, a <strong style={{ color: '#1a1a1a' }}>LEAN Transportes</strong> combina mais de 15 anos de experiência com tecnologia de ponta para oferecer soluções completas e seguras.
                </p>
                <p>
                  Nossa frota moderna e equipe qualificada garantem que cada carga chegue ao destino com <strong style={{ color: '#1a1a1a' }}>segurança, pontualidade e rastreamento em tempo real</strong>. Atendemos desde pequenas encomendas até grandes operações logísticas.
                </p>
                <p>
                  Com cobertura em todo o território nacional, somos parceiros de empresas que precisam de um transporte confiável, transparente e com suporte dedicado em todas as etapas.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="btn-pill btn-primary font-bold text-sm px-6 py-3"
                >
                  Solicitar Cotação
                </button>
              </div>
            </div>

            {/* Visual block */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Large stat block */}
                <div className="rounded-2xl p-10 text-center relative overflow-hidden"
                  style={{ background: '#3a6b4a' }}>
                  <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-20"
                    style={{ background: '#5c9e74' }} />
                  <div className="absolute bottom-[-30px] left-[-20px] w-24 h-24 rounded-full opacity-15"
                    style={{ background: '#1e3d28' }} />
                  <div className="relative z-10">
                    <div className="text-[#7dba93] text-xs font-bold tracking-[0.2em] uppercase mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Há mais de
                    </div>
                    <div className="text-white font-black leading-none mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '80px', letterSpacing: '-3px' }}>
                      15
                    </div>
                    <div className="text-[#a5d1b4] text-lg font-bold"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em' }}>
                      ANOS NO MERCADO
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4 text-left">
                      <div>
                        <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>+50k</div>
                        <div className="text-[#a5d1b4] text-xs mt-0.5">Entregas realizadas</div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>99%</div>
                        <div className="text-[#a5d1b4] text-xs mt-0.5">Pontualidade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Credential cards */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16 md:mt-20">
            {credentials.map((item, index) => (
              <div
                key={index}
                className="lean-card lean-card-accent flex items-start gap-4 p-5 group"
              >
                <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background: '#eaf5ed', borderColor: '#cce8d4' }}>
                  <item.icon className="h-4 w-4" style={{ color: '#3a6b4a' }} strokeWidth={1.5} />
                </div>
                <p className="text-sm leading-snug pt-2" style={{ color: '#2d2d2d' }}>{item.title}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
