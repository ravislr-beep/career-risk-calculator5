import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the session from the URL
  const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

  if (error) {
    console.error('OAuth callback error:', error.message);
    return res.status(400).json({ error: error.message });
  }

  // Redirect to your app after successful login
  res.redirect('/');
}
