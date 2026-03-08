
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: Request) {
  // Log to check if the environment variable is loaded.
  console.log('PAYSTACK_SECRET_KEY loaded:', !!PAYSTACK_SECRET_KEY);

  try {
    const body = await request.json();
    const { amount, email, card, mpesa } = body;

    // Log the entire received body
    console.log('Received request body:', body);

    let payload: any = {
      email,
      amount: Math.round(amount * 100), // Amount in kobo
      currency: 'KES',
    };

    // Determine payment method and construct payload
    if (card) {
      payload.card = card;
    } else if (mpesa && mpesa.phone) {
      // Correctly structure the payload for M-Pesa
      payload.mobile_money = {
        phone: mpesa.phone,
        provider: 'mpesa',
      };
    } else {
      // If neither card nor mpesa object is present, it's a bad request.
      console.error('Validation Error: No card or mpesa object found in the request body.');
      return new Response(JSON.stringify({ error: 'Payment details are required. Provide either a card or mpesa object.' }), { status: 400 });
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
    if (error instanceof SyntaxError) { // Catches JSON parsing errors
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body.' }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
  }
}
