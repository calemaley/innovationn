
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ical from 'ical-generator';

export async function POST(request: Request) {
  const { amount, email } = await request.json();

  // Create a calendar event
  const cal = ical({ name: 'All-hands event' });
  const event = cal.createEvent({
    start: new Date(), // This should be replaced with the actual event date
    end: new Date(new Date().getTime() + 60 * 60 * 1000), // This should be replaced with the actual event end date
    summary: 'All-hands event',
    description: 'Your event description',
    location: 'Event Location',
    url: 'http://example.com/',
  });

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
    subject: 'Your Invoice and Event Invitation',
    html: `
      <h1>Thank you for your payment!</h1>
      <p>You have successfully paid KES ${amount}.</p>
      <p>Please find attached the calendar invitation for the event.</p>
    `,
    icalEvent: {
        filename: "invitation.ics",
        method: 'request',
        content: cal.toString(),
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Invoice sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send invoice' }, { status: 500 });
  }
}
