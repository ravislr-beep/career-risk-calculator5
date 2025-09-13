// pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
//import { supabase } from '../../lib/supabaseClient';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { code, state } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Missing code in query' });
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) throw error;

    // At this point, `data.session` contains the access token
    // You can store it in a cookie or redirect with token
    res.redirect('/'); // redirect to home after login
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(400).json({ error: (err as Error).message });
  }
}
