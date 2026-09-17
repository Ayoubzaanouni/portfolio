import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContactMe from './ContactMe';
import Tilt from 'react-parallax-tilt';
import avatar from '../../../assets/me.png';
import { getProfile } from '../../../api/content';
import { useAsync } from '../../../hooks/useAsync';
import { RichText } from '../../../utils/richText';
import s from './IntroSection.module.scss';

const IntroSection = () => {
  const { data: profile } = useAsync(getProfile);

  return (
    <section className={s.content}>
      <div className={s.introduction}>
        <div className={s.textAndImage}>
          <div className={s.introductionText}>
            <h1 className={s.title}>
              Welcome to My <span className={s.purple}>Portfolio</span>
            </h1>
            <div className={s.description}>
              {profile?.intro_paragraphs.map((text, i) => (
                <p key={i}>
                  <RichText
                    text={text}
                    highlightClassName={s.purple}
                  />
                </p>
              ))}
            </div>
          </div>
          <div className={s.avatarContainer}>
            <Tilt>
              {profile && (
                <LazyLoadImage
                  alt="avatar"
                  effect="blur"
                  src={profile.avatar_url || avatar}
                />
              )}
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
              href={profile?.linkedin_url}
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
              href={profile?.github_url}
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
