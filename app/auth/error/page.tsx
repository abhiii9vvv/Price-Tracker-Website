"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link was invalid or has expired.",
    OAuthSignin: "Could not sign in with the provider.",
    OAuthCallback: "Could not retrieve information from the provider.",
    OAuthCreateAccount: "Could not create an account with the provider.",
    EmailCreateAccount: "Could not create an account with this email.",
    Callback: "Something went wrong with the sign in process.",
    OAuthAccountNotLinked: "This email is already associated with another account.",
    EmailSignin: "The email could not be sent.",
    CredentialsSignin: "The email or password you entered is incorrect.",
    SessionRequired: "You must be signed in to access this page.",
    Default: "An unknown error occurred during authentication.",
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>

        <div className="flex flex-col space-y-4">
          <Button asChild>
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
