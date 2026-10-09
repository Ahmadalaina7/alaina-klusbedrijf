import type { LeadInput } from '@/lib/lead-schema';

export async function deliverLead(lead: LeadInput): Promise<{ ok: true } | { ok: false; reason: 'not_configured' | 'delivery_failed' }> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return { ok: false, reason: 'not_configured' };

  let endpoint: URL;
  try {
    endpoint = new URL(webhookUrl);
  } catch {
    return { ok: false, reason: 'delivery_failed' };
  }
  if (endpoint.protocol !== 'https:' && endpoint.hostname !== 'localhost' && endpoint.hostname !== '127.0.0.1') {
    return { ok: false, reason: 'delivery_failed' };
  }

  const payload = {
    type: 'alaina_bouw.quote_request',
    receivedAt: new Date().toISOString(),
    contact: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      preferredContact: lead.preferredContact,
    },
    project: {
      jobType: lead.jobType,
      description: lead.description,
      timing: lead.timing,
      postalCode: lead.postalCode,
      city: lead.city,
      budget: lead.budget || undefined,
    },
    attribution: lead.utm,
    photo: lead.fileData ? {
      fileName: lead.fileName,
      contentType: lead.fileType,
      size: lead.fileSize,
      dataBase64: lead.fileData,
    } : undefined,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(7000),
      cache: 'no-store',
    });
    if (!response.ok) return { ok: false, reason: 'delivery_failed' };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'delivery_failed' };
  }
}
