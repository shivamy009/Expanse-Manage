import { connectMongodb } from "@/libs/mongodb";
import Budget from "@/models/Budget";
// import Expanses from "@/models/Expanses";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Expense from "@/models/Expense";

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid or missing budget ID" }, { status: 400 });
        }

        await connectMongodb();

        // Delete all expenses linked to this budget
        await Expense.deleteMany({ budgetId: id });

        // Delete the budget itself
        const budgetResult = await Budget.findByIdAndDelete(id);

        if (!budgetResult) {
            return NextResponse.json({ success: false, message: "Budget not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Budget and associated expenses deleted successfully" });
    } catch (err) {
        console.error("Error deleting budget:", err);
        return NextResponse.json({ success: false, message: "Error deleting budget" }, { status: 500 });
    }
}
