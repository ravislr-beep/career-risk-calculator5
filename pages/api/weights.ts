import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../lib/supabaseClient';

type Weights = {
  skills: number;
  performance: number;
  network: number;
  mobility: number;
  notice: number;
  plateau: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from<Weights, 'public'>('weights') // ✅ second type argument is schema
      .select('*')
      .single(); // use .single() if expecting only one row

    if (error) {
      throw error;
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error('Error fetching weights:', err);
    res.status(500).json({ error: (err as Error).message });
  }
}
