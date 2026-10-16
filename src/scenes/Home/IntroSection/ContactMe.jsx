import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import s from './IntroSection.module.scss';

export default function ContactMe() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const showSuccess = () => Swal.fire({
    icon: 'success',
    title: 'Email successfully sent!',
    text: 'Thank you for reaching out to me.',
    confirmButtonText: 'Okay',
  });

  function sendEmail(e) {
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
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'Okay'
      });
      setLoading(false);
      return;
    }

    setLoading(true);

    emailjs
      .sendForm('service_vk9p1el', 'template_7sorgcu', form, 'gHU1oDul3m56qE1QK')
      .then(
        () => {
          setLoading(false);
          formRef.current.reset();
          showSuccess();
        },
        () => {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Failed to send email',
            text: 'There was an error while sending the email.',
            confirmButtonText: 'Try again',
          });
        }
      );
  }

  return (
    <form className={s.contactForm} ref={formRef} onSubmit={sendEmail}>
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="from_name" placeholder="Enter your name" required />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="from_email" placeholder="Enter your email" required />
      <label htmlFor="subject">Subject</label>
      <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" placeholder="Type your message" required />

      <button type="submit" disabled={loading} className='Send'>Send</button>
    </form>
  );
}
