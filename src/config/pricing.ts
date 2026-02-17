// ─────────────────────────────────────────────────────────────────────────────
// src/config/pricing.ts
// All monetary constants in USD. Edit this file to update baseline pricing.
// ─────────────────────────────────────────────────────────────────────────────

export const PRICING_CONFIG = {
  // ── Base concrete price per m³ by type ──────────────────────────────────────
  basePerM3: {
    Standard:     155,   // Normal ready-mix
    HighStrength: 195,   // ≥ 5000 PSI / 35 MPa
    Fiber:        175,   // Fiber-reinforced
    SelfLeveling: 215,   // Self-leveling / SCC
  },

  // ── Strength upcharge per m³ (applied on top of base) ──────────────────────
  strengthUpchargePerM3: {
    200:  0,    // 2900 PSI
    250:  10,   // 3600 PSI
    300:  20,   // 4350 PSI
    350:  35,   // 5075 PSI
    400:  55,   // 5800 PSI (high-strength territory)
  } as Record<number, number>,

  // ── Delivery ────────────────────────────────────────────────────────────────
  deliveryBaseUSD:        95,   // flat trip fee
  deliveryPerKm:          2.8,  // per km from plant to site

  // ── Pump ────────────────────────────────────────────────────────────────────
  pumpMobilizationUSD:    450,  // one-time setup
  pumpPerHour:            185,  // per operating hour

  // ── Add-ons (per m³) ────────────────────────────────────────────────────────
  fiberAdditivePerM3:     12,   // polypropylene/steel fiber
  acceleratorPerM3:       8,    // accelerating admixture
  nightPourSurchargePerM3: 18,  // labor & logistics premium

  // ── Waste & tax ─────────────────────────────────────────────────────────────
  defaultWasteFactorPercent: 5,
  defaultTaxPercent:        9.5, // e.g. California sales tax on materials

  // ── Discount max (guard rail) ───────────────────────────────────────────────
  maxDiscountPercent: 25,
} as const

export type ConcreteType = keyof typeof PRICING_CONFIG.basePerM3
export type StrengthMPa  = keyof typeof PRICING_CONFIG.strengthUpchargePerM3
