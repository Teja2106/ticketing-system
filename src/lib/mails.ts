import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
    },
});

export async function sendMail(to: string, variables: Record<string, string>) {
    const filePath = path.join(process.cwd(), 'emails', 'staff-onboarding.html');
    let html = await fs.readFile(filePath, 'utf-8');

    for (const [key, value] of Object.entries(variables)) {
        html = html.replaceAll(`{{${key}}}`, value)
    }

    await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject: 'Onboarding Email',
        html
    });
}