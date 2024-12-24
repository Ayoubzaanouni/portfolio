import Snap from '../../assets/snap.png';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import s from './About.module.scss';
import AboutTextCard from './AboutTextCard/AboutTextCard';
import GithubActivity from './GithubActivity/GithubActivity';
import TechSkills from './TechSkills/TechSkills';
import ToolsUsed from './ToolsUsed/ToolsUsed';
const About = () => {
  return (
    <BaseLayout>
      <div className={s.content}>
        <div className={s.about}>
          <div className={s.aboutDescription}>
            <h1 className={s.title}>
              Learn More <b className={s.purple}>About Me</b>
            </h1>
            <AboutTextCard />
          </div>

          <div className={s.aboutImg}>
            <img src={Snap} alt="about" />
          </div>
        </div>

        <h2 className={s.skills}>
          Professional <b className={s.purple}>Skillset</b>
        </h2>
        <TechSkills />

        <h2 className={s.skills}>
          <b className={s.purple}>Tools</b> I Use
        </h2>

      <ToolsUsed />

        <a href='https://github.com/Ayoubzaanouni'>
          <h2 className={s.githubActivity}>
            My <b className={s.purple}>Coding</b> Journey
          </h2>
        
          <GithubActivity />
        </a>
      </div>
    </BaseLayout>
  );
};

export default About;
