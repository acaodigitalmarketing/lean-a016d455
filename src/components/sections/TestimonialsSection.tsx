import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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

const VISIBLE = 3; // cards visíveis no desktop

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const maxDesktop = testimonials.length - VISIBLE;

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxDesktop, c + 1));

  return (
    <section id="depoimentos" className="section-spacing relative overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-15" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="text-center section-header-spacing">
            <span className="lean-label block mb-3">Depoimentos</span>
            <h2 className="lean-section-title mb-4">O que dizem nossos clientes</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
              A confianca de quem confia sua carga a LEAN Transportes.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          {/* Desktop: carrossel deslizando 3 visíveis */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-400 ease-in-out"
                style={{ transform: `translateX(calc(-${current} * (100% / ${VISIBLE} + 8px)))` }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="lean-card lean-card-accent p-6 flex flex-col gap-4 flex-shrink-0"
                    style={{ width: `calc((100% - ${(VISIBLE - 1) * 24}px) / ${VISIBLE})` }}
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

            {/* Controles desktop */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                disabled={current === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: '#3a6b4a', color: '#ffffff' }}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(Math.min(i, maxDesktop))}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i >= current && i < current + VISIBLE ? '#3a6b4a' : '#cce8d4' }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={current >= maxDesktop}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: '#3a6b4a', color: '#ffffff' }}
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile: 1 card por vez */}
          <div className="md:hidden relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <div className="lean-card lean-card-accent p-6 flex flex-col gap-4">
                      <Quote className="w-8 h-8 flex-shrink-0" style={{ color: '#cce8d4' }} />
                      <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>{t.text}</p>
                      <div>
                        <StarRating count={t.stars} />
                        <div className="mt-3">
                          <div className="font-bold text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>{t.name}</div>
                          <div className="text-xs mt-0.5" style={{ color: '#777777' }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <button
                onClick={prev}
                disabled={current === 0}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: '#3a6b4a', color: '#ffffff' }}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i === current ? '#3a6b4a' : '#cce8d4' }} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
              <button
                onClick={next}
                disabled={current === testimonials.length - 1}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: '#3a6b4a', color: '#ffffff' }}
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Trust badges */}
        <AnimatedSection delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t" style={{ borderColor: '#cce8d4' }}>
            {[
              { value: '+500', label: 'Empresas atendidas' },
              { value: '+50.000', label: 'Cargas entregues' },
              { value: '4.9/5', label: 'Avaliacao media' },
              { value: '15+', label: 'Anos de mercado' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-bold text-3xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a' }}>
                  {value}
                </div>
                <div className="text-xs mt-1 tracking-wide uppercase" style={{ color: '#777777', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
