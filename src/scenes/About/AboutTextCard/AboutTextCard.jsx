import { RichText } from '../../../utils/richText';
import s from './AboutTextCard.module.scss';

const AboutTextCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className={s.card}>
      <p style={{ textAlign: 'justify' }}>
        {profile.about_paragraphs.map((text, i) => (
          <span key={i}>
            {i > 0 && (
              <>
                <br />
                <br />
              </>
            )}
            <RichText text={text} highlightClassName={s.purple} />
          </span>
        ))}
      </p>

      <ul style={{ marginLeft: 14 }}>
        {profile.hobbies.map((hobby, i) => (
          <li key={i} className={s.aboutActivity}>
            - {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutTextCard;
