import { NextResponse } from "next/server"

// Sample valid whitelist codes
const VALID_CODES = ["SATSUMA2024", "b4n4n4zul", "CITREA123", "DEFI4LIFE", "ORANGEYIELD"]

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    // Simple validation
    if (!code || typeof code !== "string") {
      return NextResponse.json({ message: "Please provide a valid code" }, { status: 400 })
    }

    // Check if code is valid (case insensitive)
    const isValid = VALID_CODES.some((validCode) => validCode.toLowerCase() === code.trim().toLowerCase())

    if (isValid) {
      // Simulate a slight delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      return NextResponse.json({ message: "Success! You've been added to the whitelist." }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Uh-oh! That code isn’t ripe yet." }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying code:", error)
    return NextResponse.json({ message: "Server error. Please try again later." }, { status: 500 })
  }
}

