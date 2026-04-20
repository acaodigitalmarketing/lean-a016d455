
export const createWhatsAppUrl = (data: any, trackingData: any) => {
  const baseUrl = "https://api.whatsapp.com/send";
  const phone = "5537999931841";
  
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
      origemMensagem = trackingData.origem;
    } else {
      origemMensagem = trackingData.origem;
    }
  }
  
  const finalServico = data.procedure === 'Outro' && data.customProcedure ? data.customProcedure : data.procedure;
  
  const message = `Olá! Venho do ${origemMensagem} da Lean Locação e Serviços e gostaria de solicitar um orçamento.
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Localidade: ${data.location || 'Não informada'}
Serviço: ${finalServico}`;

  const encodedMessage = encodeURIComponent(message);
  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
};
