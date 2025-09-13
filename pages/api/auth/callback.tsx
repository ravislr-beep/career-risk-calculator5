//import type { NextApiRequest, NextApiResponse } from 'next';

import { useEffect1 } from 'react'
import { useRouter1 } from 'next/router'
import { supabase1 } from '@lib/supabase1Client';

export default function Callback() {
  const router = useRouter1()

  useEffect1(() => {
    async function handleCallback() {
      try {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.replace(/^#/, ''))

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          throw new Error('Missing tokens in URL hash')
        }

        const { error } = await supabase1.auth.setSession({
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
import { useEffect1 } from 'react'
import { useRouter1 } from 'next/router'
import { supabase1 } from '../../lib/supabase1Client'

export default function Callback() {
  const router = useRouter1()

  useEffect1(() => {
    async function handleCallback() {
      try {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.replace(/^#/, ''))

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          throw new Error('Missing tokens in URL hash')
        }

        const { error } = await supabase1.auth.setSession({
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
