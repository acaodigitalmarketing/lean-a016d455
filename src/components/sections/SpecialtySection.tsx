
import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import specialtyImage from '@/assets/especialidade-mommy-makeover.jpg';

const SpecialtySection: React.FC = () => {
  return (
    <section id="especialidade" className="section-spacing bg-dark-elevated relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] decorative-blur decorative-blur-primary opacity-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] decorative-blur decorative-blur-accent opacity-10" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Introdução geral dos procedimentos */}
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-20">
            <span className="subtitle-wide text-[hsl(43,74%,49%)] mb-4 block">Procedimentos</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-6 leading-tight tracking-tight">
              Conheça os procedimentos
            </h2>
            <p className="text-sm md:text-base text-light-muted max-w-2xl mx-auto leading-relaxed">
              Cada procedimento é planejado minuciosamente para entregar resultados sofisticados, naturais e que realçam sua beleza única.
            </p>
          </div>
        </AnimatedSection>

        {/* Mommy Makeover */}
        {/* Content Card */}
        <AnimatedSection delay={100}>
          <div className="bg-dark-elevated border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
              {/* Image */}
              <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden">
                <div className="lg:absolute lg:inset-0">
                  <img
                    src={specialtyImage}
                    alt="Mommy Makeover - Cirurgia plástica pós-maternidade em São Paulo"
                    className="w-full h-full object-cover bg-dark-surface"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="480"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-elevated/50 hidden lg:block" />
              </div>

              {/* Text Content */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-6">
                <div>
                  <span className="subtitle-wide text-[hsl(43,74%,49%)] mb-3 block">Especialidade</span>
                  <h3 className="text-2xl md:text-3xl text-light-primary leading-tight tracking-tight mb-2">
                    Mommy Makeover
                  </h3>
                  <p className="text-sm md:text-base text-light-secondary">
                    Um protocolo cirúrgico completo para mulheres após a maternidade
                  </p>
                </div>
                <div className="space-y-5 text-light-muted leading-relaxed text-sm md:text-base">
                  <p>
                    O mommy makeover é um conjunto de cirurgias indicado para mulheres que desejam tratar alterações corporais comuns após a gestação. Minha abordagem é baseada em planejamento cuidadoso e avaliação individual, combinando procedimentos como <strong className="text-light-primary">mamoplastia</strong> e <strong className="text-light-primary">abdominoplastia</strong> quando há indicação médica, sempre respeitando a anatomia, o momento de vida e as necessidades de cada paciente.
                  </p>

                  <p>
                    Esse protocolo permite tratar, em uma mesma programação cirúrgica, flacidez das mamas, excesso de pele abdominal e alterações do contorno corporal, com técnicas atuais e criteriosas. O objetivo é restaurar proporção, harmonia e conforto corporal, com resultados elegantes e femininos, sem padronizações.
                  </p>

                  <p>
                    Cada mommy makeover é planejado de forma personalizada, considerando segurança, tempo cirúrgico adequado e recuperação responsável. A indicação, a combinação dos procedimentos e a condução do pós-operatório são feitas com critério técnico e acompanhamento próximo em todas as etapas.
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
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SpecialtySection;
