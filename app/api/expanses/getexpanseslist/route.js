import { connectMongodb } from "@/libs/mongodb";
// import Expanses from "@/models/Expanses";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Expense from "@/models/Expense";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const budgetId = searchParams.get("id");
        // console.log(searchParams,budgetId,"tyu")

        if (!budgetId || !mongoose.Types.ObjectId.isValid(budgetId)) {
            return NextResponse.json({ success: false, message: "Invalid or missing budget ID" }, { status: 400 });
        }

        await connectMongodb();

        const expenses = await Expense.find({ budgetId })
            .sort({ _id: -1 }); // Sort by newest first

        return NextResponse.json({ success: true, expenses });
    } catch (err) {
        console.error("Error fetching expenses:", err);
        return NextResponse.json({ success: false, message: "Error fetching expenses" }, { status: 500 });
    }
}
