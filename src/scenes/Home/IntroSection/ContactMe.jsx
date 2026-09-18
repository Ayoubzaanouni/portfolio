import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import s from './IntroSection.module.scss';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function ContactMe() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();
  const formRef = useRef();

  function sendEmail(e) {
    e.preventDefault();

    setLoading(true);

    const email = e.target.from_email.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'Okay'
      });
      setLoading(false);
      return;
    }

    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      Swal.fire({
        icon: 'warning',
        title: 'reCAPTCHA not verified',
        text: 'Please verify that you are not a robot.',
        confirmButtonText: 'Okay'
      });
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        e.target,
        EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          formRef.current.reset();
          recaptchaRef.current.reset();
          Swal.fire({
            icon: 'success',
            title: 'Email successfully sent!',
            text: 'Thank you for reaching out to me.',
            confirmButtonText: 'Okay',
          });
        },
        () => {
          setLoading(false);
          recaptchaRef.current.reset();
          Swal.fire({
            icon: 'error',
            title: 'Failed to send email',
            text: 'There was an error while sending the email.',
            confirmButtonText: 'Try again',
          });
        },
      );
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

      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
      <br />

      <button type="submit" disabled={loading} className='Send'>Send</button>
    </form>
  );
}
