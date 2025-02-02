// src/common/services/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      service: 'Gmail',
    });
  }

  async sendEmail(
    recipientEmail: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: recipientEmail,
      subject,
      html: this.generateEmailTemplate(message),
    };

    await this.transporter.sendMail(mailOptions);
  }

  private generateEmailTemplate(message: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          background-color: #f4f4f4;
      ">
          <div style="
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 30px;
          ">
              <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="
                      color: #2c3e50;
                      margin: 0;
                      font-size: 24px;
                      border-bottom: 2px solid #3498db;
                      padding-bottom: 10px;
                  ">Notification</h1>
              </div>

              <div style="color: #555555;">
                  <p style="
                      font-size: 16px;
                      margin-bottom: 20px;
                      background-color: #f8f9fa;
                      padding: 15px;
                      border-radius: 6px;
                      border-left: 4px solid #3498db;
                  ">${message}</p>

                  <p style="
                      font-size: 16px;
                      margin-top: 30px;
                      padding: 15px;
                      background-color: #fff8dc;
                      border-radius: 6px;
                      border: 1px solid #ffd700;
                  ">If you have any concerns, please contact our support team.</p>
              </div>

              <div style="
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
                  color: #888888;
                  font-size: 12px;
                  text-align: center;
              ">
                  <p>This is an automated message, please do not reply directly to this email.</p>
                  <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>`;
  }

  async sendParentAssociationRequestEmail(
    childEmail: string,
    childUsername: string,
    parentName: string,
  ): Promise<void> {
    const message = `Hello ${childUsername}, <br> ${parentName} has requested to be registered as your parent/guardian in our system.`;
    await this.sendEmail(childEmail, 'New Parent Association Request', message);
  }

  async sendParentAssociationResponseEmail(
    parentEmail: string,
    childUsername: string,
    status: 'approved' | 'rejected',
  ): Promise<void> {
    const statusMessage =
      status === 'approved'
        ? `Congratulations! ${childUsername} has approved your parent association request.`
        : `Unfortunately, ${childUsername} has rejected your parent association request.`;
    await this.sendEmail(
      parentEmail,
      'Parent Association Request Update',
      statusMessage,
    );
  }
}
