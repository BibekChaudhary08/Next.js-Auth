import dbConnect from "@/dbconfig/dbConfig";
import User from "@/models/userModels"
import { NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"

const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // validation
        const user  = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "user Email already Exist"}, {status: 400});
        }
        else{
            const bcrypt = require('bcryptjs');
            const salt = bcrypt.genSalt(10);
            const hashPassword = bcrypt.hashSync(password, salt);
              
            const newUser = new user({
                username,
                email,
                password: hashPassword
            })

            const savedUser = await newUser.save();
             return NextResponse.json({message:"user created successfully"}, {status: 201})
        }
       
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}