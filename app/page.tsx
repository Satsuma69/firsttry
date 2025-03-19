"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2, X, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "email_collection" | "email_submitting" | "email_success"
  >("idle")
  const [message, setMessage] = useState("")
  const [emailError, setEmailError] = useState("")

  // Reset email error when email changes
  useEffect(() => {
    if (emailError) setEmailError("")
  }, [email])

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  // Handle Enter key press for code input
  const handleCodeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && code.trim() && status !== "loading" && status !== "success") {
      verifyCode()
    }
  }

  // Handle Enter key press for email input
  const handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email.trim() && status === "email_collection") {
      submitEmail()
    }
  }

  const verifyCode = async () => {
    if (!code.trim()) return

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        // Show email collection popup on successful code verification
        setStatus("email_collection")
      } else {
        setStatus("error")
        setMessage(data.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again.")
    }
  }

  const submitEmail = async () => {
    // Validate email before submission
    if (!email.trim()) {
      setEmailError("Email is required")
      return
    }

    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address")
      return
    }

    setStatus("email_submitting")

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code.trim(),
          email: email.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("email_success")

        // After 3 seconds, transition to the final success state
        setTimeout(() => {
          setStatus("success")
          setMessage("You've been successfully added to the Satsuma whitelist.")
        }, 3000)
      } else {
        setStatus("email_collection")
        setEmailError(data.message || "Failed to submit email. Please try again.")
      }
    } catch (error) {
      setStatus("email_collection")
      setEmailError("An unexpected error occurred. Please try again.")
    }
  }

  const resetForm = () => {
    setCode("")
    setEmail("")
    setStatus("idle")
    setMessage("")
    setEmailError("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#c2f0fa] to-[#e6f7fa]">
      {/* Decorative elements for futuristic feel */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>

      <header className="w-full py-6 relative z-10">
        <div className="container flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Satsuma-3-IK9Js1n1Pp8UiaR9QLy9Hom1hwTlDK.png"
              alt="Satsuma Logo"
              width={60}
              height={60}
              className="h-40 w-auto -mt-10"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20%281000%20x%20375%20px%29-2-4eB8V1KKzvOrmQZdtI5bUWnc3fD5U8.png"
              alt="Satsuma"
              width={200}
              height={75}
              className="h-auto w-40 -mt-10"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-md w-full mx-auto text-center space-y-8">
          <div className="backdrop-blur-sm bg-white/40 p-8 rounded-2xl border border-white/50 shadow-lg">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Join the Juiciest Whitelist on Citrea 🍊
              </h1>
              <p className="text-lg text-gray-700">
                Lock in your early access and squeeze out maximum yields with Satsuma.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your whitelist code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyPress={handleCodeKeyPress}
                  disabled={status === "loading" || status === "success"}
                  className="w-full border-0 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-orange-400 h-12 pl-4 rounded-xl"
                />
              </div>

              <Button
                onClick={verifyCode}
                disabled={status === "loading" || !code.trim() || status === "success"}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-medium py-6 rounded-xl h-12 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {status === "loading" ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Verify & Join"
                )}
              </Button>

              {status === "success" && (
                <div className="flex flex-col items-center justify-center gap-4 bg-white/70 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center text-green-600 gap-2">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <p>{message}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-600">Want more whitelist codes?</p>
                    <Link 
                      href="https://twitter.com/intent/tweet?text=Just%20secured%20my%20whitelist%20spot%20for%20%40SatsumaDEX%0A%0AThe%20freshest%20DEX%20on%20Citrea!%0A%0AJoin%20the%20juicy%20journey%20here%3A%20https%3A%2F%2Fsatsuma.exchange%20%F0%9F%8D%8A"
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Share on Twitter
                    </Link>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center justify-center text-red-600 gap-2 bg-white/70 p-4 rounded-xl backdrop-blur-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Email Collection Modal */}
      {(status === "email_collection" || status === "email_submitting" || status === "email_success") && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-xl">
            {status !== "email_success" && (
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {status === "email_collection" && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Whitelist Code Verified!</h3>
                  <p className="text-gray-600">
                    Please provide your email address to complete your registration and receive important updates about
                    Satsuma.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleEmailKeyPress}
                      className={`w-full border bg-white/90 focus:ring-2 focus:ring-orange-400 h-12 pl-4 rounded-xl ${
                        emailError ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {emailError && <p className="mt-1 text-sm text-red-600 text-left">{emailError}</p>}
                  </div>

                  <Button
                    onClick={submitEmail}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-medium py-6 rounded-xl h-12 transition-all duration-300"
                  >
                    Complete Registration
                  </Button>

                  <div className="text-xs text-gray-500 mt-4 space-y-2">
                    <p>We'll send important updates about the Satsuma launch to this email.</p>
                    <p>Your email will be stored securely and will not be shared with third parties.</p>
                  </div>
                </div>
              </>
            )}

            {status === "email_submitting" && (
              <div className="py-8 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-4">
                  <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
                </div>
                <h3 className="text-xl font-bold mb-2">Submitting Your Registration...</h3>
                <p className="text-gray-600">Please wait while we process your information.</p>
              </div>
            )}

            {status === "email_success" && (
              <div className="py-8 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-green-100">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Registration Complete!</h3>
                <p className="text-gray-600 mb-6">
                  You've been successfully added to the Satsuma whitelist.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 animate-progress"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="w-full py-4 relative z-10">
        <div className="container flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-6">
            <Link 
              href="https://twitter.com/satsumaDEX" 
              target="_blank"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="sr-only">Satsuma on X (Twitter)</span>
            </Link>
            <Link 
              href="https://t.me/satsumahelp" 
              target="_blank"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.9-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.48.329-.913.489-1.302.479-.428-.009-1.252-.242-1.865-.44-.752-.246-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.1-.002.32.023.465.14a.51.51 0 0 1 .171.325c.016.093.036.306.018.472z"/>
              </svg>
              <span className="sr-only">Join Satsuma on Telegram</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

