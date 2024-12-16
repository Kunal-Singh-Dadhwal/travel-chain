"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Check if user is logged in (e.g., by checking localStorage)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    // For this example, we'll just simulate a successful login
    const user = { id: '1', name: 'John Doe', email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, you would make an API call here
    // For this example, we'll just simulate a successful signup
    const user = { id: '1', name, email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

