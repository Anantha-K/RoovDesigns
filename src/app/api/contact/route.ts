import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const logoUrl = `${baseUrl}/logo3-white.png`;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",

      to: process.env.CONTACT_EMAIL || "",

      subject: `New Inquiry from ${name}`,

      replyTo: email,

      html: `
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; width: 100%; margin: 0; padding: 40px 0;">
          <tr>
            <td align="center">
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; width: 100%; margin: 0 auto; background-color: #0f0e11; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #3a1375; text-align: left;">
                <!-- Header -->
                <div style="background-color: #220b45; padding: 40px 24px 32px 24px; text-align: center; border-bottom: 2px solid #7c3aed;">
                  <img src="${logoUrl}" alt="Roov Designs" style="max-height: 40px; margin: 0 auto;" />
                  <p style="margin: 16px 0 0 0; color: #a3a3a3; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">New Project Inquiry</p>
                </div>
                
                <!-- Body -->
                <div style="padding: 40px 24px;">
                  <div style="margin-bottom: 32px;">
                    <p style="margin: 0 0 6px 0; color: #7c3aed; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Client Name</p>
                    <p style="margin: 0; font-size: 18px; color: #ffffff;">${name}</p>
                  </div>
                  
                  <div style="margin-bottom: 32px;">
                    <p style="margin: 0 0 6px 0; color: #7c3aed; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Contact Email</p>
                    <p style="margin: 0; font-size: 16px; color: #ffffff;">
                      <a href="mailto:${email}" style="color: #ffffff; text-decoration: none; border-bottom: 1px solid #7c3aed;">${email}</a>
                    </p>
                  </div>
                  
                  <div style="margin-bottom: 12px;">
                    <p style="margin: 0 0 10px 0; color: #7c3aed; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Project Details</p>
                    <div style="background-color: #1a191d; padding: 24px; border-radius: 8px; border-left: 4px solid #7c3aed;">
                      <p style="margin: 0; color: #e5e5e5; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #15062a; padding: 32px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
                  <p style="margin: 0; color: #666666; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">This is an automated notification from your Roov Designs portfolio.</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
