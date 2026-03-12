
import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUserTracking } from '@/hooks/useUserTracking';
import { useDataLayer } from '@/hooks/useDataLayer';

// Critical components - loaded immediately
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';

// Lazy loaded components - below the fold
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const StatsSection = lazy(() => import('@/components/sections/StatsSection'));
const SpecialtySection = lazy(() => import('@/components/sections/SpecialtySection'));
const ClinicSection = lazy(() => import('@/components/sections/ClinicSection'));
const ProceduresSection = lazy(() => import('@/components/sections/ProceduresSection'));
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const JourneySection = lazy(() => import('@/components/sections/JourneySection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const Footer = lazy(() => import('@/components/sections/Footer'));
const WhatsAppPopup = lazy(() => import('@/components/sections/WhatsAppPopup'));
const SuccessPopup = lazy(() => import('@/components/ui/success-popup'));

// Loading fallback component - Premium dark style
const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center bg-dark-base">
    <div className="w-8 h-8 border-2 border-light-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Dynamic imports for form utilities (only loaded on interaction)
const loadFormUtils = () => Promise.all([
  import('@/utils/phoneUtils'),
  import('@/utils/whatsappUtils'),
  import('@/utils/webhookUtils'),
  import('@/data/countries'),
]);

// Cache for loaded modules
let formUtilsCache: Awaited<ReturnType<typeof loadFormUtils>> | null = null;

const getFormUtils = async () => {
  if (!formUtilsCache) {
    formUtilsCache = await loadFormUtils();
  }
  return formUtilsCache;
};

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  country: 'Brasil',
  countryCode: '+55',
  city: '',
  location: '',
  procedure: '',
  customProcedure: '',
  message: ''
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [formData, setFormData] = useState({...initialFormState});
  const [whatsAppFormData, setWhatsAppFormData] = useState({...initialFormState});
  const { toast } = useToast();
  const trackingData = useUserTracking();
  const dataLayer = useDataLayer();

  // Track form field interactions
  const [hasStartedMainForm, setHasStartedMainForm] = useState(false);
  const [hasStartedWhatsAppForm, setHasStartedWhatsAppForm] = useState(false);

  // Preload form utils when user starts interacting with forms
  const preloadFormUtils = useCallback(() => {
    getFormUtils();
  }, []);

  // Countdown effect for success popup
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSuccessPopupOpen && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isSuccessPopupOpen, countdown]);

  // Handler para mudança no telefone do formulário principal
  const handlePhoneChange = useCallback(async (value: string) => {
    const [phoneUtils] = await getFormUtils();
    const maskedValue = phoneUtils.applyPhoneMask(value);
    setFormData(prev => ({...prev, phone: maskedValue}));
    
    if (!hasStartedMainForm && value.length > 0) {
      setHasStartedMainForm(true);
      dataLayer.trackFormStart('principal');
    }
  }, [hasStartedMainForm, dataLayer]);

  // Handler para mudança no telefone do formulário WhatsApp
  const handleWhatsAppPhoneChange = useCallback(async (value: string) => {
    const [phoneUtils] = await getFormUtils();
    const maskedValue = phoneUtils.applyPhoneMask(value);
    setWhatsAppFormData(prev => ({...prev, phone: maskedValue}));
    
    if (!hasStartedWhatsAppForm && value.length > 0) {
      setHasStartedWhatsAppForm(true);
      dataLayer.trackFormStart('whatsapp');
    }
  }, [hasStartedWhatsAppForm, dataLayer]);

  const handleCountryChange = useCallback(async (countryName: string, formType: 'main' | 'whatsapp') => {
    const [,, , countriesModule] = await getFormUtils();
    const selectedCountry = countriesModule.countries.find((country: any) => country.name === countryName);
    const countryCode = selectedCountry ? selectedCountry.code : '';
    
    if (formType === 'main') {
      setFormData(prev => ({...prev, country: countryName, countryCode: countryCode}));
      if (!hasStartedMainForm) {
        setHasStartedMainForm(true);
        dataLayer.trackFormStart('principal');
      }
    } else {
      setWhatsAppFormData(prev => ({...prev, country: countryName, countryCode: countryCode}));
      if (!hasStartedWhatsAppForm) {
        setHasStartedWhatsAppForm(true);
        dataLayer.trackFormStart('whatsapp');
      }
    }
  }, [hasStartedMainForm, hasStartedWhatsAppForm, dataLayer]);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!formData.name?.trim()) {
      dataLayer.trackFormError('principal', "Por favor, preencha seu nome.");
      toast({ title: "Nome obrigatório", description: "Por favor, preencha seu nome.", variant: "destructive" });
      return;
    }

    if (!formData.email?.trim()) {
      dataLayer.trackFormError('principal', "Por favor, preencha seu email.");
      toast({ title: "Email obrigatório", description: "Por favor, preencha seu email.", variant: "destructive" });
      return;
    }

    if (!formData.phone?.trim()) {
      dataLayer.trackFormError('principal', "Por favor, preencha seu telefone.");
      toast({ title: "Telefone obrigatório", description: "Por favor, preencha seu telefone.", variant: "destructive" });
      return;
    }

    if (!formData.country?.trim()) {
      dataLayer.trackFormError('principal', "Por favor, selecione seu país.");
      toast({ title: "País obrigatório", description: "Por favor, selecione seu país.", variant: "destructive" });
      return;
    }

    if (formData.procedure === 'Outro' && !formData.customProcedure?.trim()) {
      dataLayer.trackFormError('principal', "Por favor, especifique o procedimento.");
      toast({ title: "Procedimento obrigatório", description: "Por favor, especifique o procedimento desejado.", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dataLayer.trackFormError('principal', "Por favor, insira um email válido.");
      toast({ title: "Email inválido", description: "Por favor, insira um email válido.", variant: "destructive" });
      return;
    }
    
    dataLayer.trackFormSubmit('principal', formData);
    
    const [phoneUtils, whatsappUtils, webhookUtils] = await getFormUtils();
    
    const formDataToSend = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: phoneUtils.extractPhoneNumbers(formData.phone),
      country: formData.country || '',
      countryCode: formData.countryCode || '',
      city: formData.city || '',
      location: formData.location || '',
      procedure: formData.procedure || '',
      customProcedure: formData.procedure === 'Outro' ? (formData.customProcedure || '') : '',
      message: formData.message || '',
      origem: trackingData.origem || 'direto',
      midia: trackingData.midia || 'direto',
      url: trackingData.url || window.location.href,
      formulario: 'principal'
    };

    const webhookResult = await webhookUtils.sendToWebhook(formDataToSend);
    
    if (webhookResult.success) {
      dataLayer.trackLeadGenerated(formDataToSend);
    }
    
    const url = whatsappUtils.createWhatsAppUrl(formData, trackingData);
    dataLayer.trackWhatsAppRedirect(formData.procedure === 'Outro' ? formData.customProcedure : formData.procedure);
    
    setWhatsappUrl(url);
    setCountdown(3);
    setIsSuccessPopupOpen(true);
    
    setFormData({...initialFormState});
    setHasStartedMainForm(false);
  }, [formData, trackingData, dataLayer, toast]);

  const handleWhatsAppFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!whatsAppFormData.name?.trim()) {
      dataLayer.trackFormError('whatsapp', "Por favor, preencha seu nome.");
      toast({ title: "Nome obrigatório", description: "Por favor, preencha seu nome.", variant: "destructive" });
      return;
    }

    if (!whatsAppFormData.phone?.trim()) {
      dataLayer.trackFormError('whatsapp', "Por favor, preencha seu telefone.");
      toast({ title: "Telefone obrigatório", description: "Por favor, preencha seu telefone.", variant: "destructive" });
      return;
    }

    if (!whatsAppFormData.procedure?.trim()) {
      dataLayer.trackFormError('whatsapp', "Por favor, selecione o equipamento ou serviço.");
      toast({ title: "Seleção obrigatória", description: "Por favor, selecione o equipamento ou serviço desejado.", variant: "destructive" });
      return;
    }

    if (whatsAppFormData.procedure?.startsWith('Outro') && !whatsAppFormData.customProcedure?.trim()) {
      dataLayer.trackFormError('whatsapp', "Por favor, especifique o equipamento ou serviço.");
      toast({ title: "Especificação obrigatória", description: "Por favor, descreva o equipamento ou serviço desejado.", variant: "destructive" });
      return;
    }

    if (!whatsAppFormData.city?.trim()) {
      dataLayer.trackFormError('whatsapp', "Por favor, informe o local da obra.");
      toast({ title: "Local obrigatório", description: "Por favor, informe o local da obra.", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (whatsAppFormData.email?.trim() && !emailRegex.test(whatsAppFormData.email)) {
      dataLayer.trackFormError('whatsapp', "Por favor, insira um email válido.");
      toast({ title: "Email inválido", description: "Por favor, insira um email válido.", variant: "destructive" });
      return;
    }
    
    dataLayer.trackFormSubmit('whatsapp', whatsAppFormData);
    
    const [phoneUtils, whatsappUtils, webhookUtils] = await getFormUtils();
    
    const formDataToSend = {
      name: whatsAppFormData.name.trim(),
      email: whatsAppFormData.email.trim(),
      phone: phoneUtils.extractPhoneNumbers(whatsAppFormData.phone),
      country: whatsAppFormData.country || '',
      countryCode: whatsAppFormData.countryCode || '',
      city: whatsAppFormData.city || '',
      location: whatsAppFormData.location || '',
      procedure: whatsAppFormData.procedure || '',
      customProcedure: whatsAppFormData.procedure === 'Outro' ? (whatsAppFormData.customProcedure || '') : '',
      message: whatsAppFormData.message || '',
      origem: trackingData.origem || 'direto',
      midia: trackingData.midia || 'direto',
      url: trackingData.url || window.location.href,
      formulario: 'whatsapp'
    };

    const webhookResult = await webhookUtils.sendToWebhook(formDataToSend);
    
    if (webhookResult.success) {
      dataLayer.trackLeadGenerated(formDataToSend);
    }
    
    const url = whatsappUtils.createWhatsAppUrl(whatsAppFormData, trackingData);
    dataLayer.trackWhatsAppRedirect(whatsAppFormData.procedure === 'Outro' ? whatsAppFormData.customProcedure : whatsAppFormData.procedure);
    
    setWhatsappUrl(url);
    setCountdown(3);
    setIsSuccessPopupOpen(true);
    setIsWhatsAppOpen(false);
    
    setWhatsAppFormData({...initialFormState});
    setHasStartedWhatsAppForm(false);
  }, [whatsAppFormData, trackingData, dataLayer, toast]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: sectionId === 'agendamento-form' ? 'center' : 'start' });
      dataLayer.trackNavigationClick(sectionId);
      setTimeout(() => {
        dataLayer.trackScrollToSection(sectionId);
      }, 1000);
    }
    setIsMenuOpen(false);
  }, [dataLayer]);

  const handleWhatsAppOpen = useCallback(() => {
    setIsWhatsAppOpen(true);
    dataLayer.trackWhatsAppOpen();
    preloadFormUtils();
  }, [dataLayer, preloadFormUtils]);

  // Abre o popup pelo custom event (usado pelos botões das seções)
  useEffect(() => {
    const handler = (e: Event) => {
      const procedure = (e as CustomEvent).detail?.procedure;
      if (procedure) {
        setWhatsAppFormData(prev => ({ ...prev, procedure }));
      }
      handleWhatsAppOpen();
    };
    window.addEventListener('open-whatsapp-form', handler);
    return () => window.removeEventListener('open-whatsapp-form', handler);
  }, [handleWhatsAppOpen]);

  const handleMainFormFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    
    if (!hasStartedMainForm && value.length > 0) {
      setHasStartedMainForm(true);
      dataLayer.trackFormStart('principal');
    }
  }, [hasStartedMainForm, dataLayer]);

  const handleWhatsAppFormFieldChange = useCallback((field: string, value: string) => {
    setWhatsAppFormData(prev => ({...prev, [field]: value}));
    
    if (!hasStartedWhatsAppForm && value.length > 0) {
      setHasStartedWhatsAppForm(true);
      dataLayer.trackFormStart('whatsapp');
    }
  }, [hasStartedWhatsAppForm, dataLayer]);

  const handleSuccessRedirect = useCallback(() => {
    if (whatsappUrl) {
      window.location.href = whatsappUrl;
    }
    setIsSuccessPopupOpen(false);
  }, [whatsappUrl]);

  const handleSuccessClose = useCallback(() => {
    setIsSuccessPopupOpen(false);
    setCountdown(3);
  }, []);

  return (
    <div className="min-h-screen bg-dark-base">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />
      
      <HeroSection scrollToSection={scrollToSection} />

      <main>
      
      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ProceduresSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SpecialtySection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ClinicSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <JourneySection />
      </Suspense>
      
      {/* <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense> */}
      
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <WhatsAppPopup 
          isWhatsAppOpen={isWhatsAppOpen}
          setIsWhatsAppOpen={setIsWhatsAppOpen}
          whatsAppFormData={whatsAppFormData}
          setWhatsAppFormData={setWhatsAppFormData}
          handleWhatsAppFormSubmit={handleWhatsAppFormSubmit}
          handleWhatsAppPhoneChange={handleWhatsAppPhoneChange}
          handleCountryChange={handleCountryChange}
          handleWhatsAppFormFieldChange={handleWhatsAppFormFieldChange}
          handleWhatsAppOpen={handleWhatsAppOpen}
          hasStartedWhatsAppForm={hasStartedWhatsAppForm}
        />
      </Suspense>

      <Suspense fallback={null}>
        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={handleSuccessClose}
          onRedirect={handleSuccessRedirect}
          countdown={countdown}
        />
      </Suspense>
    </div>
  );
};

export default Index;
