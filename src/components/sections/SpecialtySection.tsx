import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Thermometer, ShieldCheck, Clock, MapPin } from 'lucide-react';

const SpecialtySection: React.FC = () => {
  return (
    <section id="servicos" className="section-spacing relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-15" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-20">
            <span className="lean-label block mb-3">Destaque</span>
            <h2 className="lean-section-title mb-6">Carga Refrigerada</h2>
            <p className="text-base text-[#555555] max-w-2xl mx-auto leading-relaxed mt-4">
              Transportamos produtos que exigem controle de temperatura com máxima precisão — alimentos, medicamentos e insumos sensíveis.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="lean-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Visual side */}
              <div className="relative min-h-[280px] lg:min-h-auto flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1e3d28, #3a6b4a)' }}>
                <div className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full opacity-10"
                  style={{ background: '#7dba93' }} />
                <div className="relative z-10 text-center p-8">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <Thermometer className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-white font-black text-5xl mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-1px' }}>
                    -18°C
                  </div>
                  <div className="text-[#a5d1b4] text-sm tracking-widest uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    a +12°C
                  </div>
                  <div className="mt-4 text-[#7dba93] text-xs">Controle total de temperatura</div>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-6">
                <div>
                  <span className="lean-label block mb-3">Especialidade</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>
                    Transporte Refrigerado
                  </h3>
                  <p className="text-sm" style={{ color: '#555555' }}>
                    Solução completa para cargas que exigem cadeia fria ininterrupta.
                  </p>
                </div>

                <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: '#555555' }}>
                  <p>
                    Nossos veículos frigoríficos são equipados com sistemas de controle de temperatura de última geração, garantindo a integridade de <strong style={{ color: '#1a1a1a' }}>alimentos, medicamentos, produtos farmacêuticos e insumos sensíveis</strong> durante todo o transporte.
                  </p>
                  <p>
                    Monitoramento contínuo e registros de temperatura disponíveis em tempo real para sua segurança e conformidade regulatória.
                  </p>
                </div>

                {/* Feature badges */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Thermometer, text: 'Controle de -18°C a +12°C' },
                    { icon: ShieldCheck, text: 'ANVISA / MAPA regulamentado' },
                    { icon: Clock, text: 'Monitoramento 24h/7d' },
                    { icon: MapPin, text: 'Cobertura nacional' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs p-3 rounded-lg" style={{ background: '#eaf5ed' }}>
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#3a6b4a' }} />
                      <span style={{ color: '#2d2d2d' }}>{text}</span>
                    </div>
                  ))}
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
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SpecialtySection;
