
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export async function POST(request: Request) {
  const { email, amount, reference, month, day, time, timezone } = await request.json();

  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500 });
  }
  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required.' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  // Check if it's a meeting confirmation or a simple donation
  const isMeeting = month && day && time && timezone;

  const customerSubject = isMeeting
    ? `Your Meeting & Payment Confirmation - Innovation-n`
    : `Your Donation to Innovation-n was Successful`;

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Thank You for Your Support!</h2>
        <p>Dear Supporter,</p>
        <p>We have successfully received your payment. Your contribution is vital for our work and we are incredibly grateful.</p>
        <h3>Payment Details:</h3>
        <ul>
            <li><strong>Amount:</strong> KES ${amount}</li>
            <li><strong>Transaction Reference:</strong> ${reference}</li>
        </ul>

        ${isMeeting ? `
        <h3>Your Scheduled Meeting:</h3>
        <p>Your consultation meeting has been confirmed. Here are the details:</p>
        <ul>
            <li><strong>Date:</strong> ${month} ${day}</li>
            <li><strong>Time:</strong> ${time}</li>
            <li><strong>Timezone:</strong> ${timezone.replace(/_/g, ' ')}</li>
        </ul>
        <p>We will send a calendar invite to your email shortly.</p>
        ` : ''}

        <p>Your support helps us continue our mission. Thank you once again for your generosity.</p>
        <br>
        <p>Sincerely,</p>
        <p><strong>The Innovation-n Team</strong></p>
    </div>
  `;

  const adminSubject = isMeeting ? `New Meeting Scheduled & Paid!` : `New Donation Received!`;
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>${adminSubject}</h2>
        <p>A new payment has been successfully processed.</p>
        <h3>Details:</h3>
        <ul>
            <li><strong>Amount:</strong> KES ${amount}</li>
            <li><strong>Customer Email:</strong> ${email}</li>
            <li><strong>Transaction Reference:</strong> ${reference}</li>
        </ul>
        ${isMeeting ? `
        <h3>Scheduled Meeting Details:</h3>
        <ul>
            <li><strong>Date:</strong> ${month} ${day}</li>
            <li><strong>Time:</strong> ${time}</li>
            <li><strong>Timezone:</strong> ${timezone.replace(/_/g, ' ')}</li>
        </ul>
        <p>Remember to send a calendar invite to the customer.</p>
        ` : ''}
    </div>
  `;

  try {
    await transporter.sendMail({
      from: GMAIL_EMAIL,
      to: email,
      subject: customerSubject,
      html: customerHtml,
    });
    await transporter.sendMail({
      from: GMAIL_EMAIL,
      to: GMAIL_EMAIL, // Your notification
      subject: adminSubject,
      html: adminHtml,
    });
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
