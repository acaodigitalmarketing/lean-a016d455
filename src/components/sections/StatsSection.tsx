
import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

const stats = [
  { value: '+10', label: 'Anos de Experiência' },
  { value: '+1000', label: 'Pacientes Operadas' },
  { value: '3', label: 'Técnica · Segurança · Naturalidade', isText: true },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-10 md:py-14 bg-dark-base border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center py-6 md:py-0">
                <span className="text-3xl md:text-4xl font-light text-[hsl(43,74%,49%)] tracking-tight mb-2">
                  {stat.isText ? '' : stat.value}
                </span>
                {stat.isText ? (
                  <span className="text-sm md:text-base text-[hsl(43,74%,49%)] tracking-[0.2em] uppercase font-light text-center">
                    Técnica · Segurança · Naturalidade
                  </span>
                ) : (
                  <span className="text-xs text-light-muted tracking-[0.25em] uppercase">
                    {stat.label}
                  </span>
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
