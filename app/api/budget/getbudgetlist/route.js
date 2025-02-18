import { connectMongodb } from "@/libs/mongodb";
import Budget from "@/models/Budget";
import Expense from "@/models/Expense";
import { NextResponse } from "next/server";
// import connectMongodb from "@/lib/mongodb";
// import Budget from "@/models/Budget";
// import Expanses from "@/models/Expanses";


export async function GET(req) {
    try {
        await connectMongodb();

        const budgets = await Budget.aggregate([
            {
                $lookup: {
                    from: "expenses", // Collection name in MongoDB
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
            },
            {
                $sort: { _id: -1 } // Sort by descending _id (latest budgets first)
            }
        ]);

        return NextResponse.json({ success: true, budgets });

    } catch (err) {
        console.error("Error fetching budgets:", err);
        return NextResponse.json(
            { success: false, message: "Error fetching budgets" },
            { status: 500 }
        );
    }
}
