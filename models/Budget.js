import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    icon: {
      type: String, // Store icon as a URL or an icon name
    //   required: true,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
