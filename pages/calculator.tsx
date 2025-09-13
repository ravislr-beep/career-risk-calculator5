import { useState } from 'react'

type Form = {
  skills: number
  performance: number
  network: number
  mobility: number
  noticePeriod: number
  totalExperience: number
}

export default function Calculator() {
  const [form, setForm] = useState<Form>({
    skills: 3,
    performance: 3,
    network: 100,
    mobility: 0,
    noticePeriod: 30,
    totalExperience: 5
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const setField = (k: keyof Form, v: number) => setForm({...form, [k]: v})

  const submit = async () => {
    setLoading(true)
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        fullName: 'Test User',
        email: 'test@example.com'
      })
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Career Risk Calculator</h1>
        <div className="grid grid-cols-2 gap-3">
          <label>Skills (1-5)</label>
          <input type="number" min={1} max={5} value={form.skills} onChange={e=>setField('skills', parseFloat(e.target.value)||0)} className="border p-2 rounded"/>
          <label>Performance (1-5)</label>
          <input type="number" min={1} max={5} value={form.performance} onChange={e=>setField('performance', parseFloat(e.target.value)||0)} className="border p-2 rounded"/>
          <label>LinkedIn network size</label>
          <input type="number" min={0} value={form.network} onChange={e=>setField('network', parseFloat(e.target.value)||0)} className="border p-2 rounded"/>
          <label>Willing to relocate (0=no,1=yes)</label>
          <input type="number" min={0} max={1} value={form.mobility} onChange={e=>setField('mobility', parseFloat(e.target.value)||0)} className="border p-2 rounded"/>
          <label>Notice period days</label>
          <input type="number" min={0} value={form.noticePeriod} onChange={e=>setField('noticePeriod', parseFloat(e.target.value)||0)} className="border p-2 rounded"/>
          <label>Total experience (years)</label>
          <input type="number" min={0} value={form.totalExperience} onChange={e=>setField('totalExperience', parseFloat(e.target.value)||0)} className="border p-2 rounded"/>
        </div>
        <div className="mt-4 flex space-x-2">
          <button onClick={submit} className="px-4 py-2 bg-teal-600 text-white rounded">{loading?'Working...':'Calculate'}</button>
          <button onClick={()=>setResult(null)} className="px-4 py-2 border rounded">Reset</button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Result</h3>
            <p>Score: {Math.round(result.score)} ({result.category})</p>
            <h4 className="mt-2 font-semibold">Gemini Insights:</h4>
            <pre className="text-sm whitespace-pre-wrap">{result.insights}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
