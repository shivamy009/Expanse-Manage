import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

 
export const connectMongodb=async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Mongo Connected")
    }
    catch(Error){
        console.log("Eror connection in db")
    }
}


