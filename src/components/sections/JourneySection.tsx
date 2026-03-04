
import React, { useRef, useEffect, useState } from 'react';
import jornada01 from '@/assets/journey/jornada-01.jpg';
import jornada02 from '@/assets/journey/jornada-02.jpg';
import jornada03 from '@/assets/journey/jornada-03.jpg';
import jornada04 from '@/assets/journey/jornada-04.jpg';
import jornada05 from '@/assets/journey/jornada-05.jpg';
import jornada06 from '@/assets/journey/jornada-06.jpg';
import jornada07 from '@/assets/journey/jornada-07.jpg';
import jornada08 from '@/assets/journey/jornada-08.jpg';

const journeySteps = [
  {
    number: "01",
    subtitle: "O primeiro contato",
    title: "Você já é prioridade desde o início",
    description: "O agendamento da consulta acontece, na maioria das vezes, pelo WhatsApp. Minha equipe orienta sobre datas, valores e, quando necessário, sinal para reserva. Desde o primeiro contato, meu objetivo é que você se sinta segura e bem informada sobre todo o processo.",
    image: jornada01,
  },
  {
    number: "02",
    subtitle: "Chegada ao consultório",
    title: "Recepção acolhedora e escuta atenta",
    description: "Ao chegar ao consultório, recebo você em um ambiente tranquilo e acolhedor, com café e bolo. Você preenche um questionário detalhado com seus dados, expectativas e procedimentos de interesse. Esse momento é importante para que eu compreenda suas necessidades de forma completa.",
    image: jornada02,
  },
  {
    number: "03",
    subtitle: "Primeira consulta",
    title: "Avaliação cuidadosa e transparente",
    description: "A consulta tem duração mínima de uma hora, especialmente na primeira vez. Avalio seu caso com atenção, explico as possibilidades de tratamento, esclareço dúvidas, solicito exames e já apresento um orçamento completo. Gosto de alinhar expectativas com clareza desde o início.",
    image: jornada03,
  },
  {
    number: "04",
    subtitle: "Definição da cirurgia",
    title: "Planejamento no seu tempo",
    description: "Durante a consulta, conversamos sobre quando você gostaria de realizar a cirurgia. Caso deseje seguir adiante, a data pode ser reservada. Após a realização dos exames, você retorna para uma nova avaliação, garantindo que tudo esteja bem planejado e seguro.",
    image: jornada04,
  },
  {
    number: "05",
    subtitle: "Consulta de retorno",
    title: "Detalhes que fazem diferença",
    description: "Nessa etapa, realizo medições, bioimpedância e finalizo o planejamento cirúrgico. Também preparo o kit de cirurgia, que inclui duas cintas, curativos específicos, pomada para cicatriz e outros itens essenciais para o pós-operatório, tudo organizado em uma bolsa personalizada.",
    image: jornada05,
  },
  {
    number: "06",
    subtitle: "Contratos e pré-operatório",
    title: "Segurança e orientação completa",
    description: "Você recebe o contrato e os termos de consentimento, com explicações claras sobre cada etapa. Uma semana antes da cirurgia, realizamos uma consulta pré-operatória para orientações finais, revisão de exames e alinhamento de todos os detalhes.",
    image: jornada06,
  },
  {
    number: "07",
    subtitle: "Dia da cirurgia",
    title: "Presença e cuidado em cada detalhe",
    description: "No dia da cirurgia, chego antes ao hospital para realizar a marcação ainda no quarto, conversar com você e com seus familiares. Levo uma das cintas para o centro cirúrgico, garantindo que você já saia da cirurgia vestida, com conforto e segurança.",
    image: jornada07,
  },
  {
    number: "08",
    subtitle: "Pós-operatório próximo e contínuo",
    title: "Acompanhamento que vai além da cirurgia",
    description: "O pós-operatório é acompanhado de perto, com retornos frequentes e contato próximo por mensagens. Trabalho em conjunto com a fisioterapeuta responsável pelas drenagens. O acompanhamento segue de forma contínua até a alta definitiva, sempre respeitando a evolução individual de cada paciente. Todos os acompanhamentos estão incluídos no pacote inicial.",
    image: jornada08,
  },
];

const JourneySection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="jornada" className="section-spacing bg-dark-elevated relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] decorative-blur decorative-blur-primary opacity-15" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center section-header-spacing">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-6 leading-tight tracking-tight">
            Sua jornada com a <span className="text-gradient">Dra. Fabiana Lage</span>
          </h2>
          <p className="text-lg md:text-xl text-light-muted max-w-4xl mx-auto leading-relaxed">
            Um processo transparente, organizado e acolhedor, cuidadosamente planejado para que cada etapa 
            da cirurgia aconteça com segurança, tranquilidade e acompanhamento próximo.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Linha central da timeline - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/30 to-transparent transform -translate-x-1/2 z-0"></div>
          
          {/* Linha lateral da timeline - mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5"></div>

          {/* Items da timeline */}
          <div className="space-y-12 md:space-y-24">
            {journeySteps.map((step, index) => {
              const isVisible = visibleItems.includes(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                >
                  {/* Ponto na timeline - desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                    <div className={`w-14 h-14 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center text-light-primary font-semibold text-sm shadow-glow transition-all duration-500 ${
                      isVisible ? 'scale-100' : 'scale-0'
                    }`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Ponto na timeline - mobile */}
                  <div className="md:hidden absolute left-6 top-0 transform -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center text-light-primary font-semibold text-xs shadow-glow transition-all duration-500 ${
                      isVisible ? 'scale-100' : 'scale-0'
                    }`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Conteúdo - Grid com texto e imagem alternando */}
                  <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center pl-16 md:pl-0`}>
                    {/* Texto */}
                    <div className={`${isEven ? 'md:pr-16 md:text-right' : 'md:order-2 md:pl-16'}`}>
                      <span className="subtitle-wide text-[hsl(43,74%,49%)]">
                        {step.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl text-light-primary mt-2 mb-4 leading-tight tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-light-muted leading-relaxed text-base md:text-lg">
                        {step.description}
                      </p>
                    </div>

                    {/* Imagem placeholder */}
                    <div className={`${isEven ? 'md:order-2 md:pl-16' : 'md:pr-16'}`}>
                      <div className={`overflow-hidden rounded-2xl shadow-dark-xl transition-all duration-700 delay-200 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}>
                        <img 
                          src={step.image} 
                          alt={step.subtitle}
                          className="w-full h-64 md:h-80 object-cover bg-dark-surface"
                          loading="lazy"
                          decoding="async"
                          width="560"
                          height="320"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Encerramento */}
          <div className="mt-20 text-center">
            <div className="inline-block glass-card px-8 py-6 rounded-2xl">
              <h4 className="text-xl md:text-2xl text-light-primary mb-2">
                Com você até a alta final
              </h4>
              <p className="text-light-muted text-sm md:text-base max-w-2xl">
                A alta acontece após esse período de acompanhamento, sempre respeitando sua evolução individual. 
                Meu compromisso é estar presente em todas as fases, do primeiro contato até o final da sua jornada cirúrgica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
