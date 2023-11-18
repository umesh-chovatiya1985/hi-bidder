import nodemailer from "nodemailer";

export async function mailer(mailOptions: any) {
    const hostname: any = process.env.SMTP_HOST;
    const username: any = process.env.SMTP_USERNAME;
    const password: any = process.env.SMTP_PASSWORD;
    const port: any = process.env.SMTP_PORT;
    const secure: any = process.env.SMTP_TLS === 'yes' ? true : false;
    const transporter = nodemailer.createTransport({
        host: hostname,
        port: port,
        secure: secure,
        requireTLS: true,
        service: 'gmail',
        auth: {
            user: username,
            pass: password,
        },
        logger: true
    });
    // send mail with defined transport object
    // console.log(mailOptions);
    const info = await transporter.sendMail(mailOptions);
    return info.response;
}
