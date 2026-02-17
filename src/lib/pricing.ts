// ─────────────────────────────────────────────────────────────────────────────
// src/lib/pricing.ts
// Pure, deterministic pricing engine. No rounding until display / final totals.
// ─────────────────────────────────────────────────────────────────────────────

import { PRICING_CONFIG, type ConcreteType } from '@/config/pricing'

// ── Input / Output types ──────────────────────────────────────────────────────

export interface QuoteInput {
  volumeM3: number               // required; must be > 0
  concreteType: ConcreteType     // 'Standard' | 'HighStrength' | 'Fiber' | 'SelfLeveling'
  strengthMPa?: number           // 200 / 250 / 300 / 350 / 400 (MPa × 10 for the lookup key)
  deliveryDistanceKm?: number    // 0 = no delivery charge
  needsPump?: boolean
  pumpHours?: number             // only relevant when needsPump = true
  hasFiber?: boolean
  hasAccelerator?: boolean
  nightPour?: boolean
  wasteFactorPercent?: number    // default: PRICING_CONFIG.defaultWasteFactorPercent
  discountPercent?: number       // default: 0
  taxPercent?: number            // default: PRICING_CONFIG.defaultTaxPercent
}

export interface LineItem {
  key: string
  label: string
  amount: number   // unrounded; may be negative (discount)
  note?: string
}

export interface QuoteResult {
  lineItems: LineItem[]
  subtotal:  number   // sum of all positive items + discount (before tax)
  taxAmount: number
  total:     number   // subtotal + tax, rounded to 2 decimals
  costPerM3: number   // total / effectiveVolume, rounded to 2 decimals
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Nearest valid strength key in the lookup table */
function resolveStrengthKey(mpa?: number): number {
  if (!mpa) return 250
  const keys = Object.keys(PRICING_CONFIG.strengthUpchargePerM3).map(Number).sort((a, b) => a - b)
  // clamp to valid range
  return keys.reduce((prev, cur) => (Math.abs(cur - mpa) <= Math.abs(prev - mpa) ? cur : prev))
}

function r2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

// ── Core function ─────────────────────────────────────────────────────────────

export function calculateQuote(input: QuoteInput): QuoteResult {
  const {
    volumeM3,
    concreteType,
    strengthMPa,
    deliveryDistanceKm = 0,
    needsPump = false,
    pumpHours = 0,
    hasFiber = false,
    hasAccelerator = false,
    nightPour = false,
    wasteFactorPercent = PRICING_CONFIG.defaultWasteFactorPercent,
    discountPercent = 0,
    taxPercent = PRICING_CONFIG.defaultTaxPercent,
  } = input

  if (volumeM3 <= 0) {
    throw new RangeError('volumeM3 must be greater than 0')
  }

  const clampedDiscount = Math.min(
    Math.max(0, discountPercent),
    PRICING_CONFIG.maxDiscountPercent,
  )

  // Effective volume including waste
  const wasteFactor = 1 + wasteFactorPercent / 100
  const effectiveVolume = volumeM3 * wasteFactor

  const items: LineItem[] = []

  // 1. Base concrete
  const baseRate = PRICING_CONFIG.basePerM3[concreteType]
  const baseAmount = effectiveVolume * baseRate
  items.push({
    key: 'base',
    label: `Base concrete — ${concreteType}`,
    amount: baseAmount,
    note: `${effectiveVolume.toFixed(2)} m³ × $${baseRate}/m³`,
  })

  // 2. Strength upcharge
  const strengthKey = resolveStrengthKey(strengthMPa)
  const strengthRate = PRICING_CONFIG.strengthUpchargePerM3[strengthKey] ?? 0
  if (strengthRate > 0) {
    items.push({
      key: 'strength',
      label: `Strength upcharge (${strengthKey} MPa)`,
      amount: effectiveVolume * strengthRate,
      note: `$${strengthRate}/m³`,
    })
  }

  // 3. Delivery
  if (deliveryDistanceKm > 0) {
    const deliveryAmount =
      PRICING_CONFIG.deliveryBaseUSD + deliveryDistanceKm * PRICING_CONFIG.deliveryPerKm
    items.push({
      key: 'delivery',
      label: 'Delivery',
      amount: deliveryAmount,
      note: `Base $${PRICING_CONFIG.deliveryBaseUSD} + ${deliveryDistanceKm} km × $${PRICING_CONFIG.deliveryPerKm}/km`,
    })
  }

  // 4. Pump
  if (needsPump) {
    const pumpAmount =
      PRICING_CONFIG.pumpMobilizationUSD + pumpHours * PRICING_CONFIG.pumpPerHour
    items.push({
      key: 'pump',
      label: 'Concrete pump',
      amount: pumpAmount,
      note: `Mobilization $${PRICING_CONFIG.pumpMobilizationUSD} + ${pumpHours}h × $${PRICING_CONFIG.pumpPerHour}/h`,
    })
  }

  // 5. Add-ons
  if (hasFiber) {
    items.push({
      key: 'fiber',
      label: 'Fiber additive',
      amount: effectiveVolume * PRICING_CONFIG.fiberAdditivePerM3,
      note: `$${PRICING_CONFIG.fiberAdditivePerM3}/m³`,
    })
  }

  if (hasAccelerator) {
    items.push({
      key: 'accelerator',
      label: 'Accelerating admixture',
      amount: effectiveVolume * PRICING_CONFIG.acceleratorPerM3,
      note: `$${PRICING_CONFIG.acceleratorPerM3}/m³`,
    })
  }

  if (nightPour) {
    items.push({
      key: 'nightpour',
      label: 'Night pour surcharge',
      amount: effectiveVolume * PRICING_CONFIG.nightPourSurchargePerM3,
      note: `$${PRICING_CONFIG.nightPourSurchargePerM3}/m³`,
    })
  }

  // 6. Waste line item (informational — already baked into effectiveVolume)
  if (wasteFactorPercent > 0) {
    items.push({
      key: 'waste',
      label: `Waste allowance (${wasteFactorPercent}%)`,
      amount: (effectiveVolume - volumeM3) * baseRate,
      note: `+${wasteFactorPercent}% of volume`,
    })
  }

  // Gross before discount
  const gross = items.reduce((sum, item) => sum + item.amount, 0)

  // 7. Discount
  if (clampedDiscount > 0) {
    const discountAmount = -(gross * clampedDiscount) / 100
    items.push({
      key: 'discount',
      label: `Discount (${clampedDiscount}%)`,
      amount: discountAmount,
    })
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = subtotal * (taxPercent / 100)
  const total = r2(subtotal + taxAmount)
  const costPerM3 = r2(total / effectiveVolume)

  return { lineItems: items, subtotal, taxAmount, total, costPerM3 }
}
