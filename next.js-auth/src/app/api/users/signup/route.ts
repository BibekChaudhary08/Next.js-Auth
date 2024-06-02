import dbConnect from "@/dbconfig/dbConfig";
import User from "@/models/userModels"
import { NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import sendEmail from "@/helper/Mailer";

const POST = async (request: NextRequest) => {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // validation
        const user  = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "user Email already Exist"}, {status: 400});
        }
        else{
            const salt: any = bcryptjs.genSalt(10);
            const hashPassword = bcryptjs.hashSync(password, salt);
              
            const newUser = new user({
                username,
                email,
                password: hashPassword
            })

            const savedUser = await newUser.save();
            console.log(savedUser);

            // Verify Email
            const verifyUser = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            }, { status: 201 });
        }
       
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}