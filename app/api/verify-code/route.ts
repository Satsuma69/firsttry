import { NextResponse } from "next/server"
import { isValidCode } from "../../utils/validCodes"

// SheetDB API endpoint
const SHEETDB_API_ENDPOINT = process.env.SHEETDB_API_ENDPOINT

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code || typeof code !== "string") {
      return NextResponse.json({ message: "Please provide a valid code" }, { status: 400 })
    }

    const sanitizedCode = code.trim().toUpperCase()

    // Check if code is in the list of valid codes
    if (!isValidCode(sanitizedCode)) {
      return NextResponse.json({ message: "Invalid whitelist code" }, { status: 400 })
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
        { message: "This whitelist code has already been used" },
        { status: 409 }
      )
    }

    // Simulate a network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({ message: "Valid whitelist code" }, { status: 200 })
  } catch (error) {
    console.error("Error verifying code:", error)
    return NextResponse.json({ message: "Server error. Please try again later." }, { status: 500 })
  }
}

