const WEBHOOK_URL = 'https://web.srv572641.hstgr.cloud/webhook/leads-lean-transportes';

export type WebhookResult = {
  success: boolean;
  status?: number;
  statusText?: string;
  body?: string;
  errorName?: string;
  errorMessage?: string;
  diagnostic?: string;
  response?: Response;
  error?: unknown;
};

export const sendToWebhook = async (formDataToSend: any, timeoutMs = 15000): Promise<WebhookResult> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = performance.now();

  console.info('[webhook] POST →', WEBHOOK_URL, formDataToSend);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataToSend),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const elapsed = Math.round(performance.now() - startedAt);
    let body = '';
    try { body = await response.clone().text(); } catch { /* ignore */ }

    if (response.ok) {
      console.info(`[webhook] ✓ ${response.status} em ${elapsed}ms`, body);
      return { success: true, status: response.status, statusText: response.statusText, body, response };
    }

    const diagnostic = `HTTP ${response.status} ${response.statusText || ''}`.trim();
    console.error(`[webhook] ✗ ${diagnostic} em ${elapsed}ms`, body);
    return { success: false, status: response.status, statusText: response.statusText, body, diagnostic, response };
  } catch (error: any) {
    clearTimeout(timeoutId);
    const elapsed = Math.round(performance.now() - startedAt);
    const errorName = error?.name || 'Error';
    const errorMessage = error?.message || String(error);
    let diagnostic = `${errorName}: ${errorMessage}`;
    if (errorName === 'AbortError') diagnostic = `Timeout após ${timeoutMs}ms (sem resposta do servidor)`;
    else if (errorMessage === 'Failed to fetch') diagnostic = 'Falha de rede / CORS / bloqueio (Failed to fetch)';
    console.error(`[webhook] ✗ ${diagnostic} em ${elapsed}ms`, error);
    return { success: false, errorName, errorMessage, diagnostic, error };
  }
};
