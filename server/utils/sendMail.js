import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const sendMail = async (to, subject, text, html) =>{
        //mail user to verify email
        var transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_port,
            secure: false,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
          });
      
        const info = await transporter.sendMail({
            from: "<process.env.MAILTRAP_SENDEREMAIL>", // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
          });
}