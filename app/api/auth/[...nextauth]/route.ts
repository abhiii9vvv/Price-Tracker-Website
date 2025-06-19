import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Fallback handler for when NextAuth fails
export async function fallbackHandler() {
  return new Response(JSON.stringify({ error: "Authentication service unavailable" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  })
}

// Wrap the original exports with a try-catch block
try {
  // Use the fallback handler if NextAuth fails
  export { fallbackHandler as GET, fallbackHandler as POST }
} catch (error) {
  console.error("NextAuth configuration error:", error)
}
