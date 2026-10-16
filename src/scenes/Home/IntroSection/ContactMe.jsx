import { useTranslation } from '../../../i18n/useTranslation';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import s from './IntroSection.module.scss';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactMe() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const showSuccess = () => Swal.fire({
    icon: 'success',
    title: t("Email successfully sent!"),
    text: t("Thank you for reaching out to me."),
    confirmButtonText: t("Okay"),
  });

  async function sendEmail(e) {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    if (form.elements.website.value) {
      form.reset();
      showSuccess();
      return;
    }

    const email = form.elements.from_email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: t("Invalid Email"),
        text: t("Please enter a valid email address."),
        confirmButtonText: t("Okay")
      });
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      form.reset();
      showSuccess();
    } catch {
      Swal.fire({
        icon: 'error',
        title: t("Failed to send email"),
        text: t("There was an error while sending the email."),
        confirmButtonText: t("Try again"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={s.contactForm} ref={formRef} onSubmit={sendEmail}>
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="name">{t('Name')}</label>
      <input type="text" id="name" name="from_name" placeholder={t('Enter your name')} required />
      <label htmlFor="email">{t('Email')}</label>
      <input type="email" id="email" name="from_email" placeholder={t('Enter your email')} required />
      <label htmlFor="subject">{t('Subject')}</label>
      <input type="text" id="subject" name="subject" placeholder={t('Enter subject')} required />
      <label htmlFor="message">{t('Message')}</label>
      <textarea id="message" name="message" placeholder={t('Type your message')} required />

      <button type="submit" disabled={loading} className="Send">
        {loading ? t('Sending…') : t('Send')}
      </button>
    </form>
  );
}
