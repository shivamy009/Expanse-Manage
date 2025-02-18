import { db } from '@/utils'
import { Expanses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseListTable = ({expansesList,refreshData}) => {
    // const deleteExpanse=async(expanse)=>{
    //    const result=await db.delete(Expanses)
    //    .where(eq(Expanses.id,expanse.id))
    //    .returning();

    //    if(result){
    //     toast("expanse Deleted!")
    //     refreshData();
    //    }
    // }

    // mongoDeleteExpanse

    
    const deleteExpanseInmongo = async (expanse) => {
      // setLoading(true); // Optional, if you want to show a loading indicator
  
      try {
          const res = await fetch(`../../api/expanses/deleteExpanses?id=${expanse._id}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          const data = await res.json();
  
          if (data.success) {
              toast("Expense Deleted!");
              refreshData();
          } else {
              console.error("Error:", data.message);
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }
  
      // setLoading(false); // Optional, to stop loading indicator
  };
  

  return (
    <div className=' mt-3'>
        <h2 className=" font-bold text-lg">Latest Expenses</h2>
        <div className=' grid grid-cols-4 bg-slate-200 p-2 mt-3'>
            <h2 className=' font-bold'>Name</h2>
            <h2 className=' font-bold'>Amount</h2>
            <h2 className=' font-bold'>Date</h2>
            <h2 className=' font-bold'>Action</h2>
        </div>

         {
            expansesList.map((expanse,index)=>(
                <div key={index} className=' grid grid-cols-4 bg-slate-50 p-2'>
            <h2>{expanse.name}</h2>
            <h2>{expanse.amount}</h2>
            <h2>{expanse.createdAt}</h2>
            <h2>
            <Trash className=' text-red-600 cursor-pointer'
            onClick={()=>deleteExpanseInmongo(expanse)}/>

            </h2>
        </div>
            ))
         }
        
    </div>
  )
}

export default ExpenseListTable