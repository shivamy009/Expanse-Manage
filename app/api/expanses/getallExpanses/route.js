import { connectMongodb } from "@/libs/mongodb";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongodb();

        const expenses = await Expense.find().sort({ _id: -1 }); // Fetch all expenses and sort by latest

        return NextResponse.json({ success: true, expenses });

    } catch (err) {
        console.error("Error fetching expenses:", err);
        return NextResponse.json({ success: false, message: "Error fetching expenses" }, { status: 500 });
    }
}
