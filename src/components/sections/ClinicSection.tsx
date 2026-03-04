
import React from 'react';
import cirurgioesBackground from '@/assets/centro-cirurgico-cirurgia-plastica.jpg';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';

const ClinicSection: React.FC = () => {
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.2 });

  return (
    <section id="clinica" ref={parallaxRef} className="section-spacing relative overflow-hidden">
      {/* Background da clínica com parallax */}
      <div 
        className="absolute inset-0 will-change-transform overflow-hidden"
        style={{
          transform: `translateY(${offset}px) scale(1.15)`,
        }}
      >
        <img
          src={cirurgioesBackground}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
          width="1920"
          height="1080"
        />
      </div>
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-20" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block" />
          {/* Conteúdo sobre cirurgia plástica - lado direito */}
          <div className="space-y-6 bg-gradient-to-r from-white/90 via-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-8">
             <h2 className="text-3xl md:text-4xl text-dark-base tracking-tight leading-tight">
               Por que escolher a<br />Dra. Fabiana Lage
             </h2>
             
             <div className="space-y-4 text-dark-base/70 leading-relaxed text-sm md:text-base">
               <p>
                 Minha atuação é focada em <strong className="text-dark-base">mommy makeover</strong>, <strong className="text-dark-base">mamoplastia</strong> e <strong className="text-dark-base">abdominoplastia</strong>, com uma abordagem estética moderna e planejamento individualizado para cada paciente. Cada cirurgia é pensada de forma cuidadosa, respeitando o biotipo, o momento de vida e os objetivos reais de quem me procura.
               </p>
               
               <p>
                 Busco resultados sofisticados e femininos, com atenção à proporção, à harmonia corporal e à naturalidade, evitando padronizações. Ao longo de toda a jornada cirúrgica, ofereço um atendimento humanizado e seguro, com acompanhamento próximo desde a primeira consulta até o pós-operatório, comunicação clara e cuidado contínuo em todas as etapas.
               </p>
             </div>

          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClinicSection;
