
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: Request) {
  // Log to check if the environment variable is loaded.
  console.log('PAYSTACK_SECRET_KEY loaded:', !!PAYSTACK_SECRET_KEY);

  try {
    const { amount, email, payment_method, card, mpesa } = await request.json();

    let payload: any = {
      email,
      amount: Math.round(amount * 100), // Amount in kobo
      currency: 'KES',
    };

    if (payment_method === 'card') {
      payload.card = card;
    } else if (payment_method === 'mpesa') {
      payload.mpesa = mpesa;
    }

    // Log the payload we are sending to Paystack
    console.log('Sending payload to Paystack:', payload);

    const response = await fetch('https://api.paystack.co/charge', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Log the entire response from Paystack
    console.log('Received response from Paystack:', data);

    if (data.status) {
      return NextResponse.json(data.data);
    } else {
      // Log the specific error message from Paystack before returning 500
      console.error('Paystack API error:', data.message);
      return new Response(JSON.stringify({ error: data.message }), { status: 500 });
    }
  } catch (error: any) {
    // Log any unexpected errors
    console.error('An unexpected error occurred:', error.message);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
  }
}
