
export const sendToWebhook = async (formDataToSend: any, timeoutMs = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('https://web.srv572641.hstgr.cloud/webhook/landing-page-leads-fabiana-lage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return { success: response.ok, response };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Erro ao enviar para webhook:', error);
    return { success: false, error };
  }
};
