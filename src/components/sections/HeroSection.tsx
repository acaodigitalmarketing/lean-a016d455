import React, { memo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = memo(({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax na imagem de fundo do hero
      if (heroImgRef.current) {
        gsap.fromTo(heroImgRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Timeline de entrada (acima do fold — sem ScrollTrigger)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(labelRef.current, { opacity: 0, y: 16, duration: 0.5 })
        .from(h1Ref.current, { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from(ctasRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.2');

      // Parallax nas esferas decorativas
      gsap.to(circle1Ref.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(circle2Ref.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });

      gsap.to(circle3Ref.current, {
        y: -30,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 lg:pt-20 min-h-screen relative overflow-hidden flex items-center">
      {/* Background photo — oculta no mobile, visível no desktop */}
      <img
        ref={heroImgRef}
        src="/lovable-uploads/hero-1.webp"
        alt="LEAN Transportes — frota de equipamentos para mineração e terraplanagem"
        className="hidden lg:block absolute w-full object-cover"
        style={{ height: '140%', top: '-20%', willChange: 'transform', objectPosition: 'center' }}
        fetchPriority="high"
        loading="eager"
        decoding="sync"
        width="1920"
        height="1080"
      />
      {/* Gradient overlay desktop */}
      <div className="hidden lg:block absolute inset-0" style={{
        background: 'linear-gradient(105deg, rgba(10,28,16,0.92) 0%, rgba(20,50,30,0.85) 45%, rgba(10,28,16,0.55) 75%, rgba(10,28,16,0.3) 100%)'
      }} />
      {/* Fundo sólido mobile */}
      <div className="lg:hidden absolute inset-0" style={{ background: '#0e2016' }} />

      {/* Decorative circles */}
      <div ref={circle1Ref} className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: '#4a8460', willChange: 'transform' }} />
      <div ref={circle2Ref} className="absolute bottom-[-120px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: '#1e3d28', willChange: 'transform' }} />
      <div ref={circle3Ref} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: '#7dba93', willChange: 'transform' }} />

      <div className="container relative z-10 w-full">
        {/* Mobile layout: foto quadrada em cima, texto abaixo */}
        <div className="lg:hidden pt-6 pb-4">
          <div className="w-full aspect-square rounded-2xl overflow-hidden mb-8">
            <img
              src="/lovable-uploads/hero-1.webp"
              alt="LEAN Transportes — frota de equipamentos para mineração e terraplanagem"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
              width="640"
              height="640"
            />
          </div>
        </div>

        <div className="max-w-3xl lg:py-20 pb-10 lg:pb-0">

          {/* Label */}
          <div ref={labelRef} className="mb-6">
            <span className="inline-block text-[#7dba93] text-xs font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Locação de Equipamentos · Terraplanagem · Mineração
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="text-white mb-6 leading-[0.95]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(44px, 7vw, 88px)',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            Soluções <span style={{ color: '#7dba93' }}>para grandes projetos</span> em Morro do Ferro, Oliveira – MG e região.
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-[#a5d1b4] text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}>
            A Lean Transportes, sediada em Morro do Ferro, distrito de Oliveira – MG, oferece locação de equipamentos e soluções logísticas para operações de mineração, terraplanagem e obras de grande porte. Atuamos com frota moderna, equipe especializada e foco em eficiência operacional.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
              size="lg"
              className="btn-pill text-base font-bold min-h-[52px] w-full sm:w-auto transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              style={{ background: '#ffffff', color: '#1e3d28', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
              aria-label="Solicitar Orçamento"
            >
              Solicitar Orçamento
            </Button>
            <Button
              onClick={() => scrollToSection('equipamentos')}
              size="lg"
              variant="outline"
              className="btn-pill text-base font-bold min-h-[52px] w-full sm:w-auto transition-all duration-200 hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5 active:scale-95"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', background: 'transparent', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
              aria-label="Conheça os Equipamentos"
            >
              Conheça os Equipamentos
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
