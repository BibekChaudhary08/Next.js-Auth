import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/userModels";

const sendEmail = async ({ email, emailType, userId }:any) => {
    try {
      const hashtoken = await bcryptjs.hash(userId.toString(), 10);
      const verifyEmailorPassword = `<b><a href="${process.env.DOMAIN}/verifyEmail?token=${hashtoken}">Click Here</a> to ${emailType === "VERIFY" ?"verify youe Email":"Verify your Password"}  
                                         or Click this link to verify: ${process.env.DOMAIN}/verifyEmail?token=${hashtoken}
                                     </b>`;                  
          // here verifyEmail?token is used to query the email through hashtoken.

        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId,
            {verifyToken: hashtoken, verifyTokenExpiry: Date.now() + 3600000}
          )
        }
        else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId,
            {forgotPassword: hashtoken, forgotPasswordExpiry: Date.now() + 3600000}
          )
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "d4a41319d714a1",
            pass: "b86163012a9158"
          }
        });

        const mailOptions = {
            from: 'bibekchau80@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email": "Reser your Password",
            html: verifyEmailorPassword
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
        
    }
}

export default sendEmail