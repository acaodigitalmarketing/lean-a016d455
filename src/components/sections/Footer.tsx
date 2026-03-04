
import React from 'react';
import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import acaoDigitalLogo from '@/assets/logo-acao-digital-marketing.png';
import deluxeLogo from '@/assets/logo-projeto-deluxe.png';
import logoViva from '@/assets/logo-viva-plastica-clinica.svg';

const Footer: React.FC = () => {
  const procedures = [
    "Mamoplastia",
    "Mastopexia", 
    "Mamoplastia redutora",
    "Lipoaspiração HD",
    "Abdominoplastia",
    "Reconstrução mamária"
  ];

  return (
    <>
      <footer className="bg-dark-elevated border-t border-white/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            
            {/* Column 1: Logo + Info */}
            <div>
              <div className="mb-4">
              <img 
                src={logoViva} 
                alt="Dra. Fabiana Lage - Cirurgiã Plástica"
                className="h-14 w-auto brightness-0 invert"
                loading="lazy"
                decoding="async"
                width="200"
                height="56"
              />
              </div>
              
              <div className="space-y-2 text-sm text-light-muted mb-4">
                <p className="font-medium text-light-secondary">CRM 156467 · RQE 100094</p>
                <p>São Paulo – SP</p>
              </div>
              
              <p className="text-sm text-light-muted leading-relaxed">
                Atuação em contorno corporal, cirurgia das mamas e reconstrução mamária.
                Atendimento presencial, com acompanhamento próximo e cuidado individualizado em todas as etapas.
              </p>
              
              <div className="flex space-x-3 mt-6">
                <a 
                  href="https://www.instagram.com/drafabianalage.plastica/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-light-primary text-dark-base rounded-full w-11 h-11 flex items-center justify-center hover:bg-light-secondary transition-colors" 
                  aria-label="Visite o Instagram da Dra. Fabiana Lage"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
                <a 
                  href="https://www.facebook.com/drafabianalage/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-light-primary text-dark-base rounded-full w-11 h-11 flex items-center justify-center hover:bg-light-secondary transition-colors" 
                  aria-label="Visite o Facebook da Dra. Fabiana Lage"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Column 2: Contato */}
            <div>
              <h2 className="text-lg text-light-primary mb-6">Contato</h2>
              
              <div className="space-y-4">
                <a 
                  href="tel:+5511997592569" 
                  className="flex items-start gap-3 text-light-muted hover:text-light-primary transition-colors group"
                >
                  <Phone className="h-5 w-5 text-light-secondary group-hover:text-light-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">(11) 99759-2569</span>
                </a>
                
                <div className="flex items-start gap-3 text-light-muted">
                  <MapPin className="h-5 w-5 text-light-secondary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p>Av. Pavão, 955 cj 26 – Moema</p>
                    <p className="text-light-muted">São Paulo – SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-light-muted">
                  <MapPin className="h-5 w-5 text-light-secondary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p>Rua Canadá, 94 – Jardim América</p>
                    <p className="text-light-muted">São Paulo – SP</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-light-muted mt-6 italic">
                Atendimento mediante agendamento prévio.
              </p>
            </div>

            {/* Column 3: Áreas de atuação */}
            <div>
              <h2 className="text-lg text-light-primary mb-6">Áreas de atuação</h2>
              
              <ul className="space-y-2">
                {procedures.map((procedure, index) => (
                  <li key={index} className="text-sm text-light-muted">
                    {procedure}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal text */}
          <div className="border-t border-white/5 mt-10 pt-8">
            <p className="text-light-muted text-xs leading-relaxed text-center max-w-4xl mx-auto">
              O conteúdo deste site é informativo e educativo, elaborado com base na experiência clínica da Dra. Fabiana Lage, cirurgiã plástica, CRM 156467, RQE 100094, e segue as normas do Conselho Federal de Medicina.
            </p>
            <p className="text-light-muted text-xs text-center mt-4">
              © {new Date().getFullYear()} Dra. Fabiana Lage. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
      
      <div className="w-full bg-dark-base py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-light-muted text-xs sm:text-sm leading-tight">
            <span className="whitespace-nowrap">Este site foi desenvolvido pela</span>
            <a 
              href="https://www.instagram.com/acaodigitalmarketing/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <img 
                src={acaoDigitalLogo} 
                alt="Ação Digital Marketing - Agência de Marketing Digital"
                className="h-4 sm:h-5 lg:h-6 w-auto brightness-0 invert opacity-70"
                loading="lazy"
                decoding="async"
                width="120"
                height="24"
              />
            </a>
            <span className="whitespace-nowrap">como parte das entregas do PROJETO</span>
            <a 
              href="https://www.analuizavianah.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <img 
                src={deluxeLogo} 
                alt="Deluxe - Projeto de Marketing Digital"
                className="h-4 sm:h-5 lg:h-6 w-auto brightness-0 invert opacity-70"
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
