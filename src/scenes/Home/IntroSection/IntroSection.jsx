import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContactMe from './ContactMe';
import Tilt from 'react-parallax-tilt';
import avatar from '../../../assets/me.png';
import s from './IntroSection.module.scss';

const IntroSection = () => {
  return (
    <section className={s.content}>
      <div className={s.introduction}>
        <div className={s.textAndImage}>
          <div className={s.introductionText}>
            <h1 className={s.title}>
              Welcome to My <span className={s.purple}>Portfolio</span>
            </h1>
            <div className={s.description}>
              <p>
                I'm a passionate <b>software developer</b> specializing in <br />
                information systems development.
              </p>
              <p>
                My journey began with{' '}
                <i>
                  <b className={s.purple}>CS50x</b>
                </i>
                , a course offered by Harvard University.
                <br />
                which inspired me to pursue a degree in IT at ISET
                <br />
                Currently, I'm furthering my knowledge through a master's degree at ISIMA in France.
              </p>
              <p>
                My field of interest is building
                <i>
                  <b className={s.purple}> systems </b>
                </i>
                to tackle real world challenges.
              </p>
            </div>
          </div>
          <div className={s.avatarContainer}>
            <Tilt>
              <LazyLoadImage alt="avatar" effect="blur" src={avatar} />
            </Tilt>
          </div>
        </div>

      </div>

      <div className={s.introSocial}>
        <h1>Get In Touch</h1>
        <p>
          Don't hesitate to <span className={s.purple}>reach out</span> to me
        </p>

        <ul className={s.socialLinks}>
          <li className={s.socialLink}>
            <a
              href="https://www.linkedin.com/in/zaanouni-ayoub/"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="linkedin"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li className={s.socialLink}>
            <a
              href="https://github.com/Ayoubzaanouni"
              target="_blank"
              rel="noreferrer"
              className={s.socialIcon}
              aria-label="github"
            >
              <AiFillGithub />
            </a>
          </li>
        </ul>
        <ContactMe />

      </div>
    </section>
  );
};

export default IntroSection;
