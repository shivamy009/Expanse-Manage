import { connectMongodb } from "@/libs/mongodb";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req) {
    try {
        const { id, name, amount, icon } = await req.json();
           console.log(id,name,amount,icon)
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid or missing budget ID" }, { status: 400 });
        }

        await connectMongodb();

        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { name, amount, icon },
            { new: true } // Returns the updated document
        );

        if (!updatedBudget) {
            return NextResponse.json({ success: false, message: "Budget not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Budget updated successfully" });
    } catch (err) {
        console.error("Error updating budget:", err);
        return NextResponse.json({ success: false, message: "Error updating budget" }, { status: 500 });
    }
}
