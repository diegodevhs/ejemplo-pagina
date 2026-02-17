// ─────────────────────────────────────────────────────────────────────────────
// src/lib/projectPricingBridge.ts
// Maps free-text project fields to the typed values the calculator expects.
// Keeps project data/types untouched while feeding the pricing engine.
// ─────────────────────────────────────────────────────────────────────────────

import type { ConcreteType } from '@/config/pricing'

/**
 * Infer a ConcreteType from the project's free-text concreteType string.
 * Falls back to 'Standard' if no keyword matches.
 */
export function concreteTypeFromProject(rawType: string): ConcreteType {
  const t = rawType.toLowerCase()
  if (t.includes('self-level') || t.includes('scc') || t.includes('self level')) return 'SelfLeveling'
  if (t.includes('high') || t.includes('high-perf') || t.includes('silica')) return 'HighStrength'
  if (t.includes('fiber') || t.includes('fibre')) return 'Fiber'
  return 'Standard'
}

/**
 * Extract MPa value from a strength string like "5000 PSI / 34 MPa" or "4000 PSI".
 * Falls back to 250 MPa (≈ 3600 PSI) if parsing fails.
 */
export function strengthMPaFromProject(rawStrength: string): number {
  // Try to parse explicit MPa value first (e.g. "34 MPa")
  const mpaMatch = rawStrength.match(/(\d+)\s*MPa/i)
  if (mpaMatch) {
    const mpa = parseInt(mpaMatch[1], 10)
    return snapToStrengthOption(mpa)
  }

  // Fall back to PSI → MPa conversion (1 PSI ≈ 0.00689 MPa → round to our tiers)
  const psiMatch = rawStrength.match(/(\d+)\s*PSI/i)
  if (psiMatch) {
    const mpa = Math.round(parseInt(psiMatch[1], 10) * 0.00689)
    return snapToStrengthOption(mpa)
  }

  return 250 // default
}

/** Snap an arbitrary MPa value to the nearest valid option in our pricing config */
function snapToStrengthOption(mpa: number): number {
  const options = [200, 250, 300, 350, 400]
  return options.reduce((prev, cur) =>
    Math.abs(cur - mpa) <= Math.abs(prev - mpa) ? cur : prev,
  )
}
