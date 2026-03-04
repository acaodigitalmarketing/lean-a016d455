
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

import imgMamoplastia from '@/assets/procedimento-mamoplastia.jpg';
import imgMastopexiaSemProtese from '@/assets/procedimento-mastopexia-sem-protese.jpg';
import imgMamoplastiaRedutora from '@/assets/procedimento-mamoplastia-redutora.jpg';
import imgMastopexia from '@/assets/procedimento-mastopexia.jpg';
import imgExplante from '@/assets/procedimento-explante.jpg';
import imgGinecomastia from '@/assets/procedimento-ginecomastia.jpg';
import imgReconstrucaoMamaria from '@/assets/procedimento-reconstrucao-mamaria-2.jpg';
import imgLipoaspiracaoHD from '@/assets/procedimento-lipoaspiracao-hd.jpg';
import imgAbdominoplastia from '@/assets/procedimento-abdominoplastia.jpg';
import imgLipoConvencional from '@/assets/procedimento-lipoaspiracao-convencional.jpg';
import imgMiniabdominoplastia from '@/assets/procedimento-miniabdominoplastia.jpg';
import imgPosBariatrica from '@/assets/procedimento-pos-bariatrica.jpg';
import imgBlefaroplastia from '@/assets/procedimento-blefaroplastia.jpg';
import imgOtoplastia from '@/assets/procedimento-otoplastia.jpg';
import imgLobuloplastia from '@/assets/procedimento-lobuloplastia.jpg';
import imgQueimaduras from '@/assets/procedimento-queimaduras.jpg';
import imgFeridasComplexas from '@/assets/procedimento-feridas-complexas.jpg';
import imgRefinamentoCicatrizes from '@/assets/procedimento-refinamento-cicatrizes.jpg';
import imgQueloides from '@/assets/procedimento-queloides.jpg';
import imgCancerPele from '@/assets/procedimento-cancer-pele.jpg';

type Procedure = {
  title: string;
  description: string;
  image?: string;
};

const mamarias: Procedure[] = [
  {
    title: "Mamoplastia de Aumento",
    description: "Cirurgia indicada para remodelar as mamas, ajustando volume, forma e proporção ao biotipo da paciente. Utilizo a técnica de cicatriz reduzida (Short Scar), com planejamento individualizado para um resultado elegante e sofisticado.",
    image: imgMamoplastia,
  },
  {
    title: "Mamoplastia Redutora",
    description: "Indicada para pacientes com excesso de volume mamário e desconfortos físicos ou funcionais. Trabalho com a técnica de cicatriz reduzida (Short Scar), buscando aliviar sintomas com mais conforto, equilíbrio corporal e qualidade de vida.",
    image: imgMamoplastiaRedutora,
  },
  {
    title: "Mastopexia com Prótese",
    description: "Procedimento que combina a elevação das mamas com a inclusão de implantes de silicone, utilizando a técnica de cicatriz reduzida (Short Scar). Indicada para pacientes com flacidez que também desejam mais volume, com resultados harmoniosos e cicatrizes discretas.",
    image: imgMastopexia,
  },
  {
    title: "Mastopexia sem Prótese",
    description: "Cirurgia voltada exclusivamente para a elevação e remodelação das mamas, sem uso de implantes, com a técnica de cicatriz reduzida (Short Scar). Indicada para pacientes que desejam corrigir a flacidez com sofisticação e cicatrizes bem posicionadas.",
    image: imgMastopexiaSemProtese,
  },
  {
    title: "Explante",
    description: "Remoção de implantes mamários de silicone com técnica cuidadosa, indicada para pacientes que desejam retirar suas próteses por questões pessoais, estéticas ou médicas.",
    image: imgExplante,
  },
  {
    title: "Ginecomastia",
    description: "Correção cirúrgica do excesso de tecido mamário masculino, devolvendo contorno torácico definido e confiança ao paciente com abordagem discreta e personalizada.",
    image: imgGinecomastia,
  },
  {
    title: "Reconstrução de Mama",
    description: "Atuação especializada em reconstrução mamária, com planejamento cuidadoso e abordagem humanizada. Acompanho cada paciente de forma próxima, respeitando o momento físico e emocional de cada fase do tratamento.",
    image: imgReconstrucaoMamaria,
  },
];

const contornoCorporal: Procedure[] = [
  {
    title: "Lipoaspiração Convencional",
    description: "Técnica consagrada para remoção de gordura localizada, com planejamento individualizado para promover contorno corporal harmonioso e resultados proporcionais ao biotipo de cada paciente.",
    image: imgLipoConvencional,
  },
  {
    title: "Lipoaspiração de Alta Definição (Lipo HD)",
    description: "Técnica avançada de contorno corporal que permite maior definição e realce da musculatura, sempre respeitando os limites do corpo e priorizando resultados harmônicos e elegantes.",
    image: imgLipoaspiracaoHD,
  },
  {
    title: "Abdominoplastia",
    description: "Cirurgia indicada para remover excesso de pele e flacidez abdominal, além de reforçar a musculatura quando necessário. O planejamento é feito com foco em segurança, funcionalidade e proporção corporal.",
    image: imgAbdominoplastia,
  },
  {
    title: "Miniabdominoplastia",
    description: "Versão menos invasiva da abdominoplastia, indicada para casos de flacidez leve na região abdominal inferior. Incisão menor, recuperação mais rápida e resultados refinados.",
    image: imgMiniabdominoplastia,
  },
  {
    title: "Pós-bariátrica",
    description: "Conjunto de procedimentos para remoção do excesso de pele após grande perda de peso. Planejamento estratégico e individualizado para devolver contorno corporal e qualidade de vida ao paciente.",
    image: imgPosBariatrica,
  },
];

const faciaisReparadoras: Procedure[] = [
  {
    title: "Blefaroplastia",
    description: "Cirurgia das pálpebras para corrigir o excesso de pele e bolsas de gordura ao redor dos olhos, proporcionando um olhar mais descansado, jovem e expressivo.",
    image: imgBlefaroplastia,
  },
  {
    title: "Otoplastia",
    description: "Correção estética das orelhas proeminentes, devolvendo proporção e simetria ao rosto. Indicada para crianças e adultos que desejam harmonizar o contorno auricular.",
    image: imgOtoplastia,
  },
  {
    title: "Lobuloplastia",
    description: "Reparo cirúrgico do lóbulo da orelha rasgado ou alargado pelo uso de brincos pesados ou alargadores, restaurando a forma e a estética da orelha.",
    image: imgLobuloplastia,
  },
  {
    title: "Tratamento de Queimaduras",
    description: "Reconstrução e tratamento especializado de sequelas de queimaduras, com abordagem humanizada e técnicas que visam restaurar a funcionalidade e a aparência da pele.",
    image: imgQueimaduras,
  },
  {
    title: "Feridas Complexas",
    description: "Tratamento especializado de feridas de difícil cicatrização, utilizando técnicas avançadas para promover a recuperação tecidual e funcional de forma segura.",
    image: imgFeridasComplexas,
  },
  {
    title: "Refinamento de Cicatrizes",
    description: "Técnicas cirúrgicas e complementares para melhorar a aparência de cicatrizes inestéticas, promovendo resultados mais discretos e integrados à pele.",
    image: imgRefinamentoCicatrizes,
  },
  {
    title: "Queloides e Cicatriz Hipertrófica",
    description: "Tratamento multidisciplinar para queloides e cicatrizes hipertróficas, combinando técnicas cirúrgicas e terapias complementares para controle e melhora estética.",
    image: imgQueloides,
  },
  {
    title: "Tratamento de Câncer de Pele",
    description: "Ressecção cirúrgica de lesões cutâneas malignas com reconstrução imediata, priorizando a remoção oncológica segura e o melhor resultado estético possível.",
    image: imgCancerPele,
  },
];

const sections = [
  {
    id: "cirurgias-mamarias",
    title: "Cirurgias Mamárias",
    subtitle: "Técnicas avançadas com cicatriz reduzida para remodelar, reconstruir e harmonizar as mamas com sofisticação e segurança.",
    procedures: mamarias,
    variant: "default" as const,
  },
  {
    id: "contorno-corporal",
    title: "Contorno Corporal",
    subtitle: "Procedimentos personalizados para esculpir e redefinir a silhueta, respeitando a anatomia individual de cada paciente.",
    procedures: contornoCorporal,
    variant: "overlay" as const,
  },
  {
    id: "faciais-reparadoras",
    title: "Cirurgias Faciais e Reparadoras",
    subtitle: "Rejuvenescimento facial e reconstrução reparadora com técnicas que aliam precisão cirúrgica a resultados sofisticados.",
    procedures: faciaisReparadoras,
    variant: "default" as const,
  },
];

const ProcedureCard: React.FC<{ procedure: Procedure }> = ({ procedure }) => (
  <Card className="glass-card group h-full border-white/5 hover:border-white/15 transition-all duration-300">
    <CardContent className="flex flex-col h-full p-5">
      <div className="aspect-square mb-5 overflow-hidden rounded-xl border border-white/5">
        {procedure.image ? (
          <img src={procedure.image} alt={procedure.title} className="w-full h-full object-cover bg-dark-surface" loading="lazy" decoding="async" width="300" height="300" />
        ) : (
          <div className="w-full h-full bg-dark-subtle flex items-center justify-center">
            <span className="text-light-muted text-xs uppercase tracking-widest">Em breve</span>
          </div>
        )}
      </div>
      <div className="flex-1 space-y-3">
        <h4 className="text-lg text-light-primary leading-tight uppercase tracking-wide">
          {procedure.title}
        </h4>
        <p className="text-light-muted leading-relaxed text-sm">
          {procedure.description}
        </p>
      </div>
    </CardContent>
  </Card>
);

const OverlayCard: React.FC<{ procedure: Procedure }> = ({ procedure }) => (
  <div className="group h-full rounded-2xl overflow-hidden relative cursor-default" style={{ aspectRatio: '3/4' }}>
    {procedure.image ? (
      <img
        src={procedure.image}
        alt={procedure.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-dark-surface"
        loading="lazy"
        decoding="async"
        width="400"
        height="533"
      />
    ) : (
      <div className="w-full h-full bg-[hsl(0,0%,18%)] flex items-center justify-center">
        <span className="text-light-muted text-xs uppercase tracking-widest">Em breve</span>
      </div>
    )}
    {/* Gradient overlay for text readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
      <h4 className="text-lg md:text-xl text-white font-medium leading-tight mb-2">
        {procedure.title}
      </h4>
      <p className="text-white/90 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
        {procedure.description}
      </p>
    </div>
  </div>
);

const ProceduresSection: React.FC = () => {
  return (
    <section id="procedimentos" className="overflow-hidden relative">
      <div className="bg-dark-base relative">
        <div className="absolute inset-0 gradient-glow-bottom" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] decorative-blur decorative-blur-accent opacity-15" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* Mamárias - dark default */}
          <div id={sections[0].id} className="section-spacing">
            <AnimatedSection>
              <div className="text-center section-header-spacing">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-6 leading-tight tracking-tight">
                  {sections[0].title}
                </h3>
                <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
                  {sections[0].subtitle}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="max-w-7xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-3 md:-ml-4">
                    {sections[0].procedures.map((procedure, index) => (
                      <CarouselItem key={index} className="pl-3 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4">
                        <ProcedureCard procedure={procedure} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-surface hover:bg-dark-subtle border border-white/10 hover:border-white/20 text-light-primary z-10 transition-all" />
                  <CarouselNext className="hidden md:flex -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-surface hover:bg-dark-subtle border border-white/10 hover:border-white/20 text-light-primary z-10 transition-all" />
                </Carousel>
              </div>
            </AnimatedSection>
            <div className="text-center mt-10">
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

      {/* Contorno Corporal - warm light background with overlay cards */}
      <div className="bg-dark-elevated relative">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div id={sections[1].id} className="section-spacing">
            <AnimatedSection>
              <div className="text-center section-header-spacing">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-6 leading-tight tracking-tight">
                  {sections[1].title}
                </h3>
                <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
                  {sections[1].subtitle}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="max-w-7xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-3 md:-ml-4">
                    {sections[1].procedures.map((procedure, index) => (
                      <CarouselItem key={index} className="pl-3 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4">
                        <OverlayCard procedure={procedure} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-light-primary z-10 transition-all" />
                  <CarouselNext className="hidden md:flex -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-light-primary z-10 transition-all" />
                </Carousel>
              </div>
            </AnimatedSection>
            <div className="text-center mt-10">
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

      {/* Faciais e Reparadoras - dark default */}
      <div className="bg-dark-base relative">
        <div className="absolute inset-0 gradient-glow-bottom" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div id={sections[2].id} className="section-spacing">
            <AnimatedSection>
              <div className="text-center section-header-spacing">
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-6 leading-tight tracking-tight">
                  {sections[2].title}
                </h3>
                <p className="text-lg md:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed">
                  {sections[2].subtitle}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="max-w-7xl mx-auto relative">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-3 md:-ml-4">
                    {sections[2].procedures.map((procedure, index) => (
                      <CarouselItem key={index} className="pl-3 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4">
                        <ProcedureCard procedure={procedure} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-surface hover:bg-dark-subtle border border-white/10 hover:border-white/20 text-light-primary z-10 transition-all" />
                  <CarouselNext className="hidden md:flex -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-surface hover:bg-dark-subtle border border-white/10 hover:border-white/20 text-light-primary z-10 transition-all" />
                </Carousel>
              </div>
            </AnimatedSection>
            <div className="text-center mt-10">
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
    </section>
  );
};

export default ProceduresSection;
