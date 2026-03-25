
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { rentalGroups, serviceGroups } from '@/data/procedures';
import { cities } from '@/data/cities';

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

type Tab = 'rental' | 'service';

// Autocomplete de cidade
const CityAutocomplete: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    onChange(q);
    if (q.length >= 2) {
      const normalized = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const filtered = cities
        .filter(c => c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(normalized))
        .slice(0, 8);
      setSuggestions(filtered);
      setOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    onChange(city);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        type="text"
        value={query}
        onChange={handleInput}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
        placeholder="Ex: Divinópolis, MG"
        autoComplete="off"
      />
      {open && (
        <ul className="absolute z-[70] left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-52 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city}
              onMouseDown={() => handleSelect(city)}
              className="px-4 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState<Tab>('rental');

  // Auto-switch tab when popup opens based on preferredTab or procedure value
  useEffect(() => {
    if (!isWhatsAppOpen) return;
    const preferred = (whatsAppFormData as any).preferredTab as Tab | undefined;
    if (preferred) { setActiveTab(preferred); return; }
    if (whatsAppFormData.procedure) {
      const inService = serviceGroups.some(g => g.options.includes(whatsAppFormData.procedure));
      const inRental = rentalGroups.some(g => g.options.includes(whatsAppFormData.procedure));
      if (inService) setActiveTab('service');
      else if (inRental) setActiveTab('rental');
    }
  }, [isWhatsAppOpen, whatsAppFormData.procedure]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setWhatsAppFormData({ ...whatsAppFormData, procedure: '', customProcedure: '' });
  };

  const currentGroups = activeTab === 'rental' ? rentalGroups : serviceGroups;
  const selectPlaceholder = activeTab === 'rental' ? 'Selecione o equipamento...' : 'Selecione o serviço...';
  const selectLabel = activeTab === 'rental' ? 'Equipamento Desejado *' : 'Serviço Desejado *';
  const customLabel = activeTab === 'rental' ? 'Especifique o equipamento *' : 'Especifique o serviço *';
  const customPlaceholder = activeTab === 'rental' ? 'Descreva o equipamento necessário' : 'Descreva o serviço desejado';

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

        {/* Abas */}
        <div className="flex-shrink-0 flex rounded-lg overflow-hidden mb-3 border border-gray-200">
          <button
            type="button"
            onClick={() => handleTabChange('rental')}
            className="flex-1 py-2.5 text-xs font-bold tracking-wide uppercase transition-all"
            style={{
              background: activeTab === 'rental' ? '#3a6b4a' : '#f9f9f9',
              color: activeTab === 'rental' ? '#ffffff' : '#555555',
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.06em',
            }}
          >
            Aluguel de Equipamentos
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('service')}
            className="flex-1 py-2.5 text-xs font-bold tracking-wide uppercase transition-all border-l border-gray-200"
            style={{
              background: activeTab === 'service' ? '#3a6b4a' : '#f9f9f9',
              color: activeTab === 'service' ? '#ffffff' : '#555555',
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.06em',
            }}
          >
            Prestação de Serviço
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1">
          <form onSubmit={handleWhatsAppFormSubmit} className="space-y-3 sm:space-y-4">
            <input type="hidden" name="origem" value={trackingData.origem} />
            <input type="hidden" name="midia" value={trackingData.midia} />
            <input type="hidden" name="url" value={trackingData.url} />
            <input type="hidden" name="formularioTipo" value={activeTab} />

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
                {selectLabel}
              </label>
              <Select
                value={whatsAppFormData.procedure}
                onValueChange={(value) => {
                  setWhatsAppFormData({ ...whatsAppFormData, procedure: value, customProcedure: value.startsWith('Outro') ? whatsAppFormData.customProcedure : '' });
                  if (!hasStartedWhatsAppForm) {
                    dataLayer.trackFormStart('whatsapp');
                  }
                }}
              >
                <SelectTrigger className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900" aria-label={selectLabel}>
                  <SelectValue placeholder={selectPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 max-h-72 z-[60] min-w-[min(360px,90vw)]">
                  {currentGroups.map((group) => (
                    <SelectGroup key={group.label}>
                      <SelectLabel className="text-gray-600 text-xs uppercase tracking-wider px-3 py-2 font-semibold">{group.label}</SelectLabel>
                      {group.options.map((option, index) => (
                        <SelectItem key={index} value={option} className="text-gray-900 hover:!text-gray-900 hover:!bg-gray-100 focus:!text-gray-900 focus:!bg-gray-100 data-[highlighted]:!bg-gray-100 data-[highlighted]:!text-gray-900 cursor-pointer pl-6">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {whatsAppFormData.procedure?.startsWith('Outro') && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {customLabel}
                </label>
                <Input
                  type="text"
                  required
                  value={whatsAppFormData.customProcedure}
                  onChange={(e) => handleWhatsAppFormFieldChange('customProcedure', e.target.value)}
                  className="h-11 text-base rounded-lg border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                  placeholder={customPlaceholder}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Local da Obra *
              </label>
              <CityAutocomplete
                value={whatsAppFormData.city || ''}
                onChange={(val) => handleWhatsAppFormFieldChange('city', val)}
              />
            </div>

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
