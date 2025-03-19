import { NextResponse } from "next/server"
import { isValidCode } from "../../utils/validCodes"

// SheetDB API endpoint
const SHEETDB_API_ENDPOINT = process.env.SHEETDB_API_ENDPOINT

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code || typeof code !== "string") {
      return NextResponse.json({ message: "Please enter your whitelist code" }, { status: 400 })
    }

    const sanitizedCode = code.trim().toUpperCase()

    // Check if code is in the list of valid codes
    if (!isValidCode(sanitizedCode)) {
      return NextResponse.json({ message: "Oops! That's not a valid whitelist code" }, { status: 400 })
    }

    if (!SHEETDB_API_ENDPOINT) {
      return NextResponse.json(
        { message: "Server configuration error. Please try again later." },
        { status: 500 }
      )
    }

    // Check if code has been used
    const codeCheckResponse = await fetch(`${SHEETDB_API_ENDPOINT}/search?code=${sanitizedCode}`)
    const existingCodeEntries = await codeCheckResponse.json()

    if (existingCodeEntries && existingCodeEntries.length > 0) {
      return NextResponse.json(
        { message: "This fruit has already been picked. Need a new one? Check our Twitter!" },
        { status: 409 }
      )
    }

    // Simulate a network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({ message: "Great! Now enter your email to claim your spot" }, { status: 200 })
  } catch (error) {
    console.error("Error verifying code:", error)
    return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 })
  }
}

