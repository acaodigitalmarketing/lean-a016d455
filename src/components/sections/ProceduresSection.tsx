import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Package, Thermometer, Layers, AlertTriangle, Home, Zap } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'Carga Geral',
    description: 'Transporte de mercadorias diversas, embaladas ou paletizadas, com manuseio cuidadoso e entrega segura em todo o Brasil.',
    tags: ['Paletizada', 'Granel', 'Embalada'],
  },
  {
    icon: Thermometer,
    title: 'Carga Refrigerada',
    description: 'Controle de temperatura de -18°C a +12°C para alimentos, medicamentos e produtos farmacêuticos que exigem cadeia fria.',
    tags: ['Alimentos', 'Farmacêutico', 'ANVISA'],
  },
  {
    icon: Layers,
    title: 'Carga Fracionada',
    description: 'Ideal para volumes menores que não ocupam um veículo completo. Sua carga compartilha o espaço com segurança e economia.',
    tags: ['Pequenos Volumes', 'Econômico', 'Rápido'],
  },
  {
    icon: AlertTriangle,
    title: 'Carga Perigosa',
    description: 'Transporte especializado de produtos químicos, inflamáveis e materiais perigosos conforme normas MOPP e legislação vigente.',
    tags: ['MOPP', 'Químicos', 'Inflamáveis'],
  },
  {
    icon: Home,
    title: 'Mudanças e Transferências',
    description: 'Serviço completo de mudança residencial e corporativa com embalagem, transporte e entrega com todo o cuidado.',
    tags: ['Residencial', 'Corporativo', 'Manuseio Cuidadoso'],
  },
  {
    icon: Zap,
    title: 'Logística Dedicada',
    description: 'Frota exclusiva e motorista dedicado para operações contínuas. Solução personalizada para empresas com demanda regular.',
    tags: ['Exclusivo', 'Contrato', 'SLA Garantido'],
  },
];

const ServiceCard: React.FC<typeof services[0]> = ({ icon: Icon, title, description, tags }) => (
  <div className="lean-card lean-card-accent p-6 flex flex-col gap-4 group hover:shadow-lean transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
        style={{ background: '#eaf5ed' }}>
        <Icon className="w-6 h-6" style={{ color: '#3a6b4a' }} />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a', letterSpacing: '0.02em' }}>
          {title}
        </h3>
      </div>
    </div>
    <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>{description}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map(tag => (
        <span key={tag} className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: '#eaf5ed', color: '#3a6b4a', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ProceduresSection: React.FC = () => {
  return (
    <section id="servicos" className="section-spacing relative overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="absolute inset-0 gradient-glow-bottom pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="text-center section-header-spacing">
            <span className="lean-label block mb-3">Modalidades</span>
            <h2 className="lean-section-title mb-4">Nossos Serviços</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
              Soluções completas para cada tipo de carga, com segurança, tecnologia e atendimento personalizado em todo o Brasil.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </AnimatedSection>

        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="btn-pill btn-primary font-bold text-sm px-8 py-3"
          >
            Solicitar Cotação
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProceduresSection;
