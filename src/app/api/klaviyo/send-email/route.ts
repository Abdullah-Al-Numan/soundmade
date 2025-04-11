// app/api/klaviyo/send-email/route.ts
import { sendEmail } from '@/lib/klaviyoApi';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { templateId, listId, subject, fromEmail, fromName, replyToEmail } = body;

        // Validate required fields
        if (!templateId || !subject || !fromEmail || !fromName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Calling the sendEmail function
        const result = await sendEmail({
            templateId,
            listId,
            subject,
            fromEmail,
            fromName,
            replyToEmail: replyToEmail || fromEmail
        });

        // Return success response
        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
