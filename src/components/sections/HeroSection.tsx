
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/cirurgia-plastica-estetica-belo-horizonte.webp';
import heroBannerMobile from '@/assets/cirurgia-plastica-estetica-mobile.webp';
import { useParallax } from '@/hooks/useParallax';
import { Star } from 'lucide-react';
import avatar1 from '@/assets/avatar-paciente-1.jpg';
import avatar2 from '@/assets/avatar-paciente-2.jpg';
import avatar3 from '@/assets/avatar-paciente-3.jpg';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const SocialProof = () =>
<div className="flex flex-col items-center lg:items-start gap-3">
    {/* Stars and text */}
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) =>
      <Star key={i} className="w-4 h-4 fill-light-primary text-light-primary" />
      )}
      </div>
      <span className="text-sm text-light-secondary font-medium">+1000 Pacientes transformados</span>
    </div>
    
    {/* Avatar circles */}
    <div className="flex items-center">
      <div className="flex -space-x-3">
        <img
        src={avatar1}
        alt="Paciente satisfeita"
        className="w-10 h-10 rounded-full border-2 border-dark-subtle object-cover ring-2 ring-dark-base"
        width="40"
        height="40"
        decoding="async" />

        <img
        src={avatar2}
        alt="Paciente satisfeita"
        className="w-10 h-10 rounded-full border-2 border-dark-subtle object-cover ring-2 ring-dark-base"
        width="40"
        height="40"
        decoding="async" />

        <img
        src={avatar3}
        alt="Paciente satisfeita"
        className="w-10 h-10 rounded-full border-2 border-dark-subtle object-cover ring-2 ring-dark-base"
        width="40"
        height="40"
        decoding="async" />

        <div className="w-10 h-10 rounded-full border-2 border-dark-subtle bg-dark-surface flex items-center justify-center text-xs text-light-primary font-medium ring-2 ring-dark-base">
          +50
        </div>
      </div>
    </div>
  </div>;


const HeroSection: React.FC<HeroSectionProps> = memo(({ scrollToSection }) => {
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.15 });

  return (
    <section ref={parallaxRef} className="pt-16 lg:pt-24 lg:min-h-screen relative overflow-hidden bg-dark-base">
      
      
      {/* Layout Mobile/Tablet - Vertical */}
      <div className="lg:hidden flex flex-col">
        {/* Imagem no topo - LCP Element */}
        <div className="w-full relative">
          <img
            src={heroBannerMobile}
            alt="Viva Plástica - Cirurgia Plástica Estética e Reconstrutora"
            className="w-full h-auto object-cover"
            width="768"
            height="768"
            fetchPriority="high"
            decoding="sync"
            loading="eager" />

          
        </div>
        
        {/* Texto centralizado abaixo */}
        <div className="px-6 pt-8 pb-12 text-center bg-dark-base relative">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-light text-light-primary leading-tight tracking-tight">
                Cirurgia plástica em São Paulo<br />
                <span className="text-gradient">especializada em mamoplastia e contorno corporal feminino</span>
              </h1>
              <p className="text-lg font-medium text-gradient-gold tracking-wide">
                Recupere o corpo que reflete quem você é.
              </p>
              <p className="text-base text-light-muted leading-relaxed">
                Do Mommy Makeover completo às mamoplastias, lipoaspiração e abdominoplastia, 
                ofereço cirurgias personalizadas para mulheres que desejam restaurar firmeza, 
                proporção e harmonia corporal após a maternidade ou em qualquer fase da vida.
              </p>
              <p className="text-base text-light-muted leading-relaxed">
                Cada mulher vive transformações únicas — seja após a gestação ou ao longo dos anos.
              </p>
              <p className="text-base text-light-muted leading-relaxed">
                Meu papel é unir técnica, segurança e tecnologia para proporcionar resultados naturais, 
                equilibrados e alinhados à sua estrutura corporal e ao que você deseja para si.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => scrollToSection('agendamento-form')}
                size="lg"
                className="btn-pill btn-gold text-base font-semibold"
                aria-label="Agendar Consulta">

                Agendar Consulta
              </Button>
            </div>
            
            {/* Social Proof Mobile */}
            <SocialProof />
          </div>
        </div>
      </div>

      {/* Layout Desktop - Original com imagem de fundo e parallax */}
      <div
        className="hidden lg:flex min-h-[100vh] items-center relative">

        {/* Background com parallax - LCP Element */}
        <img
          src={heroBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-right will-change-transform"
          style={{
            transform: `translateY(${offset}px) scale(1.1)`
          }}
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="sync"
          loading="eager" />

        
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="w-full lg:max-w-2xl">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-4xl lg:text-5xl font-light text-light-primary leading-tight tracking-tight" role="presentation" aria-hidden="true">
                  Cirurgia plástica em São Paulo <span className="text-gradient">especializada em mamoplastia e contorno corporal feminino</span>
                </p>
                <p className="text-xl font-medium text-gradient-gold tracking-wide">
                  Recupere o corpo que reflete quem você é.
                </p>
                <p className="text-xl text-light-muted leading-relaxed max-w-xl">
                  Do Mommy Makeover completo às mamoplastias, lipoaspiração e abdominoplastia, 
                  ofereço cirurgias personalizadas para mulheres que desejam restaurar firmeza, 
                  proporção e harmonia corporal após a maternidade ou em qualquer fase da vida.
                </p>
                <p className="text-xl text-light-muted leading-relaxed max-w-xl">
                  Cada mulher vive transformações únicas — seja após a gestação ou ao longo dos anos.
                </p>
                <p className="text-xl text-light-muted leading-relaxed max-w-xl">
                  Meu papel é unir técnica, segurança e tecnologia para proporcionar resultados naturais, 
                  equilibrados e alinhados à sua estrutura corporal e ao que você deseja para si.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection('agendamento-form')}
                  size="lg"
                  className="btn-pill btn-gold text-base font-semibold"
                  aria-label="Agendar Consulta">

                  Agendar Consulta
                </Button>
                <Button
                  onClick={() => scrollToSection('sobre')}
                  size="lg"
                  variant="outline"
                  className="btn-pill border-[hsl(43,74%,49%)]/50 text-[hsl(43,74%,49%)] hover:bg-[hsl(43,74%,49%)]/10 bg-transparent text-base font-semibold"
                  aria-label="Conheça Minha Trajetória">

                  Conheça Minha Trajetória
                </Button>
              </div>
              
              {/* Social Proof Desktop */}
              <SocialProof />
            </div>
          </div>
        </div>
      </div>
    </section>);

});

HeroSection.displayName = 'HeroSection';

export default HeroSection;