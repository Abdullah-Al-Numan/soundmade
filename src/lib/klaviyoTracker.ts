/**
 * Utility for tracking events to Klaviyo
 */

// Track an event to Klaviyo
export async function trackKlaviyoEvent({
    event,
    customerProperties,
    properties,
  }: {
    event: string
    customerProperties: {
      $email: string
      $first_name?: string
      $last_name?: string
      [key: string]: any
    }
    properties?: Record<string, any>
  }) {
    try {
      const response = await fetch("/api/klaviyo/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event,
          customerProperties,
          properties,
        }),
      })
  
      if (!response.ok) {
        throw new Error(`Failed to track event: ${response.status}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error tracking event:", error)
      throw error
    }
}
    