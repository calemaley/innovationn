
import { NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: Request) {
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

    const response = await fetch('https://api.paystack.co/charge', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.status) {
      return NextResponse.json(data.data);
    } else {
      return new Response(JSON.stringify({ error: data.message }), { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An unexpected error occurred.' }), { status: 500 });
  }
}
