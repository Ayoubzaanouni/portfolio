import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import Preloader from '../components/UIElements/Preloader/Preloader';
import Button from '../components/UIElements/Button/Button';
import { supabase } from '../lib/supabase';
import s from './Admin.module.scss';
import ExperiencesAdmin from './ExperiencesAdmin';
import Login from './Login';
import ProfileAdmin from './ProfileAdmin';
import ProjectsAdmin from './ProjectsAdmin';
import ResumeAdmin from './ResumeAdmin';
import SkillsAdmin from './SkillsAdmin';
import { useSession } from './useSession';

const tabs = [
  ['projects', 'Projects', ProjectsAdmin],
  ['experiences', 'Experiences', ExperiencesAdmin],
  ['profile', 'Profile', ProfileAdmin],
  ['skills', 'Skills & Tools', SkillsAdmin],
  ['resume', 'Resume', ResumeAdmin],
];

const Dashboard = ({ session }) => {
  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    supabase
      .rpc('is_admin')
      .then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session.user.id]);

  const logout = () => supabase.auth.signOut();

  if (isAdmin === undefined) return <Preloader />;

  return (
    <div className={s.page}>
      <div className={s.container}>
        <div className={s.header}>
          <h1 className={s.title}>
            Portfolio <span className={s.purple}>Admin</span>
          </h1>
          <div className={s.actions}>
            <span className={s.muted}>{session.user.email}</span>
            <Button href="/" className="primary">
              View site
            </Button>
            <Button onClick={logout} className="primary">
              Log out
            </Button>
          </div>
        </div>

        {!isAdmin ? (
          <div className={s.card}>
            <p>
              This account is not an admin. Add its email to the{' '}
              <code>admins</code> table in Supabase (see README).
            </p>
          </div>
        ) : (
          <>
            <nav className={s.tabs}>
              {tabs.map(([path, label]) => (
                <NavLink key={path} to={`/${path}`}>
                  {label}
                </NavLink>
              ))}
            </nav>

            <Routes>
              {tabs.map(([path, , Component]) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              {/* Relative to the router's basename ("/admin") — not an
                  absolute "/admin/projects" path, which would resolve to
                  "/admin/admin/projects". */}
              <Route path="*" element={<Navigate to="/projects" replace />} />
            </Routes>
          </>
        )}
      </div>
    </div>
  );
};

const AdminApp = () => {
  const session = useSession();

  return (
    <BrowserRouter basename="/admin">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            session === undefined ? (
              <Preloader />
            ) : session ? (
              <Dashboard session={session} />
            ) : (
              // Relative to the router's basename ("/admin") — not an
              // absolute "/admin/login" path, which would resolve to
              // "/admin/admin/login".
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
