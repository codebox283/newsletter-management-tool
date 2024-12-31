import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function POST(request: Request) {
    const { email, name } = await request.json();

    // Basic validation (you can expand this as needed)
    if (!email || !email.includes('@')) {
        return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    try {
        // Create a new subscriber in the database
        const subscriber = await prisma.subscriber.create({
            data: {
                email,
                name,
            },
        });
        return NextResponse.json(subscriber, { status: 201 });
    } catch (error) {
        console.error('Error creating subscriber:', error);
        return NextResponse.json({ message: 'Failed to subscribe.' }, { status: 500 });
    }
}