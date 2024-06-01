import mongoose from "mongoose"

const userSchema = new mongoose({
    userName: {
    type: String,
    required: [true, "Please Enter a userName"],
    unique: true
    },

    Email: {
        type: String,
        required: [true, "Please Enter an Email Address"],
        unique: true
    },

    Password: {
        type: String,
        required: [true, "Please Enter a Password"],
        unique: true
    },

    isVerified: {
        required: Boolean,
        default: false
    },

    isAdmin: {
        required: Boolean,
        default: false 
    },

    forgotPassword: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User