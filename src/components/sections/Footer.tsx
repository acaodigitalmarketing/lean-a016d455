
import React from 'react';
import { Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';

const equipamentos = [
  'Caminhões Caçamba',
  'Caminhão Munck',
  'Escavadeira XCMG',
  'Retroescavadeira JCB',
];

const servicos = [
  'Terraplanagem',
  'Mineração',
  'Movimentação de Terra',
  'Locação de Equipamentos',
];

const Footer: React.FC = () => {
  return (
    <>
      <footer className="border-t py-12 md:py-16" style={{ background: '#152a1b', borderColor: '#1e3d28' }}>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center sm:text-left">

            {/* Column 1: Logo + Info */}
            <div>
              <div className="mb-5">
                <img
                  src="/lovable-uploads/ativo-2.svg"
                  alt="LEAN Locação e Serviços"
                  className="mx-auto sm:mx-0"
                  style={{ height: '48px', width: 'auto' }}
                />
                <p className="text-xs font-bold tracking-wide uppercase mt-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#a5d1b4', letterSpacing: '0.1em' }}>
                  Locação e Serviços
                </p>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#a5d1b4' }}>
                Locação de equipamentos para mineração e terraplanagem com frota moderna. Experiência, segurança e comprometimento desde 2008.
              </p>

              <p className="text-xs mb-5" style={{ color: '#7dba93', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Desde 2008 · Qualidade e Resultado
              </p>

              <div className="flex justify-center sm:justify-start space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ background: '#3a6b4a' }}
                  aria-label="Instagram LEAN Transportes">
                  <Instagram className="h-4 w-4" style={{ color: '#ffffff' }} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ background: '#3a6b4a' }}
                  aria-label="Facebook LEAN Transportes">
                  <Facebook className="h-4 w-4" style={{ color: '#ffffff' }} />
                </a>
              </div>
            </div>

            {/* Column 2: Contato */}
            <div>
              <h3 className="text-base font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Contato
              </h3>

              <div className="space-y-4">
                <a href="tel:+5537998632059"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity group justify-center sm:justify-start">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>(37) 99863-2059 — Munk</span>
                </a>

                <a href="tel:+5537999811841"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity group justify-center sm:justify-start">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>(37) 99981-1841 — Diretor</span>
                </a>

                <a href="tel:+5537999931841"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity group justify-center sm:justify-start">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>(37) 99993-1841 — Escritório</span>
                </a>

                <div className="flex items-start gap-3 justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <div className="text-sm" style={{ color: '#a5d1b4' }}>
                    <p>Av. Waldemar Fernal</p>
                    <p>Morro do Ferro, Oliveira – MG</p>
                    <p className="text-xs mt-0.5" style={{ color: '#5c9e74' }}>CEP 35540-000</p>
                  </div>
                </div>
              </div>

              <p className="text-xs mt-6 italic" style={{ color: '#5c9e74' }}>
                Atendimento rapido para suas demandas operacionais.
              </p>
            </div>

            {/* Column 3: Equipamentos */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-base font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Equipamentos
              </h3>

              <ul className="space-y-2">
                {equipamentos.map((item) => (
                  <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#a5d1b4' }}>
                    <span style={{ color: '#5c9e74' }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Serviços */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-base font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Serviços
              </h3>

              <ul className="space-y-2">
                {servicos.map((item) => (
                  <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#a5d1b4' }}>
                    <span style={{ color: '#5c9e74' }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className="border-t mt-10 pt-8" style={{ borderColor: '#1e3d28' }}>
            <p className="text-xs text-center leading-relaxed" style={{ color: '#5c9e74' }}>
              Todos os direitos reservados para © {new Date().getFullYear()} LEAN Locações e Serviços.
            </p>
          </div>
        </div>
      </footer>

      {/* Dev credits */}
      <div className="w-full py-3" style={{ background: '#0e1f12' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span className="text-xs" style={{ color: '#3a5c42' }}>Site desenvolvido por</span>
            <a
              href="https://www.instagram.com/acaodigitalmarketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src="/lovable-uploads/acao-branca.png.png"
                alt="Ação Digital"
                style={{ height: '18px', width: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
