
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { email } = await request.json();

  // Create a transporter for sending the email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'calebfundi19@gmail.com',
      pass: 'ghzd hzgt pwob lrlw',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'calebfundi19@gmail.com',
    to: email,
    subject: 'Subscription Confirmation: Industry Specific Student Innovations',
    html: `
      <h1>Thank you for subscribing!</h1>
      <p>You will now receive updates on industry specific student innovations.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
