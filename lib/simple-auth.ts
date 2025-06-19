// Simple authentication system for demo purposes
export interface User {
  id: string
  name: string
  email: string
}

const DEMO_USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password",
  },
]

export async function signIn(email: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = DEMO_USERS.find((u) => u.email === email && u.password === password)

  if (user) {
    const { password: _, ...userWithoutPassword } = user
    // Store in localStorage for demo
    if (typeof window !== "undefined") {
      localStorage.setItem("auth-user", JSON.stringify(userWithoutPassword))
    }
    return userWithoutPassword
  }

  return null
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-user")
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("auth-user")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
