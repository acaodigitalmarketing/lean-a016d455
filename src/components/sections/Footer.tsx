
import React from 'react';
import { Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';
import acaoDigitalLogo from '@/assets/logo-acao-digital-marketing.png';

const services = [
  'Carga Geral',
  'Carga Refrigerada',
  'Carga Fracionada',
  'Carga Perigosa',
  'Mudancas e Transferencias',
  'Logistica Dedicada',
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
                Solucoes completas em transporte de cargas para todo o Brasil. Seguranca, pontualidade e tecnologia em cada entrega.
              </p>

              <p className="text-xs mb-5" style={{ color: '#7dba93', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ANTT Regularizada · Seguro Incluso
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
                <a href="tel:+551199999999"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity group">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>(11) 99999-9999</span>
                </a>

                <a href="mailto:contato@leantransportes.com.br"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <span className="text-sm" style={{ color: '#a5d1b4' }}>contato@leantransportes.com.br</span>
                </a>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#7dba93' }} />
                  <div className="text-sm" style={{ color: '#a5d1b4' }}>
                    <p>Sao Paulo — SP</p>
                    <p className="text-xs mt-0.5" style={{ color: '#5c9e74' }}>Cobertura nacional</p>
                  </div>
                </div>
              </div>

              <p className="text-xs mt-6 italic" style={{ color: '#5c9e74' }}>
                Atendimento 24h para emergencias logisticas.
              </p>
            </div>

            {/* Column 3: Servicos */}
            <div>
              <h2 className="text-base font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Nossos Servicos
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
              © {new Date().getFullYear()} LEAN Transportes. Todos os direitos reservados. CNPJ: XX.XXX.XXX/XXXX-XX · ANTT Regularizada.
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
