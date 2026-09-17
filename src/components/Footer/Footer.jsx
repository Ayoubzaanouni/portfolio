import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { getProfile } from '../../api/content';
import { useAsync } from '../../hooks/useAsync';
import s from './Footer.module.scss';

const Footer = () => {
  const { data: profile } = useAsync(getProfile);

  // let date = new Date();
  // let year = date.getFullYear();

  return (
    <div className={s.footer}>
      <div className={s.container}>
        <div className={s.copyright}>
          <h1>Made by Ayoub Zaanouni</h1>
        </div>

        <div className={s.body}>
          <ul className={s.socialIcons}>
          <li>
              <a
                href={profile?.linkedin_url}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href={profile?.github_url}
                target="_blank"
                rel="noreferrer"
                aria-label="github"
              >
                <AiFillGithub />
              </a>
            </li>
      
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
