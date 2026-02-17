import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields server-side
    const required = ['name', 'phone', 'email', 'projectType', 'desiredM3', 'address']
    for (const field of required) {
      if (!body[field] || (typeof body[field] === 'string' && !body[field].trim())) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 },
        )
      }
    }

    if (typeof body.desiredM3 !== 'number' || body.desiredM3 <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid volume' }, { status: 400 })
    }

    // In production: send email, write to CRM, post to Slack, etc.
    console.log('[QUOTE REQUEST]', {
      timestamp: new Date().toISOString(),
      ...body,
    })

    return NextResponse.json({ success: true, message: 'Quote request received.' })
  } catch (err) {
    console.error('[QUOTE API ERROR]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
