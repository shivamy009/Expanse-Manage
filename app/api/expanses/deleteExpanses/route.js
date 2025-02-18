import { connectMongodb } from "@/libs/mongodb";
// import Expanses from "@/models/Expanses";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Expense from "@/models/Expense";

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        console.log(searchParams,"io")

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid or missing expense ID" }, { status: 400 });
        }

        await connectMongodb();

        // Delete the expense by ID
        const result = await Expense.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ success: false, message: "Expense not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Expense deleted successfully" });
    } catch (err) {
        console.error("Error deleting expense:", err);
        return NextResponse.json({ success: false, message: "Error deleting expense" }, { status: 500 });
    }
}
