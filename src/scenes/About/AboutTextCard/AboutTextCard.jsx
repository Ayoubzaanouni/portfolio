import s from './AboutTextCard.module.scss';

const AboutTextCard = () => {
  return (
    <div className={s.card}>
      <p style={{ textAlign: 'justify' }}>
        Hi Everyone, I am{' '}
        <span className={s.purple}>Ayoub Zaanouni, </span>
        <br />software engineer based in{' '}
        <span className={s.purple}> France.</span>
        <br />
        <br />
        I have a Bachelor's degree in Information Technology, specializing in Information Systems Development.
        <br />
        Currently working on my master's in Software Engineering.
        <br />
        I also hold two Harvard certificates in computer science.
        <br />
        <br />
        In my free time I enjoy:
      </p>

      <ul style={{ marginLeft: 14 }}>
        <li className={s.aboutActivity}>
          - Playing video games
        </li>
        <li className={s.aboutActivity}>
          - Camping
        </li>
        <li className={s.aboutActivity}>
          - Socializing
        </li>
      </ul>
    </div>
  );
};

export default AboutTextCard;
