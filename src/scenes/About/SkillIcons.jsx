import { getSkills } from '../../api/content';
import { useAsync } from '../../hooks/useAsync';
import { getIcon } from '../../utils/iconRegistry';

// Shared by TechSkills and ToolsUsed: renders the skills of one
// category using the caller's styles.
const SkillIcons = ({ category, s }) => {
  const { data: skills } = useAsync(getSkills);

  return (
    <ul className={s.container}>
      {(skills ?? [])
        .filter((skill) => skill.category === category)
        .map((skill) => {
          const Icon = getIcon(skill.icon_key);
          return (
            <li key={skill.id} className={s.techIcon} title={skill.name}>
              {Icon ? (
                <Icon aria-label={skill.name} />
              ) : (
                <span style={{ fontSize: '1.2rem' }}>{skill.name}</span>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default SkillIcons;
