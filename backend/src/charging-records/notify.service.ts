import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import twilio from 'twilio';

@Injectable()
export class NotifyService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your.email@gmail.com', // Replace with your email
      pass: 'your_app_password'     // Replace with your app password
    },
  });


  private twilioClient = twilio('ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'your_auth_token');
  

  async sendNewChargeEmail(date: string, amount: number, cost: number) {
    await this.transporter.sendMail({
      from: '"EV Charger Tracker" <your.email@gmail.com>',
      to: 'recipient@example.com',
      subject: 'New Charging Record Added',
      text: `New charge on ${date}: ${amount} kWh for ${cost} RY`,
    });
  }

  async sendNewChargeSMS(date: string, amount: number, cost: number) {
    await this.twilioClient.messages.create({
      body: `EV Charge on ${date}: ${amount} kWh for ${cost} RY`,
      from: '+12345678901',
      to: '+19876543210'
    });
  }
}