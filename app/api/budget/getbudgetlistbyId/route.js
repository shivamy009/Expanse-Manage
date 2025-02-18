import { connectMongodb } from "@/libs/mongodb";
import Budget from "@/models/Budget";
// import Expanses from "@/models/Expanses";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Expense from "@/models/Expense";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid or missing budget ID" }, { status: 400 });
        }

        await connectMongodb();

        const budget = await Budget.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "expenses", // Ensure the correct collection name
                    localField: "_id",
                    foreignField: "budgetId",
                    as: "Expense"
                }
            },
            {
                $addFields: {
                    totalSpend: { 
                        $sum: { 
                            $map: { input: "$Expense", as: "e", in: { $toDouble: "$$e.amount" } } 
                        } 
                    },
                    totalItem: { $size: "$Expense" }
                }
            }
        ]);

        if (budget.length === 0) {
            return NextResponse.json({ success: false, message: "Budget not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, budget: budget[0] });
    } catch (err) {
        console.error("Error fetching budget info:", err);
        return NextResponse.json({ success: false, message: "Error fetching budget info" }, { status: 500 });
    }
}
