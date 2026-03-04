import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    onDecline?.();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:p-4 pointer-events-none">
        <div className="glass-card border border-white/10 rounded-2xl shadow-dark-xl max-w-3xl w-full pointer-events-auto mb-safe bg-dark-elevated/95 backdrop-blur-xl">
          <div className="relative p-4 sm:p-6">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-light-muted hover:text-light-primary transition-colors z-10 p-1 rounded-full hover:bg-white/5"
              aria-label="Fechar"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <div className="flex flex-col gap-4 sm:gap-5 pr-6 sm:pr-0 md:flex-row md:items-center">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-light-primary mb-2 leading-tight tracking-tight">
                  Gerenciamento de Cookies
                </h3>
                <p className="text-light-muted text-xs sm:text-sm leading-relaxed">
                  Utilizamos cookies para personalizar anúncios e melhorar sua experiência. 
                  Ao continuar navegando, você concorda com nossos{' '}
                  <button 
                    onClick={() => setShowTerms(true)} 
                    className="text-light-secondary hover:text-light-primary underline underline-offset-2 transition-colors cursor-pointer bg-transparent border-none p-0 font-medium"
                    type="button"
                  >
                    Termos de Uso
                  </button>
                  {' '}e{' '}
                  <button 
                    onClick={() => setShowPrivacy(true)} 
                    className="text-light-secondary hover:text-light-primary underline underline-offset-2 transition-colors cursor-pointer bg-transparent border-none p-0 font-medium"
                    type="button"
                  >
                    Política de Privacidade
                  </button>
                  .
                </p>
              </div>
              
              <div className="flex flex-col gap-2 sm:gap-3 w-full md:w-auto md:flex-row md:min-w-fit">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="border-white/20 text-light-muted hover:bg-white/5 hover:text-light-primary hover:border-white/30 transition-all duration-200 text-sm py-2 px-5 rounded-xl"
                >
                  Recusar
                </Button>
                <Button
                  onClick={handleAccept}
                  className="btn-primary text-sm py-2 px-5 rounded-xl font-semibold"
                >
                  Aceitar Cookies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terms of Use Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="bg-dark-elevated border-white/10 text-light-primary max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-light-primary text-xl font-semibold tracking-tight">Termos de Uso</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="text-light-muted text-sm leading-relaxed space-y-4">
              <div className="space-y-4">
                <p><strong className="text-light-primary">1. Aceitação dos Termos</strong></p>
                <p>Ao utilizar este site, você concorda em cumprir estes termos de uso e todas as leis aplicáveis.</p>
                
                <p><strong className="text-light-primary">2. Uso do Site</strong></p>
                <p>Este site destina-se a fornecer informações sobre procedimentos estéticos. O conteúdo é apenas informativo e não substitui consulta médica profissional.</p>
                
                <p><strong className="text-light-primary">3. Propriedade Intelectual</strong></p>
                <p>Todo o conteúdo deste site, incluindo textos, imagens e logotipos, são propriedade exclusiva e protegidos por direitos autorais.</p>
                
                <p><strong className="text-light-primary">4. Limitação de Responsabilidade</strong></p>
                <p>Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso das informações contidas neste site.</p>
                
                <p><strong className="text-light-primary">5. Alterações</strong></p>
                <p>Reservamo-nos o direito de modificar estes termos a qualquer momento.</p>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="bg-dark-elevated border-white/10 text-light-primary max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-light-primary text-xl font-semibold tracking-tight">Política de Privacidade</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="text-light-muted text-sm leading-relaxed space-y-4">
              <div className="space-y-4">
                <p><strong className="text-light-primary">1. Coleta de Informações</strong></p>
                <p>Coletamos informações fornecidas voluntariamente através de formulários de contato e cookies para melhorar sua experiência.</p>
                
                <p><strong className="text-light-primary">2. Uso das Informações</strong></p>
                <p>Utilizamos suas informações para responder às suas consultas, melhorar nossos serviços e enviar comunicações relevantes.</p>
                
                <p><strong className="text-light-primary">3. Compartilhamento de Dados</strong></p>
                <p>Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem seu consentimento.</p>
                
                <p><strong className="text-light-primary">4. Cookies</strong></p>
                <p>Utilizamos cookies para personalizar conteúdo, anúncios e analisar nosso tráfego. Você pode desabilitar cookies nas configurações do seu navegador.</p>
                
                <p><strong className="text-light-primary">5. Segurança</strong></p>
                <p>Implementamos medidas de segurança para proteger suas informações pessoais.</p>
                
                <p><strong className="text-light-primary">6. Contato</strong></p>
                <p>Para questões sobre esta política, entre em contato através dos canais disponíveis no site.</p>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};