'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input";


import { toast } from "sonner";
 
import { DialogClose } from "@radix-ui/react-dialog";

const CreateBudget = ({refreshData}) => {
   
    const [emojiIcon,setEmojiicon]=useState('🙌');
    const [openEmoji,setOpenemoji]=useState(false);
    const [name,setName]=useState('')
    const [amount,setAmount]=useState()
    

    //for mongodb

    const handleSubmit=async()=>{
      // e.preventDefault();
      if(!name || !amount || !emojiIcon){
        return;
      }
      try{
     const res=   await fetch('../api/budget',{
          method:'POST',
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({
            name:name,
            amount:amount,
            icon:emojiIcon
          })
        })
        // console.log(res)
        if(res.ok){
          refreshData();
          toast("New Budget Created")
      }
      }catch(err){

        console.log(err)
      }
    }
    // console.log(name,amount)
  return (
    <div>
     
      <Dialog>
        <DialogTrigger asChild>
        <div className=" bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
        <h2 className=" text-3xl">+</h2>
        <h2>Create New Budget</h2>
      </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
                <Input onChange={(e)=>setName(e.target.value)} placeholder="e.g. Home Decoration"/>
             </div>
             <div className=" mt-2">
                <h2 className=" text-black font-medium my-1">Budget Amount</h2>
                <Input type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="e.g. $5000"/>
             </div>
             {/* <Button disabled={!(name&&amount)} className="mt-5 w-full" onClick={()=>onCreateBudget()}>Create Budget</Button> */}
             </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          {/* <Button disabled={!(name&&amount)} className="mt-5 w-full" onClick={()=>onCreateBudget()}>Create Budget</Button> */}
          <Button disabled={!(name&&amount)} className="mt-5 w-full" onClick={()=>handleSubmit()}>Create Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
