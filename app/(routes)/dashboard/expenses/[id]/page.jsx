"use client";

import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

export default function ExpenseDetailPage() {
  const params = useParams(); // Get dynamic route parameters
  const { id } = params;
  
  const [budgetinfo, setBudgetInfo] = useState([]);
  const [expanseslist, setexpensesList] = useState([]);
  const route = useRouter();
 
  //mongodb
  const getBudgetInfobyidmongo = async (id) => {
    try {
        const res = await fetch(`../../api/budget/getbudgetlistbyId?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
      console.log(data),"iddata";
        if (data.success) {
            setBudgetInfo(data.budget);
            getExpenselistMongo();
        } else {
            console.error("Error:", data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const getExpenselistMongo = async () => {
  try {
      const res = await fetch(`../../api/expanses/getexpanseslist?id=${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });

      const data = await res.json();

      if (data.success) {
          setexpensesList(data.expenses);
      } else {
          console.error("Error:", data.message);
      }
  } catch (error) {
      console.error("Fetch error:", error);
  }
};

const deleteBudgetinMongo = async () => {
  try {
      const res = await fetch(`../../api/budget/deletebudget?id=${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }
      });

      const data = await res.json();

      if (data.success) {
          toast("Budget Deleted!");
          route.replace("/dashboard/budgets");
      } else {
          console.error("Error:", data.message);
      }
  } catch (error) {
      console.error("Fetch error:", error);
  }
};




// Call this function when needed
useEffect(() => {
     
     getBudgetInfobyidmongo(id);
      getExpenselistMongo();
     
}, [id]);

  return (
    <div className=" p-10">
      <h2 className=" text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className=" flex gap-2 items-center">
           <EditBudget budgetInfo={budgetinfo} refreshData={()=>getBudgetInfobyidmongo(id)}/>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className=" flex gap-2 bg-red-600" varient="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current BUdget along with expanses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudgetinMongo()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetinfo ? (
          <BudgetItem budget={budgetinfo} />
        ) : (
          <div className=" h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          params={id}
          
          refreshData={() => getBudgetInfobyidmongo(id)}
        />
      </div>
      <div className=" mt-4">
         
        <ExpenseListTable
          expansesList={expanseslist}
          refreshData={() => getBudgetInfobyidmongo(id)}
        />
      </div>
    </div>
  );
}
