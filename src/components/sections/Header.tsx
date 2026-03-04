import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const navLinks = [
  { label: 'A Lean', id: 'sobre' },
  { label: 'Serviços', id: 'servicos' },
  { label: 'Equipamentos', id: 'equipamentos' },
  { label: 'Como Funciona', id: 'como-funciona' },
];

const openForm = () => window.dispatchEvent(new CustomEvent('open-whatsapp-form'));

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-lean">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-baseline gap-0 focus:outline-none"
            aria-label="LEAN Transportes e Empreendimentos - Início"
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 900, color: '#3a6b4a', lineHeight: '1', letterSpacing: '-2px' }}>
              LEAN
            </span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 900, color: '#ffffff', background: '#3a6b4a', padding: '0 5px', lineHeight: '1.2', letterSpacing: '-2px' }}>
              T
            </span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-[#2d2d2d] hover:text-[#3a6b4a] transition-colors text-sm link-hover"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
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
