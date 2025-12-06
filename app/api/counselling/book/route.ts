// app/api/counselling/book/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            fullName,
            email,
            phone,
            date,
            time,
            message
        } = body;

        if (!fullName || !email || !phone || !date || !time) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        // EMAIL TRANSPORT
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // ============================
        // 1️⃣ EMAIL TO THE SITE ADMIN
        // ============================
        await transporter.sendMail({
            from: `"Counselling Booking" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "New Counselling Booking Request",
            html: `
        <h2>New Counselling Request</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p><b>Message:</b> ${message || "None"}</p>
      `,
        });

        // ============================
        // 2️⃣ EMAIL TO THE USER
        // ============================
        await transporter.sendMail({
            from: `"Counselling Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We Received Your Counselling Request",
            html: `
        <h2>Hello ${fullName},</h2>
        <p>Your counselling booking request has been received.</p>
        <p>We will reach out to you within <b>2 hours</b> to confirm your session.</p>

        <br/>
        <p><b>Your Details:</b></p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
        <p>Phone: ${phone}</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Email Error:", err);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
