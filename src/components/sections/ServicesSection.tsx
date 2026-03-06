import React from 'react';
import { HardHat, Layers, Truck, Shovel, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

const services = [
  {
    icon: Shovel,
    title: 'Terraplanagem',
    description: 'Corte, aterro e nivelamento de terrenos para obras civis, rurais e industriais.',
  },
  {
    icon: Layers,
    title: 'Movimentação de Terra',
    description: 'Escavação, carregamento e transporte de material com equipe e equipamento próprios.',
  },
  {
    icon: Truck,
    title: 'Transporte de Materiais',
    description: 'Logística de cargas pesadas, entulho, brita, areia e insumos de obra.',
  },
  {
    icon: HardHat,
    title: 'Obras Rurais e Urbanas',
    description: 'Execução de projetos agrícolas, estradas internas, drenagem e infraestrutura.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="prestacao-de-servicos"
      className="section-spacing relative overflow-hidden"
      style={{ background: '#1e3d28' }}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(74,132,96,0.18) 0%, transparent 70%)' }} />

      <div className="container relative z-10">

        {/* Header */}
        <AnimatedSection>
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: '#7dba93', background: 'rgba(125,186,147,0.12)', fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Prestação de Serviços
          </span>
          <h2
            className="text-3xl md:text-5xl font-black mb-5 leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '-0.5px' }}
          >
            Vai além da locação.<br />
            <span style={{ color: '#7dba93' }}>Executamos o serviço completo.</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#a5c9b2' }}>
            Operador qualificado, equipamento adequado e resultado garantido. Da contratação à entrega, a LEAN cuida de tudo — você acompanha o progresso.
          </p>
        </div>
        </AnimatedSection>

        {/* Cards de serviços */}
        <AnimatedSection delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#3a6b4a]"
                style={{ background: 'rgba(125,186,147,0.15)' }}
              >
                <Icon className="w-6 h-6" style={{ color: '#7dba93' }} />
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a5c9b2' }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={200}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
            className="btn-pill btn-primary font-bold text-sm px-8 py-3.5 flex items-center gap-2"
          >
            Saiba Mais
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs" style={{ color: '#7dba93' }}>
            Atendemos obras de qualquer porte — sem burocracia.
          </p>
        </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default ServicesSection;
