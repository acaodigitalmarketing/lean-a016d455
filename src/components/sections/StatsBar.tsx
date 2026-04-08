import React from 'react';

const StatsBar: React.FC = () => {
  return (
    <section className="w-full">
      {/* Foto full-width */}
      <div className="relative w-full overflow-hidden" style={{ height: '480px' }}>
        <img
          src="/lovable-uploads/stats-bg.webp"
          alt="LEAN Locação e Serviços em operação"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
          width="1920"
          height="480"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.15)' }} />
      </div>

      {/* Barra de stats */}
      <div className="w-full py-10 px-6" style={{ background: '#1e3d28' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 items-center justify-center gap-8 sm:gap-12 md:gap-20">
          {[
            { value: '+500', label: 'Projetos\nconcluídos' },
            { value: '100%', label: 'Documentação\nem dia' },
            { value: 'MG', label: 'e região\natendidos' },
            { value: 'Frota', label: 'Própria\ne atualizada' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.5px', lineHeight: 1 }}>
                {value}
              </div>
              <div className="text-xs mt-2 tracking-widest uppercase whitespace-pre-line" style={{ color: '#7dba93', fontFamily: "'Barlow Condensed', sans-serif" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <p className="text-sm" style={{ color: '#a5c9b2' }}>Ficou com alguma dúvida? Fale com a gente.</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
            className="btn-pill font-bold text-sm px-8 py-3 w-full sm:w-auto transition-all duration-300 hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5"
            style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#ffffff', background: 'transparent', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Entrar em Contato
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
