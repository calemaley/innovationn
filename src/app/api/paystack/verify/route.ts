
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return new Response(JSON.stringify({ error: 'Transaction reference is required' }), { status: 400 });
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      cache: 'no-store' // Ensure we get the latest status
    });

    const data = await response.json();

    if (data.status) {
      // Return the transaction data which includes the final status
      return NextResponse.json(data.data);
    } else {
      return new Response(JSON.stringify({ error: data.message }), { status: response.status });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
  }
}
