import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";
import jwt from 'jsonwebtoken';
import { ResetPasswordSchema } from "../../../utils/schemas/resetpasswordSchema";
import { mailer } from "../mail-sender/mailer";
import { join, resolve } from "path";
import { readFile } from "fs/promises";
import HtmlParser from "../libs/HtmlParser";
import { HtmlTemplateSchema } from "../../../utils/schemas/htmltemplateSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { User } = await UserSchema(); // connect to database
            const userRecord = await User.findOne({"email": req.body.email}).select('-password');
            if(userRecord){
                if(req.body.user_role){
                    if(req.body.user_role == 'Admin' && userRecord.user_role != 'Admin'){
                        const exist = {status: 0, title: "Invalid request!", message: "Sorry, You don't have permission to request password for given role."};
                        return res.status(200).json(exist);
                    }
                    else if(req.body.user_role !== 'Admin' && userRecord.user_role == 'Admin'){
                        const exist = {status: 0, title: "Invalid request!", message: "Sorry, You don't have permission to request password for given role."};
                        return res.status(200).json(exist);
                    }
                }
                /** Generate token for reset password */
                const token = jwt.sign({ sub: userRecord._id, user: userRecord.user_role }, process.env.SECRET, { expiresIn: "2d" });
                const { ResetPassword } = await ResetPasswordSchema();
                /** Remove all old reset request */
                await ResetPassword.remove({user_id: userRecord._id});
                /** End of remove */
                const requestBody = {user_id: userRecord._id, reset_token: token};
                await ResetPassword.create(requestBody);
                /** End of the token generate request */
                // const templateDir = resolve(process.cwd(), 'pages/api/email-templates');
                // const templateFile = join(templateDir, 'resetPasswordTemplate.html');
                // let source = await readFile(templateFile, 'utf8');
                const { HtmlTemplate } = await HtmlTemplateSchema();
                const htmlTemplate = await HtmlTemplate.findOne({'slug': 'reset-user-password'});
                if(htmlTemplate){
                    const resetLink = userRecord.user_role == 'Admin' ? process.env.RESET_PASSWORD : process.env.USER_RESET_PASSWORD;
                    const mailRecords = {company_name: process.env.COMPANY_NAME, name: userRecord.name, email: userRecord.email, link: resetLink + token};
                    const mailMessage = await HtmlParser(htmlTemplate.htmlTemplate, mailRecords);
                    const mailSubject = await HtmlParser(htmlTemplate.subject, mailRecords);
                    /** Send email to user */
                    const mailOptions = {
                        from: process.env.EMAIL_FROM,
                        to: userRecord.email,
                        subject: mailSubject,
                        text: "Password reset link",
                        html: mailMessage
                    }       
                    let message = "";             
                    await mailer(mailOptions).then((respo: any) => {
                        console.log(respo);
                        message = "Password reset request received successfully. We have sent you mail with password reset link. Kindly check <strong>[Inbox and Spam]</strong>.";
                    }).catch((err: any) => {
                        message = "Password reset request fail to send email. Please, try again later.";
                        console.error(err);
                    });
                    const success = {status: 1, title: "Request sent!", message: message};
                    return res.status(200).json(success);
                    /** End of send email to user */
                }
                else {
                    const message = "HTML Template for email not found. Send mail failed!";
                    const exist = {status: 0, title: "No user found.", message: message};
                    return res.status(200).json(exist);
                }                
            }
            const exist = {status: 0, title: "No user found.", message: "Sorry, No user found with given email Id"};
            return res.status(200).json(exist);
        }
    }
    const response = await handleCase[method];
    if(response) response(req, res);
    else res.status(401).json({error: "No Response for this Request"});
}

export default handler;