import { connectMongodb } from "@/libs/mongodb";
// import Expanses from "@/models/Expanses";
import { NextResponse } from "next/server";
import moment from "moment";
import Expense from "@/models/Expense";

export async function POST(req) {
    try {
        const { name, amount, budgetId } = await req.json();

        if (!name || !amount || !budgetId) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        await connectMongodb();

        const newExpense = await Expense.create({
            name,
            amount,
            budgetId,
            createdAt: moment().format("DD/MM/YYYY")
        });

        return NextResponse.json({ 
            success: true, 
            message: "New Expense Added", 
            expense: newExpense 
        });
    } catch (err) {
        console.error("Error adding expense:", err);
        return NextResponse.json({ success: false, message: "Error adding expense" }, { status: 500 });
    }
}
