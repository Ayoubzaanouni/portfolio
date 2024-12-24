import { VscVscodeInsiders } from 'react-icons/vsc';
import { SiPostman } from 'react-icons/si';
import { DiGit } from 'react-icons/di';
import { FaLinux } from 'react-icons/fa';
import { SiJira } from "react-icons/si";
import { FaWindows } from "react-icons/fa";
import { SiAndroidstudio } from "react-icons/si";

import { BsTerminalFill } from '@react-icons/all-files/bs/BsTerminalFill';




import s from './ToolsUsed.module.scss';

const ToolsUsed = () => {
  return (
    <ul className={s.container}>
      <li className={s.techIcon}>
        <VscVscodeInsiders />
      </li>
      <li className={s.techIcon}>
        <SiPostman />
      </li>
      <li className={s.techIcon}>
        <SiJira />
      </li>
      <li className={s.techIcon}>
        <DiGit />
      </li>
      <li className={s.techIcon}>
        <FaLinux />
      </li>
      <li className={s.techIcon}>
        <FaWindows />
      </li>
      <li className={s.techIcon}>
        <SiAndroidstudio />
      </li>
      <li className={s.techIcon}>
        <BsTerminalFill />
      </li>
    </ul>
  );
};

export default ToolsUsed;
