
import { useState, useEffect } from 'react';

interface TrackingData {
  origem: string;
  midia: string;
  url: string;
}

export const useUserTracking = (): TrackingData => {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    origem: '',
    midia: '',
    url: ''
  });

  useEffect(() => {
    const captureTrackingData = () => {
      // Capturar parâmetros UTM da URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || '';
      const utmMedium = urlParams.get('utm_medium') || '';
      const gclid = urlParams.get('gclid');
      const fbclid = urlParams.get('fbclid');
      
      // Capturar referrer como URL de origem
      const referrer = document.referrer || '';
      const url = referrer;
      
      // Capturar user agent
      const userAgent = navigator.userAgent || '';
      
      // Determinar origem e mídia baseado em parâmetros especiais
      let origem = '';
      let midia = '';
      
      // Verificar parâmetros especiais primeiro
      if (gclid) {
        origem = 'google';
        midia = 'cpc';
      } else if (fbclid) {
        origem = 'instagram';
        midia = 'cpc';
      } else {
        // Usar UTM se disponível
        origem = utmSource;
        midia = utmMedium;
        
        // Se não houver UTM, usar referrer
        if (!origem && referrer) {
          try {
            const referrerDomain = new URL(referrer).hostname;
            origem = referrerDomain;
          } catch (e) {
            origem = referrer;
          }
        }
        
        // Determinar mídia baseada no referrer se não definida
        if (!midia && referrer) {
          if (referrer.includes('google')) midia = 'google';
          else if (referrer.includes('facebook')) midia = 'facebook';
          else if (referrer.includes('instagram')) midia = 'instagram';
          else if (referrer.includes('youtube')) midia = 'youtube';
          else midia = 'referral';
        }
      }
      
      // Fallback para direto se não encontrar nada
      if (!origem) origem = 'direto';
      if (!midia) midia = 'direto';
      
      setTrackingData({ origem, midia, url });
      
      
    };

    captureTrackingData();
  }, []);

  return trackingData;
};
