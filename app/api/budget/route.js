
import { connectMongodb } from "@/libs/mongodb";
import Budget from "@/models/Budget";

const { NextResponse } = require("next/server");

export async function POST(req){
    try{
        const {name,amount,icon}=await req.json();
        await connectMongodb();
        await Budget.create({name,amount,icon})

        return NextResponse.json({success:true,
            message:"User Registered"})
    }catch(err){
        return NextResponse.json(
            {
                success:false,
                Message:"Error while budgte"
            }
        )
    }
}