import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Fallback handler for when NextAuth fails
// Example with error handling inside the handler
export async function GET(request: Request) {
  try {
    return await fallbackHandler(request);
  } catch (error) {
    console.error("NextAuth configuration error:", error);
    return new Response("Auth error", { status: 500 });
  }
}

export const POST = GET;
