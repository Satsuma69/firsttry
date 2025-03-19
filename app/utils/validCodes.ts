// List of valid whitelist codes
export const VALID_CODES = [
  // Basic format codes (PREFIX + 4 digits + SUFFIX)
  "YUZU7190BURST",
  "YUZU7009FRESH",
  "YUZU4498FRESH",
  "KUMQUAT2460BURST",
  "LEMON4364JUICE",
  "KUMQUAT5088BURST",
  "CITRUS9483JUICE",
  "LIME8760DEFI",
  "YUZU6353GROVE",
  "SATSUMA4793BLOOM",
  "LEMON4074GROVE",
  "LIME7081YIELD",
  "ORANGE8785BURST",
  "LEMON5664DEFI",
  "YUZU9113JUICE",
  "YUZU8010JUICE",
  "LEMON9181SWEET",
  "SATSUMA8173FRESH",
  "POMELO8873GROVE",
  "CITRUS6213GOLD",
  "KUMQUAT9321GROVE",
  "YUZU6735FRESH",
  "YUZU9112GROVE",
  "LIME3957BLOOM",
  "KUMQUAT4781GROVE",
  "CITRUS1028YIELD",
  "LIME8923YIELD",
  "YUZU6672SWEET",
  "CITRON8933GROVE",
  "CITRUS9961FRESH",
  "CITRON5327FRESH",
  "CITRUS4851SWEET",
  "LIME3407GOLD",
  "CITRUS9528DEFI",
  "SATSUMA4570GOLD",
  "CITRON7626FRESH",
  "MANDARIN4173BLOOM",
  "POMELO9588BURST",
  "LEMON7619JUICE",
  "YUZU3284GOLD",
  "POMELO9788BURST",
  "KUMQUAT1138YIELD",
  "POMELO6904DEFI",
  "POMELO1107BURST",
  "CITRON3300FRESH",
  "YUZU5921GROVE",
  "LIME5034ZEST",
  "ORANGE3668BLOOM",
  "LEMON2642BLOOM",
  "LEMON9787GROVE",

  // Complex format codes (PREFIX + 3 digits + Special Char + SUFFIX)
  "LEMON787%SWEET",
  "ORANGE206$JUICE",
  "YUZU196%BLOOM",
  "LEMON362*FRESH",
  "MANDARIN302#DEFI",
  "YUZU479&ZEST",
  "YUZU790$JUICE",
  "MANDARIN489&DEFI",
  "YUZU501#YIELD",
  "SATSUMA429@GOLD",
  "CITRUS964*DEFI",
  "LIME722$SWEET",
  "ORANGE761%YIELD",
  "SATSUMA286@DEFI",
  "KUMQUAT655!FRESH",
  "CITRUS243@BLOOM",
  "POMELO377&GROVE",
  "KUMQUAT846!BLOOM",
  "LIME162%GROVE",
  "MANDARIN715!GROVE",
  "LEMON239%YIELD",
  "LEMON130*BLOOM",
  "MANDARIN953%GROVE",
  "LEMON469*BLOOM",
  "LEMON586%YIELD",
  "CITRON527!ZEST",
  "YUZU987&SWEET",
  "CITRUS700!SWEET",
  "ORANGE332*GOLD",
  "POMELO878@GROVE",
  "YUZU922!ZEST",
  "LIME385%SWEET",
  "MANDARIN152$BLOOM",
  "POMELO143!DEFI",
  "KUMQUAT175@SWEET",
  "YUZU591@GOLD",
  "POMELO233#ZEST",
  "ORANGE661%SWEET",
  "CITRUS514*GOLD",
  "LEMON159@ZEST",
  "MANDARIN615&SWEET",
  "LIME817&JUICE",
  "YUZU439*YIELD",
  "LEMON725@ZEST",
  "CITRON597$GOLD",
  "POMELO821&SWEET",
  "ORANGE676&FRESH",
  "CITRUS607$GROVE",
  "YUZU300$SWEET",
  "POMELO532*YIELD"
] as const

/**
 * Checks if a code is in the list of valid codes
 */
export function isValidCode(code: string): boolean {
  return VALID_CODES.includes(code.toUpperCase() as typeof VALID_CODES[number])
}