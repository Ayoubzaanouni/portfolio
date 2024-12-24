import { FaJava } from '@react-icons/all-files/fa/FaJava';
import { DiJavascript1 } from '@react-icons/all-files/di/DiJavascript1';
import { FaPhp } from '@react-icons/all-files/fa/FaPhp';
import { SiDart } from "react-icons/si";
import { FaPython } from '@react-icons/all-files/fa/FaPython';
import { TbSql } from "react-icons/tb";
import { TbBrandCSharp } from "react-icons/tb";
import { SiUml } from "react-icons/si";
import { FaSymfony } from "react-icons/fa6";
import { SiMysql } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { FaFlutter } from "react-icons/fa6";
import { SiGodotengine } from "react-icons/si";






import s from './TechSkills.module.scss';

const TechSkills = () => {
  return (
    <ul className={s.container}>
      <li className={s.techIcon}>
        <FaJava />
      </li>
      <li className={s.techIcon}>
        <FaPython />
      </li>
      <li className={s.techIcon}>
        <DiJavascript1 />
      </li>
      <li className={s.techIcon}>
        <FaPhp />
      </li>
      <li className={s.techIcon}>
        <FaSymfony />
      </li>
      <li className={s.techIcon}>
        <TbSql />
      </li>
      <li className={s.techIcon}>
        <SiMysql />
      </li>
      <li className={s.techIcon}>
        <SiGodotengine />
      </li>
      <li className={s.techIcon}>
        <SiDart />
      </li>
      <li className={s.techIcon}>
        <FaFlutter />
      </li>
      <li className={s.techIcon}>
        <TbBrandCSharp />
      </li>
      <li className={s.techIcon}>
        <SiUml />
      </li>
      <li className={s.techIcon}>
        <DiMsqlServer />
      </li>
    </ul>
  );
};

export default TechSkills;
