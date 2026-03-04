
export const createWhatsAppUrl = (data: any, trackingData: any) => {
  const baseUrl = "https://api.whatsapp.com/send";
  const phone = "5511997592569";
  
  // Determinar a origem para a mensagem
  let origemMensagem = 'site';
  if (trackingData.origem && trackingData.origem !== 'direto') {
    if (trackingData.origem === 'google') {
      origemMensagem = 'Google';
    } else if (trackingData.origem === 'instagram') {
      origemMensagem = 'Instagram';
    } else if (trackingData.origem === 'facebook') {
      origemMensagem = 'Facebook';
    } else if (trackingData.origem === 'youtube') {
      origemMensagem = 'YouTube';
    } else if (trackingData.origem.includes('.')) {
      // Se contém ponto, é provavelmente um domínio
      origemMensagem = trackingData.origem;
    } else {
      origemMensagem = trackingData.origem;
    }
  }
  
  // Determinar o procedimento final (customProcedure se procedure for "Outro")
  const finalProcedure = data.procedure === 'Outro' && data.customProcedure ? data.customProcedure : data.procedure;
  
  const message = `Olá! Venho do ${origemMensagem} da Dra. Fabiana Lage e gostaria de agendar uma consulta.
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
País: ${data.country}
Localidade: ${data.location || 'Não informada'}
Procedimento: ${finalProcedure}`;

  const encodedMessage = encodeURIComponent(message);
  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
};
