import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { campaignId } = body;

        if (!campaignId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const url = 'https://a.klaviyo.com/api/campaign-send-jobs';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/vnd.api+json',
                revision: '2025-01-15',
                'content-type': 'application/vnd.api+json',
                Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`
            },
            body: `{"data":{"type":"campaign-send-job","id":"${campaignId}"}}`
        };

        const response = await fetch(url, options);
          
        const data = await response.json();
        console.log('Klaviyo API Response:', data);

        if (response.ok) {
            return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });
        } else {
            console.error('Klaviyo API Error:', data);
            return NextResponse.json({ error: 'Failed to send email via Klaviyo API.', details: data }, { status: 500 });
        }
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
