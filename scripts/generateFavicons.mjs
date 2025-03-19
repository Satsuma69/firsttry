import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Satsuma-3-IK9Js1n1Pp8UiaR9QLy9Hom1hwTlDK.png"
const PUBLIC_DIR = path.join(process.cwd(), 'public')

// Create public directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR)
}

// Download the logo
async function downloadLogo() {
  const response = await fetch(LOGO_URL)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer
}

// Generate favicons
async function generateFavicons() {
  try {
    console.log('Downloading logo...')
    const logoBuffer = await downloadLogo()

    console.log('Generating favicons...')
    const sizes = [16, 32, 48, 64, 128, 256]
    const promises = sizes.map(size => 
      sharp(logoBuffer)
        .resize(size, size)
        .toFile(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`))
    )

    // Generate apple-touch-icon
    promises.push(
      sharp(logoBuffer)
        .resize(180, 180)
        .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
    )

    // Generate android chrome icons
    promises.push(
      sharp(logoBuffer)
        .resize(192, 192)
        .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'))
    )

    promises.push(
      sharp(logoBuffer)
        .resize(512, 512)
        .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'))
    )

    // Generate main favicon.ico (includes multiple sizes)
    const faviconSizes = [16, 32, 48]
    const faviconBuffers = await Promise.all(
      faviconSizes.map(size => 
        sharp(logoBuffer)
          .resize(size, size)
          .toFormat('png')
          .toBuffer()
      )
    )

    await sharp(faviconBuffers[0])
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'))

    await Promise.all(promises)
    console.log('Favicons generated successfully!')

  } catch (error) {
    console.error('Error generating favicons:', error)
  }
}

// Run the script
generateFavicons() 