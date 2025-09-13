import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '@lib/supabaseClient';

type Weights = {
  skills: number;
  performance: number;
  network: number;
  mobility: number;
  notice: number;
  plateau: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = getSupabaseAdmin();

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid Authorization header' });

    // Verify user session
    const { data: userData, error: sessionError } = await supabase.auth.getUser(token);
    if (sessionError || !userData) return res.status(401).json({ error: 'Invalid or expired session' });

    // Fetch weights
    const { data, error } = await supabase
      .from<'weights', Weights>('weights')
      .select('*')
      .single();

    if (error) throw error;

    res.status(200).json({ data });
  } catch (err) {
    console.error('Error fetching weights:', err);
    res.status(500).json({ error: (err as Error).message });
  }
}
