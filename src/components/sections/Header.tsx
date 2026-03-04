
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import vivaPlasticaLogo from '@/assets/logo-viva-plastica-clinica.svg';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-dark-base/80 backdrop-blur-xl border-b border-white/5 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          <div className="flex items-center">
            <img 
              src={vivaPlasticaLogo} 
              alt="Dra. Fabiana Lage - Cirurgia Plástica" 
              className="h-8 sm:h-10 lg:h-12 w-auto brightness-0 invert"
              width="200"
              height="48"
            />
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-10">
            <button onClick={() => scrollToSection('sobre')} className="text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide link-hover">
              Sobre
            </button>
            <button onClick={() => scrollToSection('procedimentos')} className="text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide link-hover">
              Procedimentos
            </button>
            <button onClick={() => scrollToSection('jornada')} className="text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide link-hover">
              Jornada do Paciente
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide link-hover">
              Depoimentos
            </button>
            <Button 
              onClick={() => scrollToSection('agendamento-form')} 
              className="btn-pill btn-gold text-sm font-semibold"
            >
              Agendar Consulta
            </Button>
          </nav>

          {/* Mobile/Tablet Menu Button - 48px touch target */}
          <button 
            className="lg:hidden text-light-primary min-w-[48px] min-h-[48px] flex items-center justify-center -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-dark-base/95 backdrop-blur-xl border-b border-white/5">
            <nav className="flex flex-col p-6 space-y-1">
              <button onClick={() => scrollToSection('sobre')} className="text-left text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide min-h-[48px] flex items-center">
                Sobre
              </button>
              <button onClick={() => scrollToSection('procedimentos')} className="text-left text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide min-h-[48px] flex items-center">
                Procedimentos
              </button>
              <button onClick={() => scrollToSection('jornada')} className="text-left text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide min-h-[48px] flex items-center">
                Jornada do Paciente
              </button>
              <button onClick={() => scrollToSection('depoimentos')} className="text-left text-light-secondary hover:text-light-primary transition-colors font-medium text-sm tracking-wide min-h-[48px] flex items-center">
                Depoimentos
              </button>
              <div className="pt-2">
                <Button 
                  onClick={() => scrollToSection('agendamento-form')} 
                  className="btn-pill btn-gold text-sm font-semibold w-full min-h-[48px]"
                >
                  Agendar Consulta
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
