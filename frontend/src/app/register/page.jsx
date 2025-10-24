"use client"

import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    cPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (form.password !== form.cPassword) {
      setError("Password confirmation doesn't match")
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}register`, {
        name: form.fullName,
        email: form.email,
        password: form.password,
      })

      if (res.status === 200) {
        setSuccess("Registration successful! You can now login.")
        setForm({ fullName: "", email: "", password: "", cPassword: "" })
      }
      router.push("/login")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:justify-center md:flex-row min-h-screen bg-green-200">
      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-md"
        >
          <h1 className="text-secondary font-semibold text-2xl text-center">
            Register
          </h1>
          <span className="text-center text-gray-600 text-sm">
            Fill out the form correctly
          </span>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-black font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="input input-bordered w-full"
              placeholder="Enter Your Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="cPassword" className="text-black font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="cPassword"
              name="cPassword"
              className="input input-bordered w-full"
              placeholder="Enter Your Password Again"
              value={form.cPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error or success */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 text-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <div className="flex gap-1 justify-center text-sm">
            <span>Have an account?</span>
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
