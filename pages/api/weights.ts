import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseAdmin } from '../../lib/supabaseClient'

type Weights = {
  skills: number
  performance: number
  network: number
  mobility: number
  notice: number
  plateau: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseAdmin = getSupabaseAdmin()

  if (req.method === 'GET') {
    const { data } = await supabaseAdmin.from('weights').select('*').order('updated_at', { ascending: false }).limit(1).single().catch(()=>({ data: null }))
    const weights = (data?.weights as Weights) ?? {
      skills: 0.28, performance: 0.22, network: 0.18, mobility: 0.12, notice: 0.12, plateau: 0.08
    }
    return res.json({ weights })
  }

  if (req.method === 'POST') {
    const body = req.body
    const newWeights = body?.weights
    if (!newWeights) return res.status(400).json({ error: 'weights required' })

    await supabaseAdmin.from('weights').insert({ weights: newWeights }).catch(()=>null)
    return res.json({ ok: true })
  }

  res.status(405).end()
}
