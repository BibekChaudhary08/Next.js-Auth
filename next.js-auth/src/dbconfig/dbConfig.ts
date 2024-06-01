import mongoose from "mongoose";

const dbConnect = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI!);
       const Connection = mongoose.connection;

       Connection.on("connected", () => {
        console.log("MongoDB connected");   
       })

       Connection.on("error", (err) => {
        console.log("MOngoDB connection failed:" + err);
        process.exit();
       })

    } catch (error) {
        console.log("Error Occurs on Connection on Database:" + error);
        
    }
}

export default dbConnect