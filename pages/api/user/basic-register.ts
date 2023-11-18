import { createHash } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { contactotpSchema } from "../../../utils/schemas/contactotpSchema"
import { HtmlTemplateSchema } from "../../../utils/schemas/htmltemplateSchema"
import { UserSchema } from "../../../utils/schemas/userSchema"
import { ResponseFuncs } from "../../../utils/types"
import jwt from 'jsonwebtoken';
import HtmlParser from "../libs/HtmlParser"
import { mailer } from "../mail-sender/mailer"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => { return res.status(400).json({ error }); }

  await connect();

  const sendVerificationMail = async (user: any) => {
    const { HtmlTemplate } = await HtmlTemplateSchema();
    const htmlTemplate = await HtmlTemplate.findOne({'slug': 'user-verification'});
    if(htmlTemplate){
      const token = jwt.sign({ sub: user._id, user: user.user_role }, process.env.SECRET, { expiresIn: "2d" });
      const mailRecords = {company_name: process.env.COMPANY_NAME, name: user.name, email: user.email, link: process.env.USER_VERIFICATION + token};
      const mailMessage = await HtmlParser(htmlTemplate.htmlTemplate, mailRecords);
      const mailSubject = await HtmlParser(htmlTemplate.subject, mailRecords);
      /** Send email to user */
      const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: mailSubject,
          text: "Email account verification",
          html: mailMessage
      }       
      let message = "";             
      await mailer(mailOptions).then((respo: any) => {
          message = "We have sent you email verification link. Kindly check <strong>[Inbox and Spam]</strong> & Verify your email Id.";
      }).catch((err: any) => {
          message = "Account created successfully. Please, Login Now";
      });
      return message;
    }
    return "None";
  }

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const { User } = await UserSchema(); // connect to database
        const userData = await User.find({}).catch(catcher);
        return res.json(userData);
    },

    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const { User } = await UserSchema(); // connect to database
        if(req.body.contact_otp == ''){
          const exist = {status: 0, title: "OTP is required!", message: "Opps! OTP is required field to register."};
          return res.status(200).json(exist);
        }
        if(req.body.contact_otp != ''){
          const { ContactOtp } = await contactotpSchema();
          const otpExist = await ContactOtp.findOne({contact_otp: req.body.contact_otp, contactno: req.body.contact});
          if(!otpExist){
            const exist = {status: 0, title: "OTP not matched!", message: "Opps! OTP is not match with given mobile No."};
            return res.status(200).json(exist);
          }
        }
        /** Contact duplicate */
        const user = await User.findOne({"contact": req.body.contact}).select('name email isDeleted isActive');
        if(user){
            const exist = {status: 0, title: "Contact duplicate", message: "Contact no. already exist with our system", user: user};
            return res.status(200).json(exist);
        } 
        /** Email duplicate */
        const userEmail = await User.findOne({"email": req.body.email}).select('name contact isDeleted isActive');
        if(userEmail){
            const exist = {status: 0, title: "Email duplicate", message: "Email already exist with our system", user: userEmail};
            return res.status(200).json(exist);
        }
        let registerUser: any = req.body;
        /** Password encrypted */
        const hash = createHash('sha256');
        hash.update(req.body.password);
        registerUser.password = hash.digest('hex');
        registerUser.user_role = "User";
        registerUser.is_contact_verified = true;
        /** End of password encrypted */
        /** Save successfully */
        const userResponse = await User.create(registerUser);
        const message = await sendVerificationMail(userResponse);
        const successMessage = message == 'None' ? "User register successfully" : message;
        const success = {status: 1, title: "User saved!", message: successMessage};
        return res.status(201).json(success);
    },

  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = await handleCase[method];
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler