
export const createWhatsAppUrl = (data: any, trackingData: any) => {
  const baseUrl = "https://api.whatsapp.com/send";
  const phone = "5537999931841";
  
  // Determinar o serviço final (customProcedure se procedure for "Outro")
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
