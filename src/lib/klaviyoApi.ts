/**
 * Klaviyo API service for interacting with Klaviyo's REST API
 */

const KLAVIYO_API_BASE_URL = "https://a.klaviyo.com/api"
// const KPK = "pk_037e641ac8baf1225068551b3a4915fca2"
//const KLAVIYO_API_VERSION = "2023-10-15"


/**
 * Get headers for Klaviyo API requests
 */
const getHeaders = () => {
  if (!process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY) {
    console.error("❌ Missing required environment variable: NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY");
    throw new Error("Server configuration error - Missing Klaviyo API key");
  }
  return {
    "accept": 'application/vnd.api+json',
    "revision": '2024-10-15',
    'content-type': 'application/vnd.api+json',
    "Authorization": `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY}`,
  };
};


/**
 * Fetch campaigns from Klaviyo
 */
export async function getCampaigns() {
  try {
    const url = "https://a.klaviyo.com/api/campaigns?filter=equals(messages.channel,'email')";
    const options = {
      method: 'GET',
      headers: getHeaders(), // Make sure revision is '2024-10-15'
    };

    const response = await fetch(url, options);

    return await response.json();

  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
}


/**
 * Get campaign details by ID
 */
export async function getCampaignById(campaignId: string) {
  try {
    const response = await fetch(`${KLAVIYO_API_BASE_URL}/campaigns/${campaignId}`, {
      method: "GET",
      headers: getHeaders(),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch campaign: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching campaign details:", error)
    throw error
  }
}

/**
 * Get campaign message content
 */
export async function getCampaignMessageContent(messageId: string) {
  try {
    const response = await fetch(`${KLAVIYO_API_BASE_URL}/campaign-messages/${messageId}/content`, {
      method: "GET",
      headers: getHeaders(),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch message content: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching message content:", error)
    throw error
  }
}

/**
 * Get templates from Klaviyo
 */
export async function getTemplates(page = 0, pageSize = 10) {
  try {
    const response = await fetch(`${KLAVIYO_API_BASE_URL}/templates`, {
      method: "GET",
      headers: getHeaders(),
      cache: "no-store",
    })
    console.log(page, pageSize)
    /*  if (!response.ok) {
       throw new Error(`Failed to fetch templates: ${response.status}`)
     } */

    return await response.json()
  } catch (error) {
    console.error("Error fetching templates:", error)
    throw error
  }
}

/**
 * Track an event in Klaviyo
 */
export async function trackEvent(event: {
  token: string
  event: string
  customer_properties: Record<string, any>
  properties?: Record<string, any>
  time?: number
}) {
  try {
    const response = await fetch(`${KLAVIYO_API_BASE_URL}/track`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(event),
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

/**
 * Send an email using a Klaviyo template
 */

export async function sendEmail(data: {
  templateId: string;
  listId: string;
  subject: string;
  fromEmail: string;
  fromName: string;
  replyToEmail?: string;
}) {
  try {
    const emailPayload = {
      data: {
        type: "event",
        attributes: {
          properties: {
            subject: data.subject,
            template_id: data.templateId,
          },
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: "Sent Email"
              }
            }
          },
          profile: {
            data: {
              type: "profile",
              id: data.listId,
              attributes: {
                email: data.fromEmail,
                first_name: data.fromName
              }
            }
          }
        }
      }
    };

    const response = await fetch(`${KLAVIYO_API_BASE_URL}/events/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(emailPayload),
    });
    console.log(response)


    if (response.status === 200) {
      return { success: false, message: 'No content returned in response' };
    }
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error response:', errorData);
      throw new Error(`Email sending failed: ${errorData}`);
    }


    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : {};

    console.log('Email sent successfully:', responseData);

    return {
      success: true,
      message: 'Email sent successfully',
    };

  } catch (error) {
    console.error('Complete error in sendEmail:', error);
    throw error;
  }
}











/**
 * Get lists from Klaviyo
 */
export async function getLists() {
  try {
    const url = `${KLAVIYO_API_BASE_URL}/lists/`;
    console.log("🚀 Fetching lists from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error Response Body:", errorText);
      throw new Error(`Failed to fetch lists: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching lists:", error);
    throw error;
  }
}




