import React, { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Gerente de Logistica — Distribuidora Mendes',
    text: 'Trabalhamos com a LEAN ha mais de 3 anos. A pontualidade e impecavel e o rastreamento em tempo real nos da total tranquilidade. Recomendo para qualquer empresa que precise de um parceiro logistico serio.',
    stars: 5,
  },
  {
    name: 'Ana Paula Ferreira',
    role: 'Diretora de Operacoes — GrupoFerr Alimentos',
    text: 'A LEAN foi a unica transportadora que garantiu a cadeia fria para nossos produtos farmaceuticos. Zero ocorrencias de temperatura em 18 meses de parceria. Excelente equipe e suporte dedicado.',
    stars: 5,
  },
  {
    name: 'Roberto Lima',
    role: 'Proprietario — Comercio Lima & Cia',
    text: 'Para uma pequena empresa como a nossa, ter uma transportadora confiavel faz toda a diferenca. A LEAN trata todos os clientes com o mesmo profissionalismo, independente do tamanho da carga.',
    stars: 5,
  },
  {
    name: 'Luciana Oliveira',
    role: 'Coordenadora de Supply Chain — TechBras',
    text: 'Migramos toda nossa operacao logistica para a LEAN em 2022. Reducao de 23% nos custos de frete e zero reclamacoes de clientes por atrasos. Uma parceria que transformou nosso negocio.',
    stars: 5,
  },
  {
    name: 'Marcos Teixeira',
    role: 'Gerente Industrial — Metalurgica Teixeira',
    text: 'Transporte de cargas especiais e volumosas e um desafio. A LEAN tem o equipamento certo e uma equipe que sabe o que esta fazendo. Profissionalismo do inicio ao fim.',
    stars: 5,
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-4 w-4" style={{ fill: '#3a6b4a', color: '#3a6b4a' }} />
    ))}
  </div>
);

// triplica para garantir que sempre haja cards entrando pela direita
const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

const TestimonialsSection: React.FC = () => {
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);
  return (
    <section id="depoimentos" className="pt-8 md:pt-10 lg:pt-12 relative overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-15" />

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center section-header-spacing">
            <span className="lean-label block mb-3">Depoimentos</span>
            <h2 className="lean-section-title mb-4">O que dizem nossos clientes</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
              A confiança de quem confia sua operação à LEAN Locação e Serviços.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Carrossel infinito — full width com fade nas bordas */}
      <div
        className="relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)' }}
      >
        <div className="testimonials-track flex gap-6 w-max py-4 px-3">
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              className="lean-card lean-card-accent p-6 flex flex-col gap-4 flex-shrink-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ width: '340px' }}
            >
              <Quote className="w-8 h-8 flex-shrink-0" style={{ color: '#cce8d4' }} />
              <p className="text-sm leading-relaxed flex-1" style={{ color: '#555555' }}>{t.text}</p>
              <div>
                <StarRating count={t.stars} />
                <div className="mt-3">
                  <div className="font-bold text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#777777' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats full-width com foto */}
      <div className="mt-16 md:mt-24">
        {/* Foto full-width */}
        <div ref={photoContainerRef} className="relative w-full overflow-hidden" style={{ height: '480px' }}>
          <img
            ref={photoImgRef}
            src="/lovable-uploads/stats-bg.webp"
            alt="LEAN Locação e Serviços em operação"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            width="1920"
            height="480"
          />
          {/* overlay leve para legibilidade */}
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.15)' }} />
        </div>

        {/* Barra de stats */}
        <div className="w-full py-10 px-6" style={{ background: '#1e3d28' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 items-center justify-center gap-8 sm:gap-12 md:gap-20">
            {[
              { value: '+500', label: 'Projetos\nconcluídos' },
              { value: '100%', label: 'Documentação\nem dia' },
              { value: 'MG', label: 'e região\natendidos' },
              { value: 'Frota', label: 'Própria\ne atualizada' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  {value}
                </div>
                <div className="text-xs mt-2 tracking-widest uppercase whitespace-pre-line" style={{ color: '#7dba93', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 mt-8">
            <p className="text-sm" style={{ color: '#a5c9b2' }}>Ficou com alguma dúvida? Fale com a gente.</p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
              className="btn-pill font-bold text-sm px-8 py-3 w-full sm:w-auto transition-all duration-300 hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5"
              style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', background: 'transparent', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
