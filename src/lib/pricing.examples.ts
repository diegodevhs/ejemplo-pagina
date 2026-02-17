// ─────────────────────────────────────────────────────────────────────────────
// src/lib/pricing.examples.ts
//
// Runnable smoke-tests for calculateQuote().
// No test framework needed — run with:
//   npx ts-node --project tsconfig.json src/lib/pricing.examples.ts
//   (or just inspect the console output in your dev environment)
// ─────────────────────────────────────────────────────────────────────────────

import { calculateQuote } from './pricing'

function assert(label: string, condition: boolean) {
  const status = condition ? '✅ PASS' : '❌ FAIL'
  console.log(`${status}  ${label}`)
  if (!condition) process.exitCode = 1
}

// ── Example 1: Simple residential driveway ────────────────────────────────────
const ex1 = calculateQuote({
  volumeM3: 10,
  concreteType: 'Standard',
  strengthMPa: 250,
  wasteFactorPercent: 5,
  taxPercent: 9.5,
})
console.log('\nExample 1 — Simple Standard, 10 m³:')
console.log('  total    :', ex1.total)
console.log('  $/m³     :', ex1.costPerM3)
console.log('  line items:', ex1.lineItems.map(i => i.key).join(', '))
assert('total > 0', ex1.total > 0)
assert('has base line item', ex1.lineItems.some(i => i.key === 'base'))
assert('no pump line item', !ex1.lineItems.some(i => i.key === 'pump'))

// ── Example 2: Industrial slab with pump, fiber, delivery ────────────────────
const ex2 = calculateQuote({
  volumeM3: 200,
  concreteType: 'Fiber',
  strengthMPa: 300,
  deliveryDistanceKm: 25,
  needsPump: true,
  pumpHours: 8,
  hasFiber: true,
  wasteFactorPercent: 5,
  discountPercent: 5,
  taxPercent: 9.5,
})
console.log('\nExample 2 — Fiber 200 m³, pump 8h, delivery 25km, 5% discount:')
console.log('  total    :', ex2.total)
console.log('  $/m³     :', ex2.costPerM3)
assert('total > 0', ex2.total > 0)
assert('has pump', ex2.lineItems.some(i => i.key === 'pump'))
assert('has fiber', ex2.lineItems.some(i => i.key === 'fiber'))
assert('has discount', ex2.lineItems.some(i => i.key === 'discount'))
assert('discount is negative', (ex2.lineItems.find(i => i.key === 'discount')?.amount ?? 0) < 0)

// ── Example 3: Night pour with accelerator ────────────────────────────────────
const ex3 = calculateQuote({
  volumeM3: 50,
  concreteType: 'HighStrength',
  strengthMPa: 400,
  nightPour: true,
  hasAccelerator: true,
  taxPercent: 0,   // no tax scenario
})
console.log('\nExample 3 — HighStrength 50 m³, night pour, accelerator, 0% tax:')
console.log('  total    :', ex3.total)
assert('night pour present', ex3.lineItems.some(i => i.key === 'nightpour'))
assert('taxAmount is 0', ex3.taxAmount === 0)
assert('total equals subtotal when 0% tax', ex3.total === Math.round((ex3.subtotal + Number.EPSILON) * 100) / 100)

// ── Example 4: Discount clamped at 25% ────────────────────────────────────────
const ex4 = calculateQuote({ volumeM3: 10, concreteType: 'Standard', discountPercent: 99 })
assert('discount clamped to 25% max', ex4.total > 0)

// ── Example 5: Validates RangeError on 0 volume ───────────────────────────────
try {
  calculateQuote({ volumeM3: 0, concreteType: 'Standard' })
  assert('should throw on 0 volume', false)
} catch (e) {
  assert('throws RangeError on 0 volume', e instanceof RangeError)
}

console.log('\nDone.\n')
