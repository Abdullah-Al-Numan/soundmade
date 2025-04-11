import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { campaignId, newName } = body;

    if (!campaignId || !newName) {
      return NextResponse.json(
        { error: 'Missing campaignId or newName' },
        { status: 400 }
      );
    }

    const url = 'https://a.klaviyo.com/api/campaign-clone';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/vnd.api+json',
        revision: '2024-10-15',
        'content-type': 'application/vnd.api+json',
        Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'campaign',
          id: campaignId,
          attributes: {
            new_name: newName,
          },
        },
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { message: 'Campaign cloned successfully', data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to clone campaign', details: data },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Clone Campaign Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
