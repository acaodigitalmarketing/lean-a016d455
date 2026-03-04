
import React from 'react';
import { Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';
import acaoDigitalLogo from '@/assets/logo-acao-digital-marketing.png';

const services = [
  'Caminhoes Cacamba',
  'Caminhao Munck',
  'Escavadeira XCMG',
  'Retroescavadeira JCB',
  'Terraplanagem',
  'Mineracao',
];

const Footer: React.FC = () => {
  return (
    <>
      <footer className="border-t py-12 md:py-16" style={{ background: '#1e3d28', borderColor: '#2a5235' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">

            {/* Column 1: Logo + Info */}
            <div>
              <div className="mb-5 flex items-baseline gap-0">
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 900, color: '#7dba93', lineHeight: 1, letterSpacing: '-2px' }}>
                  LEAN
                </span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 900, color: '#1e3d28', background: '#7dba93', padding: '0 5px', lineHeight: '1.2', letterSpacing: '-2px' }}>
                  T
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#a5d1b4' }}>
                Locacao de equipamentos e servicos de terraplanagem com frota moderna. Experiencia, seguranca e comprometimento desde 2008.
              </p>

              <p className="text-xs mb-5" style={{ color: '#7dba93', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Desde 2008 · Qualidade e Resultado
              </p>

              <div className="flex space-x-3">
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
              <h2 className="text-base font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Contato
              </h2>

              <div className="space-y-4">
                <a href="tel:+5537999993865"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity group">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>(37) 99999-3865 — Joao Augusto</span>
                </a>

                <a href="tel:+5537999931841"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity group">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>(37) 99993-1841 — Cristina</span>
                </a>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <div className="text-sm" style={{ color: '#a5d1b4' }}>
                    <p>Minas Gerais — MG</p>
                    <p className="text-xs mt-0.5" style={{ color: '#5c9e74' }}>MG e regioes adjacentes</p>
                  </div>
                </div>
              </div>

              <p className="text-xs mt-6 italic" style={{ color: '#5c9e74' }}>
                Atendimento rapido para suas demandas operacionais.
              </p>
            </div>

            {/* Column 3: Servicos */}
            <div>
              <h2 className="text-base font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Nossos Equipamentos
              </h2>

              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service} className="text-sm flex items-center gap-2" style={{ color: '#a5d1b4' }}>
                    <span style={{ color: '#5c9e74' }}>›</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className="border-t mt-10 pt-8" style={{ borderColor: '#2a5235' }}>
            <p className="text-xs text-center leading-relaxed" style={{ color: '#5c9e74' }}>
              © {new Date().getFullYear()} LEAN Transportes e Empreendimentos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Dev credits */}
      <div className="w-full py-4 border-t" style={{ background: '#1a1a1a', borderColor: '#2d2d2d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm" style={{ color: '#555555' }}>
            <span className="whitespace-nowrap">Desenvolvido pela</span>
            <a
              href="https://www.instagram.com/acaodigitalmarketing/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <img
                src={acaoDigitalLogo}
                alt="Acao Digital Marketing"
                className="h-4 sm:h-5 w-auto brightness-0 invert opacity-50"
                loading="lazy"
                decoding="async"
                width="120"
                height="24"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
