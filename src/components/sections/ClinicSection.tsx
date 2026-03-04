import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Truck, Satellite, Shield, Wrench } from 'lucide-react';

const fleetStats = [
  { icon: Truck, value: '+200', label: 'Veículos na frota' },
  { icon: Satellite, value: '100%', label: 'Rastreados por GPS' },
  { icon: Shield, value: '0', label: 'Tolerância a atrasos' },
  { icon: Wrench, value: 'Regular', label: 'Manutenção preventiva' },
];

const ClinicSection: React.FC = () => {
  return (
    <section id="frota" className="section-spacing relative overflow-hidden">
      {/* Background verde escuro */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1e3d28 0%, #2a5235 60%, #3a6b4a 100%)' }} />
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: '#5c9e74' }} />
      <div className="absolute bottom-[-100px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: '#1e3d28' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Stats grid — lado esquerdo */}
            <div className="grid grid-cols-2 gap-4">
              {fleetStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-xl p-6 text-center"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: '#7dba93' }} />
                  <div className="text-white font-black text-3xl mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '-0.5px' }}>
                    {value}
                  </div>
                  <div className="text-xs" style={{ color: '#a5d1b4' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Conteúdo — lado direito */}
            <div className="space-y-6">
              <div>
                <span className="text-[#7dba93] text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Nossa Frota
                </span>
                <h2 className="text-white font-bold leading-tight mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)' }}>
                  Tecnologia e segurança em cada quilômetro
                </h2>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: '#a5d1b4' }}>
                <p>
                  Nossa frota é composta por veículos modernos, todos equipados com rastreamento satelital em tempo real, sistemas de telemetria e manutenção preventiva rigorosa.
                </p>
                <p>
                  Do cavalo mecânico ao veículo de pequeno porte, temos a solução certa para cada tipo de carga — com <strong style={{ color: '#ffffff' }}>motoristas qualificados, documentação em dia e seguro incluso</strong> em todas as operações.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  'Baú seco, refrigerado e graneleiro',
                  'Carrocerias abertas e fechadas',
                  'Bi-trem, rodotrem e bitruck',
                  'Veículos leves para centros urbanos',
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
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClinicSection;
