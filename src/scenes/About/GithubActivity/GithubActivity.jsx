import s from './GithubActivity.module.scss';
import * as GitHubCalendarModule from 'react-github-calendar';

// Defensive CJS/ESM interop unwrap: this package's default export doesn't
// always resolve cleanly through every bundler's interop (seen returning the
// whole module namespace instead of the component under Astro/Rolldown).
const GitHubCalendar = GitHubCalendarModule.default?.default ?? GitHubCalendarModule.default;

const GithubActivity = () => {
  const colorTheme = {
    background: 'transparent',
    text: '#ffffff',
    level4: '#8400b8',
    level3: '#b22ff4',
    level2: '#b265f6',
    level1: '#c084f5',
    level0: '#ecd9fc',
  };
  return (
    <div className={s.container}>
      <GitHubCalendar
        username="Ayoubzaanouni"
        blockSize={15}
        blockMargin={5}
        theme={colorTheme}
        fontSize={16}
      />
    </div>
  );
};

export default GithubActivity;
