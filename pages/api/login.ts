import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  });

  if (error) return res.status(400).json({ error: error.message });

  // Redirect user to Supabase OAuth consent page
  res.redirect(data.url);
}
