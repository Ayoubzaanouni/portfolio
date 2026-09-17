const toRows = (category, keys) =>
  keys.map(([name, icon_key], i) => ({
    id: `${category}-${i}`,
    name,
    icon_key,
    category,
    sort_order: i,
  }));

const skills = [
  ...toRows('skill', [
    ['PHP', 'FaPhp'],
    ['Symfony', 'FaSymfony'],
    ['API Platform', 'TbApi'],
    ['Doctrine ORM', 'SiDoctrine'],
    ['PostgreSQL', 'SiPostgresql'],
    ['MySQL', 'SiMysql'],
    ['SQL Server', 'DiMsqlServer'],
    ['SQL', 'TbSql'],
    ['DDD / Hexagonal Architecture', 'TbHexagons'],
    ['.NET', 'SiDotnet'],
    ['C#', 'TbBrandCSharp'],
    ['Python', 'FaPython'],
    ['JavaScript', 'DiJavascript1'],
    ['Java', 'FaJava'],
    ['UML', 'SiUml'],
    ['Dart', 'SiDart'],
    ['Flutter', 'FaFlutter'],
    ['Godot', 'SiGodotengine'],
  ]),
  ...toRows('tool', [
    ['Docker', 'FaDocker'],
    ['Git', 'DiGit'],
    ['Jenkins', 'SiJenkins'],
    ['Composer', 'SiComposer'],
    ['PHPUnit', null],
    ['Linux', 'FaLinux'],
    ['Jira', 'SiJira'],
    ['Confluence', 'SiConfluence'],
    ['Postman', 'SiPostman'],
    ['VS Code', 'VscVscodeInsiders'],
    ['Windows', 'FaWindows'],
    ['Android Studio', 'SiAndroidstudio'],
    ['Terminal', 'BsTerminalFill'],
  ]),
];

export default skills;
