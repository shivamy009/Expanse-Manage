'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budget, Expanses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

const Dashboard = () => {
  const [budgetlist,setBudgetList]=useState([])
  const [expanses,setExpanses]=useState([])
      // const user=useUser();
      // used to get budget list
  
      useEffect(()=>{
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
  
  
      //     setBudgetList(result)
      //     getAllExpanses()
      //     console.log(result,"budgetlist")
      // }
  // console.log(user,"df")

  // const getAllExpanses=async()=>{
  //       const result=await db.select({
  //         id:Expanses.id,
  //         name:Expanses.name,
  //         amount:Expanses.amount,
  //         createdAt:Expanses.createdAt
  //       }).from(Budget)
  //       .rightJoin(Expanses,eq(Budget.id,Expanses.budgetId))
  //       .where(eq(Budget.createdBy,user?.user?.primaryEmailAddress?.emailAddress))
  //       .orderBy(desc(Expanses.id))

  //       setExpanses(result)
  //       console.log(result,"uio")
  // }

  //mongoDb

  const getBudgetListmongo=async()=>{
    // e.preventDefault();
    console.log("uiyuyui")
    try{
   const res=   await fetch('../api/budget/getbudgetlist',{
        method:'GET'
      })
      const data = await res.json();
      console.log(data.budgets,"dfsdfuu")
      getAllExpanseswithMongo();
      setBudgetList(data.budgets);
      console.log(budgetlist,"trrty")
    }catch(err){

      console.log(err)
    }
  }
  const getAllExpanseswithMongo = async () => {
    try {
        const res = await fetch('../api/expanses/getallExpanses', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (data.success) {
            setExpanses(data.expenses);
            console.log(data.expenses, "uio");
        }
    } catch (err) {
        console.error("Error fetching expenses:", err);
    }
};

  return (
    <div className=' p-8'>
      <h2 className=' font-bold text-3xl'>Hi,Shivam Yadav ✌</h2>
      <p className=' text-gray-500 '>Here's what happening with your money,Let's Manage your expanses </p>

      <CardInfo budgetList={budgetlist} />
      <div className=' grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className=' md:col-span-2'>
          <BarChartDashboard budgetList={budgetlist}/>

          <ExpenseListTable expansesList={expanses} refreshData={()=>getBudgetListmongo()}/>
        </div>
        <div className=' grid gap-5'>
          <h2 className=' font-bold text-lg'>Latest Budget</h2>
          {budgetlist.map((budget,index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))
        
        }
        </div>

      </div>
    </div>
  )
}

export default Dashboard