//import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@lib/supabaseClient';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
//import { supabase } from '../../lib/supabaseClient'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    async function handleCallback() {
      try {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.replace(/^#/, ''))

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          throw new Error('Missing tokens in URL hash')
        }

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        })
        if (error) throw error

        router.replace('/dashboard') // or wherever you want to redirect
      } catch (err) {
        console.error('Auth callback error:', err)
      }
    }

    // ✅ now the function exists when we call it
    handleCallback()
  }, [router])

  return <p>Signing you in…</p>
}
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    async function handleCallback() {
      try {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.replace(/^#/, ''))

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          throw new Error('Missing tokens in URL hash')
        }

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        })
        if (error) throw error

        router.replace('/dashboard') // or wherever you want to redirect
      } catch (err) {
        console.error('Auth callback error:', err)
      }
    }

    // ✅ now the function exists when we call it
    handleCallback()
  }, [router])

  return <p>Signing you in…</p>
}
