"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/components/lib/auth-context'

export function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          Wanderlust
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={pathname === '/' ? 'text-primary' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/bookings" className={pathname === '/bookings' ? 'text-primary' : ''}>
                My Bookings
              </Link>
            </li>
            {user ? (
              <>
                <li>Welcome, {user.name}</li>
                <li>
                  <Button variant="ghost" onClick={logout}>Logout</Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className={pathname === '/login' ? 'text-primary' : ''}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className={pathname === '/signup' ? 'text-primary' : ''}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}

