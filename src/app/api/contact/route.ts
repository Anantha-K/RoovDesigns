import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      
      from: 'onboarding@resend.dev', 

      to: 'YOUR_EMAIL_HERE@gmail.com', 
      
      subject: `New Inquiry from ${name}`,

      replyTo: email,
      
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2>New Contact Form Submission - Roov Designs</h2>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f4f4f4; padding: 16px; border-radius: 8px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
