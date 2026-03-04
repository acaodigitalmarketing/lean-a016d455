
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { countries } from '@/data/countries';
import { procedureGroups } from '@/data/procedures';

import { useUserTracking } from '@/hooks/useUserTracking';
import { useDataLayer } from '@/hooks/useDataLayer';
import { useIsMobile } from '@/hooks/use-mobile';

interface WhatsAppPopupProps {
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;
  whatsAppFormData: any;
  setWhatsAppFormData: (data: any) => void;
  handleWhatsAppFormSubmit: (e: React.FormEvent) => void;
  handleWhatsAppPhoneChange: (value: string) => void;
  handleCountryChange: (countryName: string, formType: 'main' | 'whatsapp') => void;
  handleWhatsAppFormFieldChange: (field: string, value: string) => void;
  handleWhatsAppOpen: () => void;
  hasStartedWhatsAppForm: boolean;
}

const WhatsAppIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059s-.018-.458.13-.606c.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({
  isWhatsAppOpen,
  setIsWhatsAppOpen,
  whatsAppFormData,
  setWhatsAppFormData,
  handleWhatsAppFormSubmit,
  handleWhatsAppPhoneChange,
  handleCountryChange,
  handleWhatsAppFormFieldChange,
  handleWhatsAppOpen,
  hasStartedWhatsAppForm
}) => {
  const trackingData = useUserTracking();
  const dataLayer = useDataLayer();
  const isMobile = useIsMobile();

  return (
    <Sheet open={isWhatsAppOpen} onOpenChange={setIsWhatsAppOpen}>
      <SheetTrigger asChild>
        <button 
          onClick={handleWhatsAppOpen}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 btn-gold rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition-all z-50"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
          aria-label="Abrir formulário de contato via WhatsApp"
        >
          <WhatsAppIcon />
        </button>
      </SheetTrigger>
      <SheetContent 
        side={isMobile ? "center" : "bottom-right"}
        hideOverlay={!isMobile}
        className={`border-gray-200 p-3 sm:p-4 flex flex-col bg-white ${
          isMobile 
            ? 'w-[calc(100vw-2rem)] max-w-md' 
            : 'w-full max-w-[calc(100vw-2rem)] sm:max-w-md'
        }`}
        style={{ height: 'auto', maxHeight: isMobile ? '90vh' : '85vh' }}
      >
        <SheetHeader className="flex-shrink-0 pb-2">
          <SheetTitle className="text-gray-900 text-lg sm:text-xl font-semibold">
            Fale Conosco pelo WhatsApp
          </SheetTitle>
          <SheetDescription className="text-gray-600 text-xs sm:text-sm">
            Preencha o formulário e nossa equipe entrará em contato via WhatsApp.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto pr-1">
          <form onSubmit={handleWhatsAppFormSubmit} className="space-y-3 sm:space-y-4">
            {/* Campos ocultos para tracking */}
            <input type="hidden" name="origem" value={trackingData.origem} />
            <input type="hidden" name="midia" value={trackingData.midia} />
            <input type="hidden" name="url" value={trackingData.url} />
            <input type="hidden" name="countryCode" value={whatsAppFormData.countryCode} />
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <Input
                type="text"
                required
                value={whatsAppFormData.name}
                onChange={(e) => handleWhatsAppFormFieldChange('name', e.target.value)}
                className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                E-mail *
              </label>
              <Input
                type="email"
                required
                value={whatsAppFormData.email}
                onChange={(e) => handleWhatsAppFormFieldChange('email', e.target.value)}
                className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                País *
              </label>
              <Select value={whatsAppFormData.country || "Brasil"} onValueChange={(value) => handleCountryChange(value, 'whatsapp')}>
                <SelectTrigger className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900" aria-label="Selecionar país">
                  <SelectValue placeholder="Brasil" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 max-h-40">
                  {countries.map((country, index) => (
                    <SelectItem key={index} value={country.name} className="text-gray-900 hover:!text-gray-900 hover:!bg-gray-100 focus:!text-gray-900 focus:!bg-gray-100 data-[highlighted]:!bg-gray-100 data-[highlighted]:!text-gray-900 cursor-pointer">
                      {country.name} {country.code && `(${country.code})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Telefone/WhatsApp *
              </label>
              <Input
                type="tel"
                required
                value={whatsAppFormData.phone}
                onChange={(e) => handleWhatsAppPhoneChange(e.target.value)}
                className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                placeholder="(XX) XXXXX-XXXX"
                maxLength={15}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Procedimento de Interesse *
              </label>
              <Select 
                value={whatsAppFormData.procedure} 
                onValueChange={(value) => {
                  setWhatsAppFormData({...whatsAppFormData, procedure: value, customProcedure: value === 'Outro' ? whatsAppFormData.customProcedure : ''});
                  if (!hasStartedWhatsAppForm) {
                    dataLayer.trackFormStart('whatsapp');
                  }
                }}
              >
              <SelectTrigger className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900" aria-label="Selecionar procedimento de interesse">
                  <SelectValue placeholder="Selecione um procedimento" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 max-h-72 z-[60]">
                  {procedureGroups.map((group) => (
                    <SelectGroup key={group.label}>
                      <SelectLabel className="text-gray-600 text-xs uppercase tracking-wider px-3 py-2 font-semibold">{group.label}</SelectLabel>
                      {group.options.map((procedure, index) => (
                        <SelectItem key={index} value={procedure} className="text-gray-900 hover:!text-gray-900 hover:!bg-gray-100 focus:!text-gray-900 focus:!bg-gray-100 data-[highlighted]:!bg-gray-100 data-[highlighted]:!text-gray-900 cursor-pointer pl-6">
                          {procedure}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo condicional para procedimento personalizado no WhatsApp */}
            {whatsAppFormData.procedure === 'Outro' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Especifique o Procedimento *
                </label>
                <Input
                  type="text"
                  required
                  value={whatsAppFormData.customProcedure}
                  onChange={(e) => handleWhatsAppFormFieldChange('customProcedure', e.target.value)}
                  className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                  placeholder="Digite o nome do procedimento desejado"
                />
              </div>
            )}

            <div className="pt-2 pb-1 flex-shrink-0">
              <Button 
                type="submit" 
                className="w-full btn-pill bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold min-h-[48px] h-12 text-base flex items-center justify-center gap-2"
              >
                <WhatsAppIcon />
                Enviar via WhatsApp
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WhatsAppPopup;
