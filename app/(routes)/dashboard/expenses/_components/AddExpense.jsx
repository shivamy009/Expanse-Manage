'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils";
import { Budget, Expanses } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
// import Budget from "../../budgets/page";
import { toast } from "sonner";

const AddExpense = ({params,user,refreshData}) => {
    const [name,setName]=useState()
    const [amount,setAmount]=useState()
    const [loading,setLoading]=useState(false)

    // const AddNewExpense=async()=>{
         
    //     setLoading(true)
    //     const result=await db.insert(Expanses).values({
    //         name:name,
    //         amount:amount,
    //         budgetId:params,
    //         createdAt:moment().format('DD/MM/YYYY')
    //     }).returning({insertedId:Budget.id})

         
    //     setAmount('')
    //     setName('')
    //     if(result){
    //         refreshData()
    //         toast("New Expanses Added ")
            
    //     }
    // setLoading(false)
    // }


    
    //AddnewExpansesMongo


    const AddNewExpenseBymongo = async () => {
      if (!name || !amount || !params) return;
      
      setLoading(true);
      
      try {
          const res = await fetch("../../api/expanses", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  name,
                  amount,
                  budgetId: params
              })
          });
  
          const data = await res.json();
  
          if (data.success) {
              setAmount("");
              setName("");
              refreshData();
              toast("New Expense Added");
          } else {
              console.error("Error:", data.message);
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }
  
      setLoading(false);
  };
  
  return (
    <div className=" border p-5 rounded-lg">
      <h2 className=" font-bold text-lg">Add Expense</h2>
      <div className=" mt-2">
        <h2 className=" text-black font-medium my-1">Expense Name</h2>
        <Input
        value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Home Decoration"
        />
      </div>

      <div className=" mt-2">
        <h2 className=" text-black font-medium my-1">Expense Amount</h2>
        <Input
        value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. $200"
        />
      </div>
      <Button   onClick={()=>AddNewExpenseBymongo()} disabled={!(name&&amount) || loading} className="mt-3 w-full ">{
        loading?<Loader className=" animate-spin"/>:"Add New Expense"
}</Button>
    </div>
  );
};

export default AddExpense;
