// Astro server API route: verifies the reCAPTCHA token server-side (the
// client can only prove a token exists, never that it's valid) and, only if
// that passes, sends the email itself via EmailJS's REST API using a
// private key. This is deliberately NOT split into "verify" + "let the
// client call EmailJS" — if the client could still call EmailJS on its own,
// the verification step would be decorative.

export const prerender = false;

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const RECAPTCHA_VERIFY_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function POST({ request }) {
  const { name, email, subject, message, recaptchaToken } = await request
    .json()
    .catch(() => ({}));

  if (
    !name ||
    !email ||
    !subject ||
    !message ||
    typeof recaptchaToken !== 'string' ||
    !recaptchaToken
  ) {
    return json({ error: 'Missing required fields' }, 400);
  }

  if (!emailRegex.test(email)) {
    return json({ error: 'Invalid email address' }, 400);
  }

  const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
  const serviceId = import.meta.env.EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.EMAILJS_TEMPLATE_ID;
  const privateKey = import.meta.env.EMAILJS_PRIVATE_KEY;

  if (!secretKey || !serviceId || !templateId || !privateKey) {
    console.error('contact: missing server env vars');
    return json({ error: 'Server not configured' }, 500);
  }

  const verifyResponse = await fetch(RECAPTCHA_VERIFY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: secretKey, response: recaptchaToken }),
  });
  const verification = await verifyResponse.json();

  if (!verification.success) {
    return json({ error: 'reCAPTCHA verification failed' }, 400);
  }

  const emailResponse = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: privateKey,
      accessToken: privateKey,
      template_params: {
        from_name: name,
        from_email: email,
        subject,
        message,
      },
    }),
  });

  if (!emailResponse.ok) {
    const text = await emailResponse.text();
    console.error('contact: EmailJS send failed', emailResponse.status, text);
    return json({ error: 'Failed to send email' }, 502);
  }

  return json({ ok: true });
}
