import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Returns undefined while loading, null when logged out, or the session.
export const useSession = () => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }

    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session));

    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  return session;
};
