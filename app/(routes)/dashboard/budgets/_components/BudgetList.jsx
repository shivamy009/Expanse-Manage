'use client'

import React, { useEffect, useRef, useState } from 'react'
import CreateBudget from './CreateBudget'

import { db } from '@/utils';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budget, Expanses } from '@/utils/schema';
import BudgetItem from './BudgetItem';
import { toast } from 'sonner';


const BudgetList = () => {
    const [budgetlist,setBudgetList]=useState([])
    // const user=useUser();
    // used to get budget list
    const budgetRef = useRef([]);
    useEffect(()=>{
        // user?.user&&getBudgetList();
        getBudgetListmongo();
    },[])


    // const getBudgetList=async()=>{
    //     const result=await db.select({
    //         ...getTableColumns(Budget),
    //         totalSpend:sql `sum(${Expanses.amount})`.mapWith(Number),
    //         totalItem:sql `count(${Expanses.id})`.mapWith(Number)
    //     }).from(Budget)
    //     .leftJoin(Expanses,eq(Budget.id,Expanses.budgetId))
    //     .where(eq(Budget.createdBy,user?.user?.primaryEmailAddress?.emailAddress))
    //     .groupBy(Budget.id)
    //     .orderBy(desc(Budget.id))


    //     // setBudgetList(result)
    //     console.log(result,"budgetlist")
    // }

    //mongo budgetlist
   
    const getBudgetListmongo=async()=>{
        // e.preventDefault();
        console.log("uiyuyui")
        try{
       const res=   await fetch('../api/budget/getbudgetlist',{
            method:'GET'
          })
          const data = await res.json();
          if (JSON.stringify(budgetRef.current) !== JSON.stringify(data.budgets)) {
            budgetRef.current = data.budgets;
            setBudgetList(data.budgets);
        }
        }catch(err){
  
          console.log(err)
        }
      }
    
  return (
    <div className=' mt-7'>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>

        <CreateBudget refreshData={()=>getBudgetListmongo()}/>
        {budgetlist.length>0 ? budgetlist.map((budget,index)=>(
            <BudgetItem key={index} budget={budget}/>
        )):[1,2,3,4,5,6,8,9,2].map((item,index)=>(
            <div key={index} className=' w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>
                


            </div>
        ))}
        </div>
    </div>
  )
}

export default BudgetList