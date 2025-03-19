import { generateWhitelistCode, generateComplexCode, generateMultipleCodes } from '../app/utils/codeGenerator.js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Number of codes to generate
const BASIC_CODES_COUNT = 50
const COMPLEX_CODES_COUNT = 50

// Generate codes
const basicCodes = generateMultipleCodes(BASIC_CODES_COUNT)
const complexCodes = Array.from({ length: COMPLEX_CODES_COUNT }, () => generateComplexCode())

// Combine all codes
const allCodes = [...basicCodes, ...complexCodes]

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'generated')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

// Save codes to a file with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const outputFile = path.join(outputDir, `whitelist-codes-${timestamp}.txt`)

const fileContent = `Satsuma Whitelist Codes
Generated: ${new Date().toLocaleString()}
Total Codes: ${allCodes.length}

Basic Codes (${basicCodes.length}):
${basicCodes.join('\n')}

Complex Codes (${complexCodes.length}):
${complexCodes.join('\n')}

Format:
- Basic: PREFIX + 4 digits + SUFFIX (e.g., SATSUMA1234YIELD)
- Complex: PREFIX + 3 digits + Special Char + SUFFIX (e.g., SATSUMA123#YIELD)
`

fs.writeFileSync(outputFile, fileContent)

console.log(`Generated ${allCodes.length} whitelist codes`)
console.log(`Saved to: ${outputFile}`) 