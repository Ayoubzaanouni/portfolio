import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/UIElements/Button/Button';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import s from './Admin.module.scss';
import { useSession } from './useSession';

const Login = () => {
  const session = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Relative to the router's basename ("/admin") — not an absolute "/admin"
  // path, which would resolve to "/admin/admin".
  if (session) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) setError(error.message);
  };

  return (
    <div className={s.page}>
      <div className={`${s.card} ${s.login}`}>
        <h1 className={s.title}>
          Admin <span className={s.purple}>Login</span>
        </h1>

        {!isSupabaseConfigured ? (
          <p>
            Supabase is not configured. Set PUBLIC_SUPABASE_URL and
            PUBLIC_SUPABASE_ANON_KEY.
          </p>
        ) : (
          <form className={s.form} onSubmit={submit}>
            <div className={s.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={s.field}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={s.purple}>{error}</p>}
            <Button type="submit" className="primary" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
