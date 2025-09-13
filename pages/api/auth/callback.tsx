import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@lib/supabaseClient';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Callback() {
  const router = useRouter()

  useEffect(() => {
    async function handleCallback() {
      // Parse the URL hash fragment (everything after #)
      const hash = window.location.hash.substring(1) // remove leading #
      const params = new URLSearchParams(hash)

      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')
      const expires_in = params.get('expires_in')

      if (!access_token || !refresh_token) {
        console.error('Missing tokens in callback URL')
        return
      }

      // Complete the login with Supabase
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token
      })

      if (error) {
        console.error('Error setting session:', error.message)
        return
      }

      // Optional: you can store expires_in if you need it

      // Redirect to your app home (or dashboard)
      router.replace('/')
    }

    handleCallback()
  }, [router])

  return <p>Signing you in…</p>
}
