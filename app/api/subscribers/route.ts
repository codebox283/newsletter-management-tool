import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function GET() {
    try {
        const subscribers = await prisma.subscriber.findMany();
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return NextResponse.json({ message: 'Failed to fetch subscribers.' }, { status: 500 });
    }
}

// Handle PATCH req
export async function PATCH(request: Request) {
    const { id, email, name } = await request.json();

    if (!id) {
        return NextResponse.json({ message: 'Subscriber ID is required.' }, { status: 400 });
    }

    try {
        const updatedSubscriber = await prisma.subscriber.update({
            where: { id },
            data: { email, name },
        });
        return NextResponse.json(updatedSubscriber);
    } catch (error) {
        console.error('Error updating subscriber:', error);
        return NextResponse.json({ message: 'Failed to update subscriber.' }, { status: 500 });
    }
}

// Handle DELETE 
export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
      return NextResponse.json({ message: 'Subscriber ID is required.' }, { status: 400 });
  }

  try {
      await prisma.subscriber.delete({
          where: { id },
      });
      return NextResponse.json({ status: 204 }); 
  } catch (error) {
      console.error('Error deleting subscriber:', error);
      return NextResponse.json({ message: 'Failed to delete subscriber.' }, { status: 500 });
  }
}