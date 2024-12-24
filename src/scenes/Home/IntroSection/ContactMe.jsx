import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import ReCAPTCHA from 'react-google-recaptcha';
import s from './IntroSection.module.scss';

export default function ContactMe() {
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    const emailStatus = sessionStorage.getItem('emailStatus');
    
    if (emailStatus) {
      if (emailStatus === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Email successfully sent!',
          text: 'Thank you for reaching out to me.',
          confirmButtonText: 'Okay'
        });
      } else if (emailStatus === 'error') {
        Swal.fire({
          icon: 'error',
          title: 'Failed to send email',
          text: 'There was an error while sending the email.',
          confirmButtonText: 'Try again'
        });
      }
      sessionStorage.removeItem('emailStatus');
    }
  }, []);

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
      .sendForm('service_vk9p1el', 'template_7sorgcu', e.target, 'gHU1oDul3m56qE1QK')
      .then(
        (result) => {
          setLoading(false);
          sessionStorage.setItem('emailStatus', 'success');
          window.location.reload();
        },
        (error) => {
          setLoading(false);
          sessionStorage.setItem('emailStatus', 'error');
          window.location.reload();
        }
      );
  }

  return (
    <form className={s.contactForm} onSubmit={sendEmail}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="from_name" placeholder="Enter your name" required />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="from_email" placeholder="Enter your email" required />
      <label htmlFor="subject">Subject</label>
      <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" placeholder="Type your message" required />

      <ReCAPTCHA
        sitekey="6Le04qQqAAAAAEkpS8pmHbKRVPIOal5T49qmUK4G"
        ref={recaptchaRef}
      />
      <br />

      <button type="submit" disabled={loading} className='Send'>Send</button>
    </form>
  );
}
