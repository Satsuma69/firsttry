import { NextResponse } from "next/server"

// SheetDB API endpoint
const SHEETDB_API_ENDPOINT = process.env.SHEETDB_API_ENDPOINT

export async function POST(request: Request) {
  try {
    const { code, email } = await request.json()

    // Input validation and sanitization
    if (!code || typeof code !== "string") {
      return NextResponse.json({ message: "Please provide a valid code" }, { status: 400 })
    }

    const sanitizedCode = code.trim().toLowerCase()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Please provide an email address" }, { status: 400 })
    }

    const sanitizedEmail = email.trim().toLowerCase()

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json({ message: "Please provide a valid email address" }, { status: 400 })
    }

    if (!SHEETDB_API_ENDPOINT) {
      return NextResponse.json(
        { message: "Server configuration error. Please try again later." },
        { status: 500 }
      )
    }

    // Check if email already exists
    const emailCheckResponse = await fetch(`${SHEETDB_API_ENDPOINT}/search?email=${sanitizedEmail}`)
    const existingEmailEntries = await emailCheckResponse.json()

    if (existingEmailEntries && existingEmailEntries.length > 0) {
      return NextResponse.json(
        { message: "This email is already registered for the whitelist" },
        { status: 409 }
      )
    }

    // Store in SheetDB
    const timestamp = new Date().toISOString()
    const storeResponse = await fetch(SHEETDB_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [{
          email: sanitizedEmail,
          code: sanitizedCode,
          timestamp: timestamp
        }]
      })
    })

    if (!storeResponse.ok) {
      throw new Error('Failed to store data in SheetDB')
    }

    console.log(`Whitelist registration: ${sanitizedEmail} with code ${sanitizedCode}`)

    // Simulate a network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(
      {
        message: "Success! You've been added to the whitelist.",
        email: sanitizedEmail,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error submitting email:", error)
    return NextResponse.json({ message: "Server error. Please try again later." }, { status: 500 })
  }
}

