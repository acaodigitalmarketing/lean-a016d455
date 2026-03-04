import React from 'react';
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

const TestimonialsSection: React.FC = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="lean-card lean-card-accent p-6 flex flex-col gap-4">
                <Quote className="w-8 h-8 flex-shrink-0" style={{ color: '#cce8d4' }} />
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#555555' }}>
                  {t.text}
                </p>
                <div>
                  <StarRating count={t.stars} />
                  <div className="mt-3">
                    <div className="font-bold text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>
                      {t.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#777777' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
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
