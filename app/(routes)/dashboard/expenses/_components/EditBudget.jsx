'use client'

import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { db } from '@/utils';
import { Budget } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
const EditBudget = ({budgetInfo,refreshData}) => {
    // const user=useUser();
    const [emojiIcon,setEmojiicon]=useState(budgetInfo.icon);
    const [openEmoji,setOpenemoji]=useState(false);
    const [name,setName]=useState(budgetInfo?.name)
    const [amount,setAmount]=useState(budgetInfo?.amount)

    useEffect(()=>{
        if(budgetInfo){
            setEmojiicon(budgetInfo?.icon)
            setAmount(budgetInfo?.amount)
            setName(budgetInfo?.name)

        }
    },[budgetInfo])

    // const onUpdateBudget=async()=>{
    //  const result=await db.update(Budget)
    //  .set({
    //     name:name,
    //     amount:amount,
    //     icon:emojiIcon
    //  })
    //  .where(eq(Budget.id,budgetInfo.id))
    //  .returning();

    //  if(result){
    //     refreshData();
    //     toast("Budget Updated")
    //  }
    // }

    //mongo
   
   
    const onUpdateBudgetINMongo = async () => {
      try {
          const res = await fetch("../../api/budget/editbudget", {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  id: budgetInfo._id,
                  name: name,
                  amount: amount,
                  icon: emojiIcon
              })
          });
  
          const data = await res.json();
  
          if (data.success) {
              toast("Budget Updated");
              refreshData();
          } else {
              console.error("Error:", data.message);
          }
      } catch (error) {
          console.error("Fetch error:", error);
      }
  };
  
  return (
    <div>

          <Dialog>
        <DialogTrigger asChild>
        
        <Button className=" flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
                <div className=" mt-5">
                <Button  className=" text-lg bg-white hover:bg-white border-2 " varient='outline' onClick={()=>setOpenemoji(!openEmoji)} >{emojiIcon}</Button>
             <div className=" absolute  z-20">
                <EmojiPicker open={openEmoji} onEmojiClick={(e)=>{setEmojiicon(e.emoji)
                    setOpenemoji(false)
                }}/>
             </div>
             <div className=" mt-2">
                <h2 className=" text-black font-medium my-1">Budget Name</h2>
                <Input defaultValue={budgetInfo.name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Home Decoration"/>
             </div>
             <div className=" mt-2">
                <h2 className=" text-black font-medium my-1">Budget Amount</h2>
                <Input defaultValue={budgetInfo.amount} type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="e.g. $5000"/>
             </div>
             {/* <Button disabled={!(name&&amount)} className="mt-5 w-full" onClick={()=>onCreateBudget()}>Create Budget</Button> */}
             </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button disabled={!(name&&amount)} className="mt-5 w-full" onClick={()=>onUpdateBudgetINMongo()}>Update Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget