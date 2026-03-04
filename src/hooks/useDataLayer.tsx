
import { useEffect } from 'react';
import { useUserTracking } from './useUserTracking';

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// dataLayer is initialized in index.html before any script runs

interface BaseEvent {
  event: string;
  event_category: string;
  event_action: string;
  timestamp: string;
  page_url: string;
  user_id?: string;
  session_id?: string;
}

interface PageViewEvent extends BaseEvent {
  page_title: string;
  page_location: string;
  traffic_source: string;
  traffic_medium: string;
  traffic_campaign?: string;
}

interface FormEvent extends BaseEvent {
  form_type: 'principal' | 'whatsapp';
  form_name: string;
  procedure?: string;
  user_country?: string;
  user_city?: string;
  lead_score?: number;
}

interface EngagementEvent extends BaseEvent {
  element_name: string;
  element_type: string;
  section?: string;
}

interface ConversionEvent extends BaseEvent {
  conversion_type: 'lead' | 'consultation_request';
  conversion_value: number;
  procedure_type?: string;
}

export const useDataLayer = () => {
  const trackingData = useUserTracking();

  const pushToDataLayer = (eventData: any) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      const enrichedData = {
        ...eventData,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        traffic_source: trackingData.origem || 'direct',
        traffic_medium: trackingData.midia || 'none',
        user_agent: navigator.userAgent,
      };
      
      
      window.dataLayer.push(enrichedData);
    }
  };

  const trackPageView = (pageTitle: string = document.title) => {
    const event: PageViewEvent = {
      event: 'page_view',
      event_category: 'engagement',
      event_action: 'page_view',
      page_title: pageTitle,
      page_location: window.location.href,
      traffic_source: trackingData.origem || 'direct',
      traffic_medium: trackingData.midia || 'none',
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackFormStart = (formType: 'principal' | 'whatsapp') => {
    const event: FormEvent = {
      event: 'form_start',
      event_category: 'engagement',
      event_action: 'form_interaction',
      form_type: formType,
      form_name: formType === 'principal' ? 'Agendamento Principal' : 'WhatsApp Contact',
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackFormSubmit = (formType: 'principal' | 'whatsapp', formData: any) => {
    const event: FormEvent = {
      event: 'form_submit',
      event_category: 'conversion',
      event_action: 'form_submission',
      form_type: formType,
      form_name: formType === 'principal' ? 'Agendamento Principal' : 'WhatsApp Contact',
      procedure: formData.procedure === 'Outro' ? formData.customProcedure : formData.procedure,
      user_country: formData.country,
      user_city: formData.city,
      lead_score: 10,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackFormError = (formType: 'principal' | 'whatsapp', errorMessage: string) => {
    const event: FormEvent = {
      event: 'form_validation_error',
      event_category: 'error',
      event_action: 'form_error',
      form_type: formType,
      form_name: formType === 'principal' ? 'Agendamento Principal' : 'WhatsApp Contact',
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer({ ...event, error_message: errorMessage });
  };

  const trackWhatsAppOpen = () => {
    const event: EngagementEvent = {
      event: 'whatsapp_open',
      event_category: 'engagement',
      event_action: 'popup_open',
      element_name: 'WhatsApp Popup',
      element_type: 'popup',
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackWhatsAppRedirect = (procedure?: string) => {
    const event: ConversionEvent = {
      event: 'whatsapp_redirect',
      event_category: 'conversion',
      event_action: 'external_redirect',
      conversion_type: 'consultation_request',
      conversion_value: 1,
      procedure_type: procedure,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackNavigationClick = (sectionName: string) => {
    const event: EngagementEvent = {
      event: 'navigation_click',
      event_category: 'engagement',
      event_action: 'navigation',
      element_name: sectionName,
      element_type: 'navigation_link',
      section: sectionName.toLowerCase(),
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackScrollToSection = (sectionName: string) => {
    const event: EngagementEvent = {
      event: 'scroll_to_section',
      event_category: 'engagement',
      event_action: 'scroll',
      element_name: sectionName,
      element_type: 'section',
      section: sectionName.toLowerCase(),
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer(event);
  };

  const trackLeadGenerated = (leadData: any) => {
    const event: ConversionEvent = {
      event: 'lead_generated',
      event_category: 'conversion',
      event_action: 'lead_capture',
      conversion_type: 'lead',
      conversion_value: 50,
      procedure_type: leadData.procedure === 'Outro' ? leadData.customProcedure : leadData.procedure,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    };
    pushToDataLayer({ ...event, lead_data: leadData });
  };

  // Initialize page view tracking
  useEffect(() => {
    trackPageView();
  }, []);

  return {
    pushToDataLayer,
    trackPageView,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackWhatsAppOpen,
    trackWhatsAppRedirect,
    trackNavigationClick,
    trackScrollToSection,
    trackLeadGenerated,
  };
};
