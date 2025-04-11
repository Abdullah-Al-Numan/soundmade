import { trackEvent } from "@/lib/klaviyoApi"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, customerProperties, properties } = body

    if (!event || !customerProperties || !customerProperties.$email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a random token for the event
    const token = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY

    if (!token) {
      return NextResponse.json({ error: "Klaviyo API key not configured" }, { status: 500 })
    }

    const result = await trackEvent({
      token,
      event,
      customer_properties: customerProperties,
      properties,
      time: Math.floor(Date.now() / 1000),
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Error tracking event:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
