import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Missing campaignId' },
        { status: 400 }
      );
    }

    const url = `https://a.klaviyo.com/api/campaigns/${campaignId}`;
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/vnd.api+json',
        revision: '2024-10-15',
        Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_KLAVIYO_PRIVATE_KEY}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { message: 'Campaign deleted successfully', data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to delete campaign', details: data },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Delete Campaign Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
