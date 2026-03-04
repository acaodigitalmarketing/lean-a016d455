import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

const stats = [
  { value: '+15', label: 'Anos de Experiência' },
  { value: '+50.000', label: 'Cargas Entregues' },
  { value: 'Segurança · Pontualidade · Tecnologia', isText: true },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-10 md:py-14 border-y" style={{ background: '#eaf5ed', borderColor: '#cce8d4' }}>
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
            style={{ divideColor: '#a5d1b4' }}>
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center py-6 md:py-0">
                {stat.isText ? (
                  <span className="text-sm md:text-base font-bold text-center"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {stat.value}
                  </span>
                ) : (
                  <>
                    <span className="text-3xl md:text-4xl font-bold mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#3a6b4a' }}>
                      {stat.value}
                    </span>
                    <span className="text-xs tracking-widest uppercase" style={{ color: '#4a8460' }}>
                      {stat.label}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default StatsSection;
