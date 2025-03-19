// Citrus-themed word components
const CITRUS_PREFIXES = [
  "CITRUS", "ORANGE", "LEMON", "LIME", "YUZU", 
  "SATSUMA", "KUMQUAT", "POMELO", "CITRON", "MANDARIN"
] as const

const CITRUS_SUFFIXES = [
  "YIELD", "JUICE", "ZEST", "GROVE", "BURST",
  "BLOOM", "FRESH", "SWEET", "GOLD", "DEFI"
] as const

const SPECIAL_CHARS = ["!", "@", "#", "$", "%", "&", "*"] as const

/**
 * Generates a unique citrus-themed whitelist code
 * Format: PREFIX + Random4Digits + SUFFIX
 * Example: SATSUMA1234YIELD
 */
export const generateWhitelistCode = (): string => {
  const prefix = CITRUS_PREFIXES[Math.floor(Math.random() * CITRUS_PREFIXES.length)]
  const suffix = CITRUS_SUFFIXES[Math.floor(Math.random() * CITRUS_SUFFIXES.length)]
  const numbers = Math.floor(1000 + Math.random() * 9000) // 4-digit number
  
  return `${prefix}${numbers}${suffix}`
}

/**
 * Generates multiple unique whitelist codes
 */
export const generateMultipleCodes = (count: number): string[] => {
  const codes = new Set<string>()
  
  while (codes.size < count) {
    codes.add(generateWhitelistCode())
  }
  
  return Array.from(codes)
}

/**
 * Generates a more complex code with special characters
 * Format: PREFIX + Random3Digits + SpecialChar + SUFFIX
 * Example: SATSUMA123#YIELD
 */
export const generateComplexCode = (): string => {
  const prefix = CITRUS_PREFIXES[Math.floor(Math.random() * CITRUS_PREFIXES.length)]
  const suffix = CITRUS_SUFFIXES[Math.floor(Math.random() * CITRUS_SUFFIXES.length)]
  const numbers = Math.floor(100 + Math.random() * 900) // 3-digit number
  const specialChar = SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)]
  
  return `${prefix}${numbers}${specialChar}${suffix}`
}

/**
 * Validates if a code follows the whitelist code format
 */
export const isValidCodeFormat = (code: string): boolean => {
  // Basic format check
  const basicFormat = /^[A-Z]+\d{3,4}[A-Z]+$/
  // Complex format check (with special character)
  const complexFormat = /^[A-Z]+\d{3}[!@#$%&*][A-Z]+$/
  
  return basicFormat.test(code) || complexFormat.test(code)
} 