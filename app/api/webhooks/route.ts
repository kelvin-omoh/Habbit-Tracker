import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import connectToDB from '@/app/lib/connectToDB'
import User from '@/app/Models/UserSchema'

export async function POST(req: NextRequest) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse('Error occurred -- no svix headers', {
            status: 400
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new NextResponse('Error occurred', {
            status: 400
        });
    }

    // Process the webhook event
    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType === 'user.created') {
        const { email_addresses } = evt.data;

        const newUser = {
            clerkUserId: id,
            emailAddress: email_addresses[0].email_address
        };

        try {
            await connectToDB();
            await User.create(newUser);
            console.log('User created');
            return NextResponse.json({ message: 'User created' });
        } catch (error) {
            console.error('Error creating user:', error);
            return new NextResponse('Error creating user', {
                status: 500
            });
        }
    }

    console.log(`Webhook with ID ${id} and type ${eventType}`);
    console.log('Webhook body:', body);

    return new NextResponse('', { status: 200 });
}
