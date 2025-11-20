"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@vehiverze/ui/card"
import { Input } from "@vehiverze/ui/input"
import { Button } from "@vehiverze/ui/button"
import { authenticate, login } from "@/lib/auth"

interface LoginPageProps {
  role: "admin" | "user"
}

export function LoginPage({ role }: LoginPageProps) {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = authenticate(id, password)
    if (user && user.role === role) {
      login(user)
      router.push(role === "admin" ? "/admin" : "/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{role === "admin" ? "Admin Login" : "Dashboard Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="id" className="text-sm font-medium text-gray-200">
                ID
              </label>
              <Input id="id" type="text" value={id} onChange={(e) => setId(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


