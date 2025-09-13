import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseAdmin } from '../../lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import { geminiGenerate } from '../../lib/gemini'

type Weights = {
  skills: number
  performance: number
  network: number
  mobility: number
  notice: number
  plateau: number
}

const DEFAULT_WEIGHTS: Weights = {
  skills: 0.28,
  performance: 0.22,
  network: 0.18,
  mobility: 0.12,
  notice: 0.12,
  plateau: 0.08
}

function clamp(v:number,a=0,b=100){ return Math.max(a, Math.min(b, v)) }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const payload = req.body

  // attempt to read weights from DB
  const supabaseAdmin = getSupabaseAdmin()
  let wdata: any = null;
try {
  const { data } = await supabaseAdmin
    .from('weights')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  wdata = data;
} catch (err) {
  console.error('Failed to fetch weights', err);
}
const weights = (wdata?.weights as Weights) ?? DEFAULT_WEIGHTS;

  const skillScore = clamp((payload.skills/5)*100*weights.skills)
  const perfScore = clamp((payload.performance/5)*100*weights.performance)
  const networkScore = clamp((Math.min(payload.network,1000)/1000)*100*weights.network)
  const mobilityScore = clamp((payload.mobility?100:40)*weights.mobility)
  const noticeScore = clamp((90 - Math.min(payload.noticePeriod,90))*(100/90)*weights.notice)
  const plateauScore = clamp((payload.totalExperience<15?100:60)*weights.plateau)

  const total = skillScore + perfScore + networkScore + mobilityScore + noticeScore + plateauScore
  const riskCategory = total>=70?'Low': total>=40?'Medium':'High'
  const id = uuidv4()

  // call Gemini for insights
  const prompt = `You are a career advisor. The user has a career risk score of ${Math.round(total)} (${riskCategory}). Their profile: ${JSON.stringify(payload)}. Provide 3 practical career recommendations in simple, professional language.`
  const insights = await geminiGenerate(prompt)

  await supabaseAdmin.from('reports').insert({
    id,
    user_id: null,
    payload,
    risk_score: total,
    risk_category: riskCategory,
    insights
  }).catch(()=>null)

  res.json({ id, score: total, category: riskCategory, insights })
}
