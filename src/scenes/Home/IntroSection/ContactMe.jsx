import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import Recaptcha from '../../../components/Recaptcha/Recaptcha';
import s from './IntroSection.module.scss';

const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactMe() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();
  const formRef = useRef();

  async function sendEmail(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.from_name.value;
    const email = form.from_email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'Okay',
      });
      return;
    }

    const recaptchaToken = recaptchaRef.current.getValue();

    if (!recaptchaToken) {
      Swal.fire({
        icon: 'warning',
        title: 'reCAPTCHA not verified',
        text: 'Please verify that you are not a robot.',
        confirmButtonText: 'Okay',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, recaptchaToken }),
      });

      if (!response.ok) throw new Error('Request failed');

      formRef.current.reset();
      recaptchaRef.current.reset();
      Swal.fire({
        icon: 'success',
        title: 'Email successfully sent!',
        text: 'Thank you for reaching out to me.',
        confirmButtonText: 'Okay',
      });
    } catch {
      recaptchaRef.current.reset();
      Swal.fire({
        icon: 'error',
        title: 'Failed to send email',
        text: 'There was an error while sending the email.',
        confirmButtonText: 'Try again',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={s.contactForm} ref={formRef} onSubmit={sendEmail}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="from_name" placeholder="Enter your name" required />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="from_email" placeholder="Enter your email" required />
      <label htmlFor="subject">Subject</label>
      <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" placeholder="Type your message" required />

      <Recaptcha sitekey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
      <br />

      <button type="submit" disabled={loading} className="Send">Send</button>
    </form>
  );
}
