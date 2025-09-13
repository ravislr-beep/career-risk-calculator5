//import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@lib/supabaseClient';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
//import { supabase } from '../../lib/supabaseClient'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    // ✅ define the function inside useEffect
    async function handleCallback() {
      const hash = window.location.hash
      const params = new URLSearchParams(hash.replace(/^#/, ''))

      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      if (!access_token || !refresh_token) {
        console.error('Missing tokens in URL hash')
        return
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token
      })
      if (error) {
        console.error('Supabase setSession error:', error)
        return
      }

      router.replace('/dashboard') // redirect after login
    }

    // ✅ call it here
    handleCallback()
  }, [router])

  return <p>Signing you in…</p>
}
