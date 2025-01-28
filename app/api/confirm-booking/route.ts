import { ConfirmBooking } from '@/lib/actions';
import { SelectedSlot } from '@/types/booking';
import { NextResponse } from 'next/server';

import nodemailer from 'nodemailer';
export async function POST(req: Request) {
  try {
    const { booking } = await req.json();
    
    const result = await ConfirmBooking(booking)
    console.log(result)
    const bookingDetails = booking
    const bookedslot: SelectedSlot[] = bookingDetails.slots;
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service (e.g., Gmail, SendGrid)
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
        },
      });
// Format the email content
const emailContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <div style="width: 64px; height: 64px; background-color: #1a73e8; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
      <svg style="width: 32px; height: 32px; color: white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 style="font-size: 24px; font-weight: 500; color: #202124;">Booking Confirmed!</h2>
  </div>

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Name:</h3>
    <p>${bookingDetails.name}</p>
  </div>

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Council:</h3>
    <p>${bookingDetails.council}</p>
  </div>

  ${bookingDetails.society ? `
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Society:</h3>
      <p>${bookingDetails.society}</p>
    </div>
  ` : ''}

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Purpose:</h3>
    <p>${bookingDetails.purpose}</p>
  </div>

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Phone Number:</h3>
    <p>${bookingDetails.phone}</p>
  </div>

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Email:</h3>
    <p>${bookingDetails.email}</p>
  </div>

  <div style="margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 500; color: #5f6368;">Selected Slots:</h3>
    <div style="font-size: 18px; color: #1a73e8; margin-bottom: 12px;">
      ${new Date(bookingDetails.slots[0]?.date).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric' })}
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      ${bookedslot.map(slot => `
        <div style="padding: 8px 16px; background-color: #1a73e8; color: white; border-radius: 20px; font-size: 14px; font-weight: 500;">
          ${slot.time}
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Responsive Button -->
  <a href=${`https://meeting.webnd-iitbbs.org/cancel/${result}`} style="display: block; width: 100%; max-width: 200px; margin: 20px auto; padding: 12px 24px; background-color: #1a73e8; color: white; text-align: center; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 500;">
    Cancel Booking
  </a>
</div>
`;

const mailOptions = {
    from: '"Meeting Room Booking" <noreply@webnd-iitbbs.org>', // Sender address
    to: bookingDetails.email, // Recipient address
    subject: 'Booking Confirmed', // Subject line
    html: emailContent, // HTML content
    cc: 'secyweb.sg@iitbbs.ac.in'
  };
  await transporter.sendMail(mailOptions);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Failed to confirm booking", error)
    return NextResponse.json({ success: false, message: error.message });
  }
}
