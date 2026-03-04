import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Truck, Package, MapPin, Clock } from 'lucide-react';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = memo(({ scrollToSection }) => {
  return (
    <section className="pt-16 lg:pt-20 min-h-screen relative overflow-hidden flex items-center"
      style={{ background: 'linear-gradient(135deg, #1e3d28 0%, #2a5235 40%, #3a6b4a 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: '#4a8460' }} />
      <div className="absolute bottom-[-120px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-30"
        style={{ background: '#1e3d28' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: '#7dba93' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-20">
        <div className="max-w-3xl">

          {/* Label */}
          <div className="mb-6">
            <span className="inline-block text-[#7dba93] text-xs font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Transporte · Logística · Rastreamento
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white mb-6 leading-[0.95]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(52px, 8vw, 96px)',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            Sua carga,<br />
            <span style={{ color: '#7dba93' }}>nossa responsabilidade.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#a5d1b4] text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}>
            Soluções completas em transporte de cargas para todo o Brasil, com rastreamento em tempo real, frota moderna e pontualidade garantida.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              onClick={() => scrollToSection('cotacao')}
              size="lg"
              className="btn-pill text-base font-bold min-h-[52px]"
              style={{ background: '#ffffff', color: '#1e3d28', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
              aria-label="Solicitar Cotação"
            >
              Solicitar Cotação
            </Button>
            <Button
              onClick={() => scrollToSection('como-funciona')}
              size="lg"
              variant="outline"
              className="btn-pill text-base font-bold min-h-[52px]"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', background: 'transparent', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
              aria-label="Como Funciona"
            >
              Como Funciona
            </Button>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8">
            {[
              { icon: Truck, value: '+15 Anos', label: 'de experiência' },
              { icon: Package, value: '+50.000', label: 'cargas entregues' },
              { icon: Clock, value: '99%', label: 'no prazo' },
              { icon: MapPin, value: 'Brasil', label: 'cobertura nacional' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Icon className="w-5 h-5 text-[#7dba93]" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {value}
                  </div>
                  <div className="text-[#a5d1b4] text-xs mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
