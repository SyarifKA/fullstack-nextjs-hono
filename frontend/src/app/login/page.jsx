"use client"

import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      )

      // axios otomatis parse JSON → langsung akses res.data
      const data = res.data

      // Simpan token JWT ke cookies
      Cookies.set("token", data.token)

      router.push("/")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-md"
      >
        <h1 className="text-secondary font-semibold text-3xl text-center">Login</h1>
        <p className="text-center text-gray-600 text-sm mb-2">
          Please fill out the form correctly
        </p>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-black font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-black font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-lg mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex gap-1 justify-center text-sm">
            <span>No have an account?</span>
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </div>
      </form>
    </div>
  )
}
