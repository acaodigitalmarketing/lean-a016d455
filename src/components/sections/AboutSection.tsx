
import React from 'react';
import { GraduationCap, Heart, UserCheck, Award, Trophy, BookOpen, Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import draFabianaPhoto from '@/assets/dra-fabiana-lage-cirurgia-plastica.jpeg';

const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="section-spacing bg-dark-elevated relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] decorative-blur decorative-blur-primary opacity-20" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] decorative-blur decorative-blur-accent opacity-15" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-light-primary leading-tight tracking-tight">
              Conheça a Especialista –<br />
              <span className="text-gradient">Excelência Reconhecida Internacionalmente</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo do texto - lado esquerdo */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-3xl md:text-4xl text-light-primary leading-tight tracking-tight">
                Dra. Fabiana Lage
              </h3>
              <p className="text-lg md:text-xl text-light-secondary font-medium">
                Cirurgiã Plástica | Contorno Corporal e Cirurgia das Mamas
              </p>
              <p className="text-light-muted text-sm">
                CRM 156467 · RQE 100094<br />
                São Paulo – SP
              </p>
            </div>
            
            <div className="space-y-4 text-light-muted leading-relaxed text-sm md:text-base">
              <p>
                Cirurgiã plástica formada pela <strong className="text-light-primary">UNIFESP</strong>, com título de especialista 
                reconhecido pela AMB/MEC. Especializada em <strong className="text-light-primary">contorno corporal, cirurgia das mamas 
                e reconstrução mamária</strong>, com pós-graduação pelo IBCC e fellowship pela UNIFESP.
              </p>
              <p>
                Premiada em congressos da especialidade e com artigos publicados em revistas científicas internacionais de referência. 
                Cada decisão cirúrgica é guiada por <strong className="text-light-primary">critério técnico, segurança e busca por 
                resultados sofisticados</strong>.
              </p>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={() => document.getElementById('agendamento-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="btn-pill btn-gold font-semibold"
              >
                Agendar Consulta
              </button>
            </div>
          </div>
          
          {/* Foto da médica - lado direito */}
          <div className="flex items-center justify-center relative">
            <div className="relative">
              {/* Círculo decorativo de fundo */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-glow-primary/20 blur-3xl"></div>
              <div className="absolute -bottom-12 -left-8 w-24 h-24 rounded-full bg-glow-accent/10 blur-2xl"></div>
              
              <img 
                src={draFabianaPhoto} 
                alt="Dra. Fabiana Lage - Cirurgiã Plástica em São Paulo"
                className="w-full max-w-md aspect-[3/4] object-cover object-top rounded-2xl border border-white/10 shadow-dark-xl relative z-10 bg-dark-surface"
                loading="lazy"
                decoding="async"
                width="448"
                height="597"
              />
              
              {/* Badge SBCP */}
              <div className="flex items-center justify-center gap-3 mt-5 relative z-10 border border-[hsl(43,74%,49%)]/40 rounded-full py-2.5 w-full max-w-md mx-auto">
                <div className="w-7 h-7 rounded-full border border-[hsl(43,74%,49%)]/50 flex items-center justify-center flex-shrink-0">
                  <Award className="h-3.5 w-3.5 text-[hsl(43,74%,49%)]" strokeWidth={2} />
                </div>
                <span className="text-xs text-[hsl(43,74%,49%)] tracking-[0.25em] uppercase font-medium">Membro SBCP</span>
              </div>
            </div>
          </div>
        </div>

        </AnimatedSection>

        {/* Cards de credenciais com animação */}
        <AnimatedSection delay={200}>
        <div className="relative mt-16 md:mt-24">
          {/* Background animated floating cards */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
            {/* Floating card 1 */}
            <div className="absolute -top-4 -left-8 w-32 h-40 bg-dark-surface/20 border border-white/5 rounded-2xl -rotate-[8deg] animate-float" style={{ animationDuration: '6s' }} />
            {/* Floating card 2 */}
            <div className="absolute top-1/2 -right-12 w-28 h-36 bg-dark-surface/15 border border-white/5 rounded-2xl rotate-[12deg] animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
            {/* Floating card 3 */}
            <div className="absolute -bottom-8 left-1/4 w-24 h-32 bg-dark-surface/10 border border-white/5 rounded-2xl rotate-[5deg] animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }} />
            {/* Floating card 4 */}
            <div className="absolute top-8 right-1/4 w-20 h-28 bg-dark-surface/10 border border-white/5 rounded-2xl -rotate-[5deg] animate-float" style={{ animationDuration: '9s', animationDelay: '2s' }} />
          </div>

          {/* Main cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 relative z-10">
            {[
              { icon: GraduationCap, title: 'Mestrado em Cirurgia Plástica – UNIFESP' },
              { icon: Heart, title: 'Expertise em reconstrução mamária – IBCC e UNIFESP' },
              { icon: Sparkles, title: 'Pós-graduação em Laser e Cosmiatria – Hospital Albert Einstein' },
              { icon: Trophy, title: 'Premiações internacionais' },
              { icon: BookOpen, title: 'Publicações científicas em revistas internacionais' },
              { icon: UserCheck, title: 'Especialização contínua em congressos e cursos internacionais' },
            ].map((item, index) => (
              <div key={index} className="bg-dark-surface border border-[hsl(43,74%,49%)]/20 rounded-2xl p-5 md:p-6 group hover:border-[hsl(43,74%,49%)]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl border border-white/15 bg-dark-elevated flex items-center justify-center flex-shrink-0 group-hover:border-white/25 group-hover:bg-dark-subtle transition-all">
                  <item.icon className="h-4 w-4 text-[hsl(43,74%,49%)]" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm text-light-primary leading-snug tracking-tight pt-2">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
