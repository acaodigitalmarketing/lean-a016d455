import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Building2, Wrench, Truck, Route } from 'lucide-react';

type NavLink = { label: string; id: string; Icon: React.ElementType };

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  navLinks?: NavLink[];
}

const defaultNavLinks: NavLink[] = [
  { label: 'A Lean', id: 'sobre', Icon: Building2 },
  { label: 'Diferenciais', id: 'servicos', Icon: Wrench },
  { label: 'Equipamentos', id: 'equipamentos', Icon: Truck },
  { label: 'Como Funciona', id: 'como-funciona', Icon: Route },
];

const openForm = () => window.dispatchEvent(new CustomEvent('open-whatsapp-form'));

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, scrollToSection, navLinks = defaultNavLinks }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-lean">
      <div className="container">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="focus:outline-none"
            aria-label="LEAN Locação e Serviços - Início"
          >
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/ativo-1.svg"
                alt="LEAN Locação e Serviços"
                style={{ height: '40px', width: 'auto' }}
              />
              <span className="text-xs font-bold tracking-wide uppercase hidden sm:block text-left" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#2d2d2d', lineHeight: '1.1' }}>
                Locação<br />e Serviços
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ label, id, Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="nav-icon-reveal text-[#2d2d2d] hover:text-[#3a6b4a] transition-colors text-sm link-hover"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                <Icon className="nav-icon" style={{ width: '16px', height: '16px', color: '#3a6b4a' }} strokeWidth={2} />
                {label}
              </button>
            ))}
            <Button
              onClick={openForm}
              className="btn-pill btn-primary text-sm px-5 py-2.5"
            >
              Solicitar Orçamento
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#3a6b4a] min-w-[48px] min-h-[48px] flex items-center justify-center -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#f7f6f3] border-b border-[#cce8d4] shadow-md">
            <nav className="flex flex-col p-6 space-y-1">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-left text-[#2d2d2d] hover:text-[#3a6b4a] transition-colors text-sm min-h-[48px] flex items-center"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  {label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={openForm}
                  className="btn-pill btn-primary text-sm w-full min-h-[48px]"
                >
                  Solicitar Orçamento
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
