// pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });

  // This automatically handles the OAuth redirect and stores the session
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('OAuth callback error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  // Redirect to home after successful login
  res.redirect('/');
}
