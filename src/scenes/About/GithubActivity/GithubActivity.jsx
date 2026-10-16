import { useTranslation } from '../../../i18n/useTranslation';
import s from './GithubActivity.module.scss';
import GitHubCalendar from 'react-github-calendar';

const GithubActivity = () => {
  const { language, t } = useTranslation();
  const labels = language === 'fr' ? {
    months: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    weekdays: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    totalCount: '{{count}} contributions sur les douze derniers mois',
    tooltip: '{{count}} contributions le {{date}}',
    legend: { less: 'Moins', more: 'Plus' },
  } : undefined;
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
    <div className={s.container} aria-label={t('GitHub contributions')}>
      <GitHubCalendar
        username="Ayoubzaanouni"
        labels={labels}
        blockSize={15}
        blockMargin={5}
        theme={colorTheme}
        fontSize={16}
      />
    </div>
  );
};

export default GithubActivity;
