
export const createWhatsAppUrl = (data: any, trackingData: any) => {
  const baseUrl = "https://api.whatsapp.com/send";
  const phone = "5537999931841";
  
  // Sempre referir como "site" na mensagem do WhatsApp (origem real é registrada no webhook)
  const origemMensagem = 'site';
  
  const finalServico = data.procedure === 'Outro' && data.customProcedure ? data.customProcedure : data.procedure;
  
  const message = `Olá! Venho do ${origemMensagem} da Lean Locação e Serviços e gostaria de solicitar um orçamento.
Nome: ${data.name}
Telefone: ${data.phone}
Localidade: ${data.city || data.location || 'Não informada'}
Serviço: ${finalServico}`;

  const encodedMessage = encodeURIComponent(message);
  return `${baseUrl}?phone=${phone}&text=${encodedMessage}`;
};
