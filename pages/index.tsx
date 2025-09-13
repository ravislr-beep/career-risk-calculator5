import { supabase } from "../lib/supabaseClient";
import React from 'react';


 export default function Home() {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">🚀 Career Risk Calculator</h1>
      <p className="text-lg text-gray-300 mb-8">
        Login with Google to access your personalized career risk dashboard.
      </p>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-teal-500 rounded-xl font-semibold hover:bg-teal-600 transition"
      >
        🔑 Login with Google
      </button>
    </div>
  )
}
