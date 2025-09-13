import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        saveUser(data.user)
      } else {
        window.location.href = "/"
      }
    })
  }, [])

  const saveUser = async (user: any) => {
    await supabase.from("app_users").upsert({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || "",
      avatar: user.user_metadata?.avatar_url || ""
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {user ? (
        <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
          <img src={user.user_metadata?.avatar_url} alt="avatar" className="w-20 h-20 rounded-full mx-auto mb-4"/>
          <h2 className="text-xl font-bold">Welcome, {user.user_metadata?.full_name}</h2>
          <p className="text-gray-600 mt-2">{user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
